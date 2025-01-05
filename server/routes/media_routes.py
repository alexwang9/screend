# server/routes/media_routes.py
from flask import Blueprint, jsonify, request
from routes.tmdb import extract_keywords, search_shows, get_similar_shows, recommend_shows

media_routes = Blueprint('media_routes', __name__)

@media_routes.route('/recommend_shows', methods=['GET'])
def show_recommendations():
    prompt = request.args.get('prompt')
    similar_ids = request.args.getlist('similar_ids')

    if not prompt and not similar_ids:
        return jsonify({"error": "Prompt or similar_ids required"}), 400

    recommendations = recommend_shows(prompt, similar_ids)
    return jsonify(recommendations)