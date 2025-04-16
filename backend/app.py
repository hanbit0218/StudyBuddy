from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

DEBUG = True

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint to verify API is running"""
    return jsonify({
        'status': 'success',
        'message': 'StudyBuddy API is running'
    })

if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0', port=5000)