# StudyBuddy AI Assistant

## Project Overview
StudyBuddy is a personal AI assistant designed to help students plan their study sessions, organize academic tasks, and provide learning resources. The application leverages AI to offer personalized study recommendations, answer academic questions, and help manage study schedules.

## Features
- Personalized study session planning
- Academic resource recommendations
- Question answering for various subjects
- Progress tracking for study goals
- Study timer with Pomodoro technique integration
- Note-taking and organization

## Technologies Used

### Frontend
- **React**: Created with Create React App
- **JavaScript**: Core programming language for frontend
- **React Router**: For navigation between components
- **Axios**: For making API requests
- **Material UI**: Component library for consistent UI design
- **Chart.js**: For visualizing study progress and statistics

### Backend
- **Python**: Core programming language for backend
- **Flask**: Lightweight web framework
- **OpenAI API**: For AI-powered features
- **Firebase**: For user authentication and data storage
- **RESTful API**: For communication between frontend and backend

### Development Tools
- **Git/GitHub**: Version control and project management
- **VS Code**: Code editor
- **Postman**: API testing
- **Docker**: For containerization (optional)

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v8.0 or higher)
- Python (v3.9 or higher)
- pip (latest version)
- OpenAI API key

### Installation

#### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/studybuddy-ai.git
cd studybuddy-ai/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

#### Backend Setup
```bash
# Navigate to backend directory
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with your OpenAI API key and Firebase credentials

# Start the server
python app.py
```

## Project Structure
```
studybuddy-ai/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── context/          # React context providers
│   │   ├── utils/            # Utility functions
│   │   ├── styles/           # CSS and styling
│   │   ├── App.js            # Main application component
│   │   └── index.js          # Entry point
│   └── package.json
│
├── backend/                  # Python Flask backend
│   ├── app.py                # Main Flask application
│   ├── routes/               # API routes
│   ├── services/             # Backend services
│   ├── models/               # Data models
│   ├── utils/                # Utility functions
│   └── requirements.txt      # Python dependencies
│
└── README.md                 # Project documentation
```

## Contribution Guidelines
- Create a new branch for each feature or bug fix
- Write clear, descriptive commit messages
- Keep code clean and well-documented
- Test thoroughly before submitting pull requests

## License
MIT License

## Acknowledgements
- OpenAI for providing the API
- React team for the amazing frontend library
- All contributors who participate in this project