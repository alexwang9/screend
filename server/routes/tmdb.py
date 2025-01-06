import requests
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from string import punctuation
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load the .env file
load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

nltk.download('punkt_tab')
nltk.download('stopwords')

client = OpenAI()

def extract_keywords(prompt):
    prompt = prompt.lower()

    words = word_tokenize(prompt)

    stop_words = set(stopwords.words('english'))
    keywords = [word for word in words if word not in stop_words and word not in punctuation]

    return keywords

def call_openai(prompt):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an assistant designed to return a list of 25 recommended tv show names based on inputted keywords about what kind of show the user wants to watch. Return the list of shows as names, separated by commas with no spaces in between show names. The show names themselves may have spaces in them"
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    response = completion.choices[0].message.content
    tv_shows = response.split(',')

    return(tv_shows)

def search_shows(prompt):
    keywords = extract_keywords(prompt)
    query = " ".join(keywords)

    shows = call_openai(query)

    url = "https://api.themoviedb.org/3/search/tv"

    top_shows = []

    for show in shows:
        params = {
            "api_key": TMDB_API_KEY,
            "query": show,
            "language": "en-US",
            "page": 1
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get("results", [])
            if results:
                top_shows.append(results[0])
        else:
            print(f"Error fetching data for {show}: {response.status_code}, {response.text}")
    return top_shows

def get_similar_shows(tv_id):
    url = f"https://api.themoviedb.org/3/tv/{tv_id}/similar"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US",
        "page": 1
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()["results"]
    else: 
        print(f"Error: {response.status_code}, {response.text}")
        return []

def recommend_shows(prompt, similar_show_ids):
    search_results = search_shows(prompt)

    similar_results = []
    for tv_id in similar_show_ids:
        similar_results.extend(get_similar_shows(tv_id))

    combined_results = {show["id"]: show for show in search_results + similar_results}.values()

    sorted_results = sorted(combined_results, key=lambda x: x.get("vote_average", 0), reverse=True)

    return sorted_results[:25]
