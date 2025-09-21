import { useState } from 'react';

// --- Configuration ---
// TODO: Make sure the region matches your Firebase project's default region.
const cloudFunctionBaseUrl = "https://us-central1-sample-firebase-ai-app-5a13c.cloudfunctions.net";

// --- Helper Functions ---
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        // result includes 'data:mime/type;base64,' prefix, which we need to remove
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
};


// --- AI Hooks ---

const useDocumentAI = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processDocument = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
        const fileContent = await fileToBase64(file);
        const response = await fetch(`${cloudFunctionBaseUrl}/processDocument`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileContent,
                mimeType: file.type
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to process document: ${errorText}`);
        }

        const result = await response.json();
        setData(result);
        return result;
    } catch (err: any) {
        setError(err);
        throw err;
    } finally {
        setIsLoading(false);
    }
  };

  return { processDocument, data, isLoading, error };
};


export const useVertexAI = () => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateContent = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
        const res = await fetch(`${cloudFunctionBaseUrl}/generateContent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to generate content: ${errorText}`);
        }

        const data = await res.json();
        setResponse(data.response);
    } catch (err: any) {
        setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  return { generateContent, response, isLoading, error };
};


export const useGoogleTranslate = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const translate = async (text: string, targetLanguage: string) => {
    setIsLoading(true);
    setError(null);

    try {
        const res = await fetch(`${cloudFunctionBaseUrl}/translateText`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target: targetLanguage }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to translate text: ${errorText}`);
        }

        const data = await res.json();
        setTranslatedText(data.translatedText);
    } catch (err: any) {
        setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  return { translate, translatedText, isLoading, error };
};

export const useTextToSpeech = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const synthesizeSpeech = async (text: string, languageCode: string) => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(''); // Clear previous audio URL

    try {
        const res = await fetch(`${cloudFunctionBaseUrl}/synthesizeSpeech`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, languageCode }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to synthesize speech: ${errorText}`);
        }

        const data = await res.json();
        setAudioUrl(data.audioUrl); // Assuming the cloud function returns an audioUrl
    } catch (err: any) {
        setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  return { synthesizeSpeech, audioUrl, isLoading, error };
};


const useAI = () => {
    const documentAI = useDocumentAI();
    const vertexAI = useVertexAI();
    const translate = useGoogleTranslate();
    const textToSpeech = useTextToSpeech(); // Initialize useTextToSpeech
    const [loading, setLoading] = useState(false);

    const analyzeDocument = async (file: File) => {
        console.log('useAI: Setting loading to true');
        setLoading(true);
        try {
            const documentProcessingResult = await documentAI.processDocument(file);
            console.log('useAI: Document processing successful, result:', documentProcessingResult);

            // Assuming documentProcessingResult.text contains the extracted text
            const documentText = documentProcessingResult?.text || '';

            if (documentText) {
                await vertexAI.generateContent(`Provide a detailed explanation of the following document:

${documentText}`);
                // The explanation will be available in vertexAI.response
            }

            return {
                documentProcessingResult,
                explanation: vertexAI.response // Attach the explanation
            };
        } catch (error) {
            console.error('useAI: Error analyzing document:', error);
            throw error;
        } finally {
            console.log('useAI: Setting loading to false');
            setLoading(false);
        }
    };

    const compareDocuments = async (file1: File, file2: File) => {
        setLoading(true);
        try {
            // Mock data for development
            console.log('Comparing documents:', file1.name, file2.name);
            return {
                differences: [
                    {
                        section: 'Clause 1.1',
                        description: 'The definition of "Confidential Information" has been broadened.',
                        impact: 'negative'
                    },
                    {
                        section: 'Clause 3.2',
                        description: 'The term of the agreement has been extended by 12 months.',
                        impact: 'neutral'
                    },
                    {
                        section: 'Clause 8.1',
                        description: 'The liability cap has been increased from $1M to $5M.',
                        impact: 'positive'
                    }
                ],
                recommendation: 'The changes in this version are generally favorable, but the broadened definition of "Confidential Information" should be reviewed carefully.'
            };
        } catch (error) {
            console.error('Error comparing documents:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        analyzeDocument,
        compareDocuments,
        synthesizeSpeech: textToSpeech.synthesizeSpeech, // Corrected to synthesizeSpeech
        audioExplanationUrl: textToSpeech.audioUrl,
        loading,
        processDocument: documentAI.processDocument,
        generateContent: vertexAI.generateContent,
        translate: translate.translate,
        translatedText: translate.translatedText, // Expose translated text for potential UI use
        isTranslating: translate.isLoading,
        isSpeaking: textToSpeech.isLoading,
        speechError: textToSpeech.error
    };
};

export default useAI;
