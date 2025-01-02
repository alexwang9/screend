# server/routes/media_routes.py

from flask import Blueprint, jsonify, request

media_routes = Blueprint('media_routes', __name__)

@media_routes.route('/shows', methods=['GET'])
def get_shows():
    return jsonify(shows="shows")