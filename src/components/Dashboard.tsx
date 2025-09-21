import React from 'react';
import { AlertTriangle, CheckCircle, Info, ExternalLink, Download, Share, Users, FileText, BarChart3 } from 'lucide-react';
import { DocumentAnalysis } from '../types';

interface DashboardProps {
  analysisResult: DocumentAnalysis;
  isSimpleMode: boolean;
  language: 'en' | 'hi';
  onNavigate: (section: string) => void;
  fileName: string;
  speakExplanation: (explanation: string, language: 'en' | 'hi') => Promise<void>;
  audioExplanationUrl: string;
  isSpeaking: boolean;
  speechError: Error | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  analysisResult, 
  isSimpleMode, 
  language,
  onNavigate,
  fileName,
  speakExplanation,
  audioExplanationUrl,
  isSpeaking,
  speechError
}) => {
  const text = {
    en: {
      analysis: 'Document Analysis',
      summary: 'Summary',
      risks: 'Risk Analysis',
      keyTerms: 'Key Terms',
      recommendations: 'Recommendations',
      compliance: 'Legal Compliance',
      high: 'High Risk',
      medium: 'Medium Risk',
      low: 'Low Risk',
      critical: 'Critical Risk',
      impact: 'Impact',
      noRisks: 'No significant risks detected',
      actions: 'Actions',
      download: 'Download Report',
      share: 'Share Analysis',
      compareDocuments: 'Compare Documents',
      getTemplates: 'Get Templates',
      collaborate: 'Collaborate',
      compliant: 'Compliant',
      nonCompliant: 'Non-Compliant',
      unclear: 'Unclear'
    },
    hi: {
      analysis: 'दस्तावेज़ विश्लेषण',
      summary: 'सारांश',
      risks: 'जोखिम विश्लेषण',
      keyTerms: 'मुख्य शब्द',
      recommendations: 'सिफारिशें',
      compliance: 'कानूनी अनुपालन',
      high: 'उच्च जोखिम',
      medium: 'मध्यम जोखिम',
      low: 'कम जोखिम',
      critical: 'गंभीर जोखिम',
      impact: 'प्रभाव',
      noRisks: 'कोई महत्वपूर्ण जोखिम नहीं मिला',
      actions: 'क्रियाएं',
      download: 'रिपोर्ट डाउनलोड करें',
      share: 'विश्लेषण साझा करें',
      compareDocuments: 'दस्तावेज़ों की तुलना करें',
      getTemplates: 'टेम्प्लेट प्राप्त करें',
      collaborate: 'सहयोग करें',
      compliant: 'अनुपालित',
      nonCompliant: 'गैर-अनुपालित',
      unclear: 'अस्पष्ट'
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-900';
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              {text[language].analysis}
            </h1>
            <p className="text-slate-600">
              Analysis for: <span className="font-semibold">{fileName}</span>
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => onNavigate('compare')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{text[language].compareDocuments}</span>
            </button>
            <button 
              onClick={() => onNavigate('templates')}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{text[language].getTemplates}</span>
            </button>
            <button 
              onClick={() => onNavigate('collaborate')}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{text[language].collaborate}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{text[language].download}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">{text[language].share}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{text[language].summary}</span>
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {analysisResult.summary ? (isSimpleMode ? analysisResult.summary.simple : analysisResult.summary.detailed) : 'Summary not available.'}
              </p>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>{text[language].risks}</span>
            </h2>
            
            {analysisResult.risks.length > 0 ? (
              <div className="space-y-4">
                {analysisResult.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getRiskColor(risk.level)}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getRiskIcon(risk.level)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-slate-800">{risk.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            risk.level === 'high' ? 'bg-red-100 text-red-700' :
                            risk.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            risk.level === 'critical' ? 'bg-red-200 text-red-800' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {text[language][risk.level as keyof typeof text[typeof language]]}
                          </span>
                        </div>
                        <p className="text-slate-700 mb-3">{risk.description}</p>
                        <div className="bg-white/50 rounded-lg p-3">
                          <p className="text-sm">
                            <span className="font-medium text-slate-600">{text[language].impact}:</span>
                            <span className="text-slate-700 ml-1">{risk.impact}</span>
                          </p>
                          {risk.suggestion && (
                            <p className="text-sm mt-2">
                              <span className="font-medium text-slate-600">Suggestion:</span>
                              <span className="text-slate-700 ml-1">{risk.suggestion}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-600">{text[language].noRisks}</p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{text[language].recommendations}</span>
              </h2>
              <div className="space-y-3">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Key Terms */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
              <ExternalLink className="h-5 w-5 text-blue-500" />
              <span>{text[language].keyTerms}</span>
            </h2>
            
            <div className="space-y-4">
              {analysisResult.keyTerms?.map((term, index) => {
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <h3 className="font-semibold text-slate-800">{term.term}</h3>
                    <p className="text-slate-600 text-sm">{term.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};