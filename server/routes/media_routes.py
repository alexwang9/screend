# server/routes/media_routes.py
from flask import Blueprint, jsonify, request
from routes.tmdb import *
from routes.anilist import *

media_routes = Blueprint('media_routes', __name__)

@media_routes.route('/search_show_movie', methods=['GET'])
def search_show():
    name = request.args.get('name')
    media_type = request.args.get('media_type')
    results = search(name, media_type)
    return jsonify(results)


@media_routes.route('/recommend', methods=['GET'])
def recommendations():

    prompt = request.args.get('prompt')
    similar_ids = request.args.getlist('similar_ids')
    media_type = request.args.get('media_type') # tv or movie

    if not prompt and not similar_ids:
        return jsonify({"error": "Prompt or similar_ids required"}), 400

    if media_type == "tv" or media_type == "movie":
        recommendations = recommend_shows_movies(prompt, similar_ids, media_type)
    elif media_type == "manga":
        recommendations = recommend_manga(prompt)
    
    return jsonify(recommendations)