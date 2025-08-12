SWARNA 💛 – AI-Powered Legal Case Assistant
SWARNA is an intelligent legal assistant designed to help legal professionals efficiently handle dowry-related cases under Indian Penal Code (IPC). Using advanced AI technology, ontology-based reasoning, and natural language processing, SWARNA streamlines the creation of legal documents and case analysis.

🌟 Key Features
🤖 AI-Powered Document Analysis: Leverages Google's Gemini AI to extract structured information from legal documents
📄 Automated Case Summaries: Generate comprehensive case summaries from PDF documents
🧾 Chargesheet Generation: Create detailed, court-ready chargesheets (coming soon)
🔍 Ontology-Based Extraction: Uses semantic web technologies for accurate legal concept mapping
🔐 Secure Authentication: Firebase-powered Google OAuth integration
📱 Modern UI/UX: Responsive React interface with smooth animations
🏗️ Architecture
Frontend (React + Vite)
Framework: React 19 with Vite for fast development
Styling: Tailwind CSS with custom design system
Authentication: Firebase Auth with Google OAuth
Animations: Framer Motion for smooth user interactions
Routing: React Router for navigation
State Management: Context API for global state
Backend (Python Flask)
Framework: Flask with CORS support
AI Integration: Google Gemini 1.5 Flash for document analysis
Document Processing: PyPDF2 for PDF text extraction
Data Format: JSON-based structured output
Environment: Python with virtual environment support
Data Layer
Ontology: OWL/RDF format for legal domain modeling
Knowledge Base: Semantic relationships for dowry case concepts
Output Format: Structured JSON with extracted legal entities
📁 Project Structure
SWARNA/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # React Context providers
│   │   └── route/          # Protected routing logic
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Python Flask API
│   ├── app.py              # Main Flask application
│   ├── data/               # Ontology and prompt files
│   ├── output/             # Generated summaries
│   └── requirements.txt    # Python dependencies
└── README.md               # Project documentation
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)
Python 3.8+
Google API Key (for Gemini AI)
Firebase project (for authentication)
Backend Setup
Navigate to backend directory

cd backend
Create virtual environment

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies

pip install -r requirements.txt
Configure environment variables Create a .env file in the backend directory:

GOOGLE_API_KEY=your_gemini_api_key_here
Start the Flask server

python app.py
The API will be available at http://127.0.0.1:5000

Frontend Setup
Navigate to frontend directory

cd frontend
Install dependencies

npm install
Configure Firebase Update firebase.js with your Firebase configuration

Start development server

npm run dev
The application will be available at http://localhost:5173

🔧 API Endpoints
POST /summary
Generates a structured summary from uploaded PDF documents.

Request:

Method: POST
Content-Type: multipart/form-data
Body: PDF file upload
Response:

{
  "extracted_instances": [
    {
      "id": "unique_identifier",
      "classes": ["LegalClass"],
      "properties": {
        "propertyName": "value"
      }
    }
  ]
}
🛠️ Technology Stack
Frontend Technologies
React 19: Modern React with latest features
Vite: Fast build tool and development server
Tailwind CSS: Utility-first CSS framework
Framer Motion: Animation library
Firebase: Authentication and hosting
Axios: HTTP client for API calls
React Router: Client-side routing
Backend Technologies
Python 3.8+: Core programming language
Flask: Lightweight web framework
Google Gemini AI: Advanced language model
PyPDF2: PDF processing library
python-dotenv: Environment variable management
Data & AI
OWL/RDF: Ontology representation
JSON: Structured data exchange
Semantic Web: Knowledge representation
NLP: Natural language processing
📊 Features in Detail
Document Analysis
Extracts legal entities (persons, cases, laws, evidence)
Identifies relationships between entities
Maps to predefined legal ontology
Generates structured JSON output
User Authentication
Secure Google OAuth integration
User profile management
Session persistence
Protected routes
Case Summary Generation
PDF document upload
AI-powered text extraction
Ontology-based entity recognition
Formatted summary output
🔒 Security Features
Firebase Authentication
CORS protection
Input validation
Secure file upload handling
Environment variable protection
🚧 Roadmap
 Chargesheet Generation: Automated chargesheet creation
 Multi-language Support: Hindi and regional language support
 Advanced Analytics: Case pattern analysis
 Document Templates: Customizable legal document templates
 Integration APIs: Third-party legal system integration
 Mobile App: React Native mobile application
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Team
SWARNA is developed by a dedicated team focused on modernizing legal technology in India.
