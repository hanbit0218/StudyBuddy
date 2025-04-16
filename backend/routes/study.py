from flask import Blueprint, request, jsonify
from services.ai_service import AIService

study_bp = Blueprint('study', __name__)

@study_bp.route('/plan', methods=['POST'])
def create_study_plan():
    """Create a personalized study plan based on input"""
    data = request.get_json()
    
    if not data or 'subject' not in data:
        return jsonify({
            'status': 'error',
            'message': 'Missing required fields'
        }), 400
    
    subject = data.get('subject')
    duration = data.get('duration', '1 hour')
    topics = data.get('topics', [])
    
    study_plan = AIService.generate_study_plan(subject, duration, topics)
    
    return jsonify({
        'status': 'success',
        'plan': study_plan
    })

@study_bp.route('/resources', methods=['GET'])
def get_study_resources():
    """Get recommended study resources for a subject"""
    subject = request.args.get('subject')
    
    if not subject:
        return jsonify({
            'status': 'error',
            'message': 'Subject parameter is required'
        }), 400
    
    resources = [
        {
            'title': f"Introduction to {subject}",
            'type': 'article',
            'url': f"https://example.com/{subject.lower().replace(' ', '-')}-intro"
        },
        {
            'title': f"{subject} Practice Problems",
            'type': 'exercises',
            'url': f"https://example.com/{subject.lower().replace(' ', '-')}-practice"
        },
        {
            'title': f"Advanced {subject} Concepts",
            'type': 'video',
            'url': f"https://example.com/{subject.lower().replace(' ', '-')}-advanced"
        }
    ]
    
    return jsonify({
        'status': 'success',
        'resources': resources
    })