# 💛 SWARNA – AI-Powered Legal Case Assistant

**SWARNA** is an intelligent legal assistant designed to help legal professionals efficiently handle **dowry-related cases** under the **Indian Penal Code (IPC)**.  
Using **AI-powered document analysis**, **ontology-based reasoning**, and **natural language processing**, SWARNA streamlines **case analysis** and **document creation**.

---

## 🌟 Key Features
- 🤖 **AI-Powered Document Analysis** – Extract structured information from legal documents using Google's **Gemini AI**.
- 📄 **Automated Case Summaries** – Generate concise, court-ready summaries from uploaded PDFs.
- 🧾 **Chargesheet Generation** *(Coming Soon)* – Automated preparation of legal chargesheets.
- 🔍 **Ontology-Based Extraction** – Accurate mapping of legal concepts using semantic web technologies.
- 🔐 **Secure Authentication** – Google OAuth login via **Firebase**.
- 📱 **Modern UI/UX** – Responsive, animated React interface.

---

## 🏗 Architecture Overview

### **Frontend** (React + Vite)
- **Framework:** React 19 + Vite for fast development
- **Styling:** Tailwind CSS with a custom design system
- **Authentication:** Firebase Auth (Google OAuth)
- **Animations:** Framer Motion for smooth transitions
- **Routing:** React Router
- **State Management:** Context API

### **Backend** (Python Flask)
- **Framework:** Flask with CORS enabled
- **AI Integration:** Google Gemini 1.5 Flash for NLP-based document analysis
- **PDF Processing:** PyPDF2
- **Data Exchange:** JSON format
- **Environment Management:** python-dotenv

### **Data Layer**
- **Ontology:** OWL/RDF representation for legal domain concepts
- **Knowledge Base:** Semantic relationships for dowry cases
- **Output:** Structured JSON with extracted legal entities

---


---

## 🚀 Getting Started

### **Prerequisites**
- Node.js **v18+**
- Python **3.8+**
- **Google API Key** (Gemini AI)
- **Firebase project** for authentication

---

### **Backend Setup**
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

Create .env in backend/:
GOOGLE_API_KEY=your_gemini_api_key_here

Run the backend:
python app.py

### **Frontend Setup**
cd frontend
npm install

Create .env.local in frontend/:

FIREBASE_API_KEY=your_firebase_api_key
AUTH_DOMAIN=your_firebase_auth_domain
BACKEND_API_URL=http://127.0.0.1:5000

Run the frontend:
npm run dev



