from flask import Blueprint, request, jsonify

# Create blueprint for chat-related routes
chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
def send_message():
    """process a user message and return AI response"""
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({
            'status': 'error',
            'message': 'message is required'
        }), 400
    
    user_message = data.get('message')
    
    if 'study' in user_message.lower():
        response = "i'm happy to help you study. what subject?"
    elif 'schedule' in user_message.lower():
        response = "lets make a schedule. how many hours a week u tryna study?"
    elif 'tired' in user_message.lower():
        response = "remember to take breaks. try 25 min of studying with 5 min breaks in between." 
    else:
        response = "i'm studybudy. you can ask me about things like creating study plans, finding resources, or managing your study time."
    
    return jsonify({
        'status': 'success',
        'response': response
    })