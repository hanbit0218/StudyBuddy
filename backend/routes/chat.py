from flask import Blueprint, request, jsonify
from services.ai_service import AIService

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
def send_message():
    """Process a user message and return AI response"""
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({
            'status': 'error',
            'message': 'Message is required'
        }), 400
    
    user_message = data.get('message')
    context = data.get('context', '')
    
    response = AIService.answer_study_question(user_message, context)
    
    return jsonify({
        'status': 'success',
        'response': response
    })