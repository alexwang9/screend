# server/app.py

from flask import Flask, jsonify
from flask_cors import CORS

from routes.media_routes import media_routes

app = Flask(__name__)
CORS(app)  # Enables Cross-Origin Resource Sharing

app.register_blueprint(media_routes, url_prefix='/api')

@app.route('/')
def hello():
    return jsonify(message="Hello from root endpoint!")

if __name__ == '__main__':
    app.run(debug=True, port=5000)
