import requests
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI()

# HELPER
# Input: user prompt
# Output: list of 25 recommended manga
def call_openai(prompt):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are an assistant designed to return a list of 5 recommended manga names based on the inputted user prompt about what kind of manga they want to read. Return the list of manga with their English names, separated by commas with no spaces in between manga names. The manga names themselves may have spaces in them."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    response = completion.choices[0].message.content
    names = response.split(',')
    return names

def query_anilist(name):
    url = "https://graphql.anilist.co"
    query = """
    query($search: String) {
        Page {
            media(search: $search, type: MANGA) {
                id
                title {
                    english
                }
                genres
                description
                averageScore
                coverImage {
                    medium
                }
            }
        }
    }
    """

    variables = { 'search': name }

    response = requests.post(url, json={'query': query, 'variables': variables})

    if response.status_code == 200:
        data = response.json()["data"]["Page"]
        if data and data.get("media"):
            # print(data)
            return data["media"][0]  # Return the first result
        else:
            print(f"No results found for manga: {name}")
            return None
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

def recommend_manga(prompt):
    names = call_openai(prompt)
    recommendations = []
    for name in names:
        result = query_anilist(name)
        print(result)
        if result:
            recommendations.append({
                'id': result['id'],
                'title': result['title']['english'] or 'N/A',
                'genres': result['genres'],
                'description': result['description'],
                'averageScore': result['averageScore'],
                'coverImage': result['coverImage']['medium']
            })

    return recommendations
