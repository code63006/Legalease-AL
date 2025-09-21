# LegalEase AI - Legal Document Demystification Platform

A comprehensive AI-powered platform that transforms complex legal documents into clear, understandable guidance, empowering users to make informed decisions.

## Features

### Core Features
- **AI-Powered Document Analysis**: Advanced document processing using Google Document AI and Vertex AI
- **Risk Assessment & Scoring**: Intelligent risk detection with visual scoring system (0-10 scale)
- **Multi-Language Support**: English and Hindi with Google Translate API integration
- **Simple/Detailed Toggle**: Adaptive explanations for different user expertise levels
- **Interactive Q&A**: Chat-based follow-up questions about analyzed documents
- **Document Comparison**: Side-by-side analysis of multiple legal documents
- **Smart Contract Templates**: AI-generated, customizable legal templates
- **Collaborative Review**: Real-time collaboration with family, friends, or legal experts
- **Legal Compliance Checker**: Automated verification against local regulations
- **Risk Visualization**: Advanced charts and scoring with actionable recommendations

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** with mobile-first approach

### Backend Integration Points
- **Firebase Authentication** - Google Sign-in
- **Firebase Firestore** - Document storage and user data
- **Firebase Storage** - Secure file uploads
- **Firebase Cloud Functions** - Serverless backend processing

### AI/ML Services
- **Google Document AI** - Text extraction from PDFs/images
- **Google Vertex AI (Gemini Pro)** - Document analysis and insights
- **Google Translate API** - Multi-language support
- **Custom AI Prompts** - Specialized legal document processing

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation with auth
│   ├── Hero.tsx         # Landing page
│   ├── FileUpload.tsx   # Document upload interface
│   ├── Dashboard.tsx    # Analysis results display
│   ├── QASection.tsx    # Interactive Q&A chat
│   ├── DocumentComparison.tsx  # Document comparison tool
│   ├── SmartTemplates.tsx      # Contract templates
│   ├── CollaborativeReview.tsx # Real-time collaboration
│   ├── RiskScoring.tsx         # Risk visualization
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   ├── useAI.ts        # AI service integration
│   └── useFirebase.ts  # Firebase services
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase project
- Google Cloud Platform account with APIs enabled

### Environment Variables Required

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Google Cloud AI APIs
REACT_APP_GOOGLE_CLOUD_PROJECT_ID=your_gcp_project_id
REACT_APP_GOOGLE_CLOUD_LOCATION=us-central1
REACT_APP_DOCUMENT_AI_API_KEY=your_document_ai_key
REACT_APP_VERTEX_AI_API_KEY=your_vertex_ai_key
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your_translate_api_key
```

### Installation

1.  **Clone and install dependencies**:
    ```bash
    npm install
    ```

2.  **Configure Firebase**:
    *   Create a Firebase project at https://console.firebase.google.com
    *   Enable Authentication (Google provider)
    *   Enable Firestore Database
    *   Enable Storage
    *   Add your domain to authorized domains

3.  **Enable Google Cloud APIs**:
    *   Document AI API
    *   Vertex AI API
    *   Cloud Translation API
    *   Enable billing for your GCP project

4.  **Update Firebase hooks** (`src/hooks/useFirebase.ts`):
    *   Uncomment Firebase initialization code
    *   Add your Firebase configuration

5.  **Update AI hooks** (`src/hooks/useAI.ts`):
    *   Uncomment Google Cloud AI integration code
    *   Add your API configurations

6.  **Start development server**:
    ```bash
    npm run dev
    ```

## 🔑 API Integration Points

### Cloud Functions (Backend)
Create these Cloud Functions in your Firebase project:

1.  **Document Processing Function**:
    ```javascript
    // functions/processDocument.js
    exports.processDocument = functions.storage.object().onFinalize(async (object) => {
      // Trigger Document AI processing
      // Call Vertex AI for analysis
      // Save results to Firestore
    });
    ```

2.  **AI Analysis Function**:
    ```javascript
    // functions/analyzeDocument.js
    exports.analyzeDocument = functions.https.onCall(async (data, context) => {
      // Process document with Vertex AI
      // Return analysis results
    });
    ```

## 🚀 Deployment

### Vercel (Alternative)
```bash
npm run build
vercel --prod
```