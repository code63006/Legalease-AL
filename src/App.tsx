import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from 'firebase/auth';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FileUpload } from './components/FileUpload';
import { DocumentComparison } from './components/DocumentComparison';
import { SmartTemplates } from './components/SmartTemplates';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { auth, googleProvider } from './firebase';
import useAI from './hooks/useAI';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'dashboard' | 'compare' | 'templates' | 'collaborate'>('home');
  const [isSimpleMode, setIsSimpleMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [user] = useAuthState(auth);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const {
    analyzeDocument,
    speakExplanation,
    audioExplanationUrl,
    loading: aiLoading,
    isSpeaking,
    speechError
  } = useAI();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentView('home');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAnalyze = async (file: File) => {
    try {
      const { documentProcessingResult, explanation } = await analyzeDocument(file);
      // Assuming documentProcessingResult.text contains the extracted text
      const structuredResult = {
        id: file.name + Date.now(), // Unique ID
        fileName: file.name,
        uploadDate: new Date(),
        summary: {
          simple: documentProcessingResult?.text || 'No simple summary available.',
          detailed: explanation || 'No detailed explanation available.',
        },
        risks: [],
        keyTerms: [],
        riskScore: 0,
        documentType: file.type,
        clauses: [],
        recommendations: [],
        legalCompliance: [],
      };
      setAnalysisResult(structuredResult);
      setCurrentView('dashboard'); // Navigate to dashboard after analysis
    } catch (error) {
      console.error("App.tsx: Error analyzing document:", error);
      // Optionally, set an error state to display in the UI
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        isSimpleMode={isSimpleMode}
        onToggleMode={() => setIsSimpleMode(!isSimpleMode)}
        language={language}
        onToggleLanguage={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <main className="relative">
        {currentView === 'home' && <Hero onGetStarted={() => setCurrentView('upload')} />}
        {currentView === 'upload' && (
          <FileUpload 
            onFileUpload={handleAnalyze}
            loading={aiLoading}
            language={language}
          />
        )}
        {currentView === 'dashboard' && user && (
          <Dashboard 
            analysisResult={analysisResult} 
            isSimpleMode={isSimpleMode}
            language={language}
            onNavigate={(section: string) => setCurrentView(section as typeof currentView)}
            fileName={analysisResult?.fileName || ''}
            speakExplanation={speakExplanation} // New prop
            audioExplanationUrl={audioExplanationUrl} // New prop
            isSpeaking={isSpeaking} // New prop
            speechError={speechError} // New prop
          />
        )}
        {currentView === 'compare' && (
          <DocumentComparison language={language} />
        )}
        {currentView === 'templates' && (
          <SmartTemplates language={language} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
