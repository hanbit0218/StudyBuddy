import os
import requests
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

# You can get a free token by signing up at huggingface.co (optional)
HF_API_TOKEN = os.getenv("HF_API_TOKEN", "")

class AIService:
    """Service for interacting with Hugging Face Inference API (free alternative)"""
    
    @staticmethod
    def generate_study_plan(subject: str, duration: str, topics: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Generate a personalized study plan using a free language model
        """
        # Create prompt for the model
        topics_text = f" with focus on {', '.join(topics)}" if topics else ""
        prompt = f"""Create a detailed study plan for {subject}{topics_text} that will take {duration}. 
        Break it down into sections with specific activities and time allocations.
        """
        
        try:
            # Use Hugging Face's Inference API with a free model
            API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
            headers = {"Authorization": f"Bearer {HF_API_TOKEN}"} if HF_API_TOKEN else {}
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_length": 500,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(API_URL, headers=headers, json=payload)
            
            if response.status_code == 200:
                # Parse the response
                result = response.json()
                generated_text = result[0]["generated_text"] if isinstance(result, list) else result["generated_text"]
                
                # Create a structured response (simplified for this example)
                # In a real app, you would parse the generated text more carefully
                sections = []
                lines = generated_text.strip().split('\n')
                
                current_section = None
                for line in lines:
                    line = line.strip()
                    if not line:
                        continue
                        
                    # Very simple parsing logic - can be improved
                    if line.endswith(':'):
                        if current_section:
                            sections.append(current_section)
                        current_section = {'topic': line.rstrip(':'), 'activities': []}
                    elif current_section:
                        if 'duration' not in current_section and ('minute' in line.lower() or 'hour' in line.lower()):
                            current_section['duration'] = line
                        else:
                            current_section['activities'].append(line)
                
                # Add the last section
                if current_section:
                    sections.append(current_section)
                    
                # Fallback if parsing fails
                if not sections:
                    sections = [
                        {
                            "topic": f"Introduction to {subject}",
                            "duration": "25% of total time",
                            "activities": ["Review key concepts", "Read introductory material"]
                        },
                        {
                            "topic": f"Practice {subject} problems",
                            "duration": "50% of total time",
                            "activities": ["Solve example problems", "Apply concepts learned"]
                        },
                        {
                            "topic": "Review and synthesis",
                            "duration": "25% of total time",
                            "activities": ["Summarize what you learned", "Create connections with previous knowledge"]
                        }
                    ]
                
                return {
                    "subject": subject,
                    "duration": duration,
                    "sections": sections
                }
                
        except Exception as e:
            print(f"Error calling AI service: {str(e)}")
            
        # Fallback plan if API call fails
        return {
            "subject": subject,
            "duration": duration,
            "sections": [
                {
                    "topic": f"Introduction to {subject}",
                    "duration": "25% of total time",
                    "activities": ["Review key concepts", "Read introductory material"]
                },
                {
                    "topic": f"Practice {subject} problems",
                    "duration": "50% of total time",
                    "activities": ["Solve example problems", "Apply concepts learned"]
                },
                {
                    "topic": "Review and synthesis",
                    "duration": "25% of total time",
                    "activities": ["Summarize what you learned", "Create connections with previous knowledge"]
                }
            ]
        }
    
    @staticmethod
    def answer_study_question(question: str, context: Optional[str] = None) -> str:
        """
        Generate an answer to a study-related question
        """
        context_text = f"\nContext: {context}" if context else ""
        prompt = f"""You are StudyBuddy, an AI assistant that helps students study effectively.
        
        Question: {question}{context_text}
        
        Answer:"""
        
        try:
            # Use Hugging Face's Inference API with a free model
            API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
            headers = {"Authorization": f"Bearer {HF_API_TOKEN}"} if HF_API_TOKEN else {}
            
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_length": 200,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(API_URL, headers=headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                return result[0]["generated_text"] if isinstance(result, list) else result["generated_text"]
                
        except Exception as e:
            print(f"Error calling AI service: {str(e)}")
            
        if 'study' in question.lower():
            return "i'm happy to help you study. what subject?"
        elif 'schedule' in question.lower():
            return "lets make a schedule. how many hours a week u tryna study?"
        elif 'tired' in question.lower() or 'break' in question.lower():
            return "Taking breaks is important! Consider using the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break."
        elif 'motivation' in question.lower():
            return "remember to take breaks. try 25 min of studying with 5 min breaks in between."
        else:
            return "i'm studybudy. you can ask me about things like creating study plans, finding resources, or managing your study time."