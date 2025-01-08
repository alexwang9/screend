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

# HELPER
# Input: user prompt
# Output: important keywords from the prompt
def extract_keywords(prompt):
    prompt = prompt.lower()

    words = word_tokenize(prompt)

    stop_words = set(stopwords.words('english'))
    keywords = [word for word in words if word not in stop_words and word not in punctuation]

    return keywords

# HELPER
# Input: important keywords from user prompt
# Output: list of 25 recommended tv shows
def call_openai(prompt, media_type):
    response = ""
    if media_type == "tv":
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant designed to return a list of 35 recommended tv show names based on inputted keywords about what kind of show the user wants to watch. Return the list of shows as names, separated by commas with no spaces in between show names. The show names themselves may have spaces in them"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        response = completion.choices[0].message.content
    
    elif media_type == "movie":
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an assistant designed to return a list of 25 recommended movie names based on inputted keywords about what kind of movie the user wants to watch. Return the list of movies as names, separated by commas with no spaces in between movie names. The movie names themselves may have spaces in them"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        response = completion.choices[0].message.content
    names = response.split(',')

    return(names)

# HELPER
# Input: user prompt
# Output: json list of shows from tmdb database
def search_shows_movies(prompt, media_type):
    keywords = extract_keywords(prompt)
    query = " ".join(keywords)

    names = call_openai(query, media_type)

    url = f"https://api.themoviedb.org/3/search/{media_type}"

    top_names = []

    for name in names:
        params = {
            "api_key": TMDB_API_KEY,
            "query": name,
            "language": "en-US",
            "page": 1
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json().get("results", [])
            if results:
                top_names.append(results[0])
        else:
            print(f"Error fetching data for {name}: {response.status_code}, {response.text}")
    return top_names

# HELPER
# Input: show tv_id corresponding to tmdb database
# Output: a json list of similar shows
def get_similar_media(similar_id, media_type):
    url = f"https://api.themoviedb.org/3/{media_type}/{similar_id}/similar"
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

# Input: user prompt and list of similar show ids
# Output: 25 shows sorted in recommendation order
def recommend_shows_movies(prompt, similar_ids, media_type):
    search_results = []
    if media_type == "tv" or media_type == "movie":
        search_results = search_shows_movies(prompt, media_type)


    similar_results = []
    for similar_id in similar_ids:
        similar_results.extend(get_similar_media(similar_id, media_type))

    combined_results = {media["id"]: media for media in search_results + similar_results}.values()

    sorted_results = sorted(combined_results, key=lambda x: x.get("vote_average", 0), reverse=True)

    return sorted_results[:25]

def search(name, media_type):
    if media_type == "movie" or media_type == "tv":
        url = f"https://api.themoviedb.org/3/search/{media_type}"
        params = {
            "api_key": TMDB_API_KEY,
            "query": name,
            "language": "en-US",
            "page": 1
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()["results"]
        else:
            print(f"Error: {response.status_code}, {response.text}")
            return []