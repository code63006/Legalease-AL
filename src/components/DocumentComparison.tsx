import React, { useState } from 'react';
import { FileText, ArrowRight, AlertTriangle, CheckCircle, Info, Upload } from 'lucide-react';
import useAI from '../hooks/useAI';
import { DocumentComparison as ComparisonType } from '../types';

interface DocumentComparisonProps {
  language: 'en' | 'hi';
}

export const DocumentComparison: React.FC<DocumentComparisonProps> = ({ language }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [comparison, setComparison] = useState<ComparisonType | null>(null);
  const { compareDocuments, loading } = useAI();

  const text = {
    en: {
      title: 'Document Comparison',
      subtitle: 'Compare two legal documents to identify key differences',
      document1: 'Document 1',
      document2: 'Document 2',
      upload: 'Upload Document',
      compare: 'Compare Documents',
      differences: 'Key Differences',
      recommendation: 'Recommendation',
      positive: 'Favorable',
      negative: 'Unfavorable',
      neutral: 'Neutral'
    },
    hi: {
      title: 'दस्तावेज़ तुलना',
      subtitle: 'मुख्य अंतर की पहचान के लिए दो कानूनी दस्तावेज़ों की तुलना करें',
      document1: 'दस्तावेज़ 1',
      document2: 'दस्तावेज़ 2',
      upload: 'दस्तावेज़ अपलोड करें',
      compare: 'दस्तावेज़ों की तुलना करें',
      differences: 'मुख्य अंतर',
      recommendation: 'सिफारिश',
      positive: 'अनुकूल',
      negative: 'प्रतिकूल',
      neutral: 'तटस्थ'
    }
  };

  const handleCompare = async () => {
    if (file1 && file2) {
      const result = await compareDocuments(file1, file2);
      setComparison(result);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <CheckCircle className="h-5 w-5" />;
      case 'negative': return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{text[language].title}</h2>
        <p className="text-lg text-slate-600">{text[language].subtitle}</p>
      </div>

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{text[language].document1}</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile1(e.target.files?.[0] || null)}
              className="hidden"
              id="file1"
            />
            <label htmlFor="file1" className="cursor-pointer">
              {file1 ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <span className="text-slate-700">{file1.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                  <p className="text-slate-600">{text[language].upload}</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{text[language].document2}</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile2(e.target.files?.[0] || null)}
              className="hidden"
              id="file2"
            />
            <label htmlFor="file2" className="cursor-pointer">
              {file2 ? (
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <span className="text-slate-700">{file2.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                  <p className="text-slate-600">{text[language].upload}</p>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleCompare}
          disabled={!file1 || !file2 || loading}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
        >
          <span>{text[language].compare}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Comparison Results */}
      {comparison && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{text[language].differences}</h3>
            <div className="space-y-4">
              {comparison.differences.map((diff, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getImpactColor(diff.impact)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getImpactIcon(diff.impact)}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{diff.section}</h4>
                      <p className="text-sm">{diff.description}</p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                        diff.impact === 'positive' ? 'bg-green-100 text-green-700' :
                        diff.impact === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {text[language][diff.impact as keyof typeof text[typeof language]]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">{text[language].recommendation}</h3>
            <p className="text-slate-700">{comparison.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
};