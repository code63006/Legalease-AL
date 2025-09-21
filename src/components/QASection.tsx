import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Loader } from 'lucide-react';

interface QASectionProps {
  language: 'en' | 'hi';
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const QASection: React.FC<QASectionProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: language === 'en' 
        ? "Hi! I'm your AI legal assistant. Feel free to ask me any questions about your document analysis."
        : "नमस्ते! मैं आपका AI कानूनी सहायक हूँ। अपने दस्तावेज़ विश्लेषण के बारे में कोई भी सवाल पूछ सकते हैं।",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const text = {
    en: {
      title: 'Ask Questions',
      subtitle: 'Get instant answers about your legal document',
      placeholder: 'Ask a question about your document...',
      send: 'Send',
      exampleQuestions: [
        'What are the main risks in this contract?',
        'Can I terminate this agreement early?',
        'What happens if I break this contract?',
        'Are there any hidden fees?'
      ],
      typing: 'AI is typing...'
    },
    hi: {
      title: 'सवाल पूछें',
      subtitle: 'अपने कानूनी दस्तावेज़ के बारे में तुरंत जवाब पाएं',
      placeholder: 'अपने दस्तावेज़ के बारे में सवाल पूछें...',
      send: 'भेजें',
      exampleQuestions: [
        'इस अनुबंध में मुख्य जोखिम क्या हैं?',
        'क्या मैं इस समझौते को जल्दी समाप्त कर सकता हूँ?',
        'अगर मैं इस अनुबंध को तोड़ूं तो क्या होगा?',
        'क्या कोई छुपी हुई फीस है?'
      ],
      typing: 'AI टाइप कर रहा है...'
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: language === 'en'
          ? "Based on your document analysis, I can provide specific insights about this question. The contract contains several key clauses that relate to your query. Would you like me to explain any specific section in more detail?"
          : "आपके दस्तावेज़ विश्लेषण के आधार पर, मैं इस प्रश्न के बारे में विशिष्ट जानकारी प्रदान कर सकता हूँ। अनुबंध में कई मुख्य खंड हैं जो आपके प्रश्न से संबंधित हैं। क्या आप चाहते हैं कि मैं किसी विशिष्ट भाग को और विस्तार से समझाऊं?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center space-x-2">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <span>{text[language].title}</span>
          </h2>
          <p className="text-lg text-slate-600">{text[language].subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-r from-blue-600 to-emerald-600'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span className="text-sm">{text[language].typing}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Example Questions */}
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex flex-wrap gap-2 mb-4">
              {text[language].exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className="text-sm bg-white border border-slate-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={text[language].placeholder}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};