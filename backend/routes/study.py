from flask import Blueprint, request, jsonify

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
    
    study_plan = {
        'subject': data.get('subject'),
        'duration': data.get('duration', '1 hour'),
        'sections': [
            {
                'topic': f"Introduction to {data.get('subject')}",
                'duration': '15 minutes',
                'activities': ['Review key concepts', 'Read introductory material']
            },
            {
                'topic': f"Core principles of {data.get('subject')}",
                'duration': '30 minutes',
                'activities': ['Practice problems', 'Note important formulas/concepts']
            },
            {
                'topic': 'Review and synthesis',
                'duration': '15 minutes',
                'activities': ['Summarize what you learned', 'Create connections with previous knowledge']
            }
        ]
    }
    
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