import React from 'react';
import { Shield, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';

type Language = 'en' | 'hi';
type TextContent = {
  title: string;
  score: string;
  breakdown: string;
  critical: string;
  high: string;
  medium: string;
  low: string;
  categories: {
    financial: string;
    legal: string;
    operational: string;
    compliance: string;
  };
  recommendations: string;
  excellent: string;
  good: string;
  fair: string;
  poor: string;
  critical_level: string;
};

type TextType = {
  [key in Language]: TextContent;
};

interface RiskScoringProps {
  riskScore: number;
  risks: Array<{
    level: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    category: string;
  }>;
  language: Language;
}

export const RiskScoring: React.FC<RiskScoringProps> = ({ riskScore, risks, language }) => {
  const text: TextType = {
    en: {
      title: 'Risk Assessment',
      score: 'Risk Score',
      breakdown: 'Risk Breakdown',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      categories: {
        financial: 'Financial',
        legal: 'Legal',
        operational: 'Operational',
        compliance: 'Compliance'
      },
      recommendations: 'Recommendations',
      excellent: 'Excellent - Very Low Risk',
      good: 'Good - Low Risk',
      fair: 'Fair - Medium Risk',
      poor: 'Poor - High Risk',
      critical_level: 'Critical - Very High Risk'
    },
    hi: {
      title: 'जोखिम मूल्यांकन',
      score: 'जोखिम स्कोर',
      breakdown: 'जोखिम विवरण',
      critical: 'गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      categories: {
        financial: 'वित्तीय',
        legal: 'कानूनी',
        operational: 'परिचालन',
        compliance: 'अनुपालन'
      },
      recommendations: 'सिफारिशें',
      excellent: 'उत्कृष्ट - बहुत कम जोखिम',
      good: 'अच्छा - कम जोखिम',
      fair: 'ठीक - मध्यम जोखिम',
      poor: 'खराब - उच्च जोखिम',
      critical_level: 'गंभीर - बहुत उच्च जोखिम'
    }
  };

  const getRiskLevel = (score: number): { level: keyof TextContent; color: string; bg: string } => {
    if (score <= 2) return { level: 'excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score <= 4) return { level: 'good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score <= 6) return { level: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (score <= 8) return { level: 'poor', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'critical_level', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const riskLevel = getRiskLevel(riskScore);
  const riskCounts = {
    critical: risks.filter(r => r.level === 'critical').length,
    high: risks.filter(r => r.level === 'high').length,
    medium: risks.filter(r => r.level === 'medium').length,
    low: risks.filter(r => r.level === 'low').length
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'high': return <TrendingUp className="h-5 w-5 text-orange-500" />;
      case 'medium': return <TrendingDown className="h-5 w-5 text-yellow-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">{text[language].title}</h3>
      </div>

      {/* Risk Score Display */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={riskLevel.color.replace('text-', '#')}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(riskScore / 10) * 314} 314`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${riskLevel.color}`}>
                {riskScore.toFixed(1)}
              </div>
              <div className="text-xs text-slate-500">/ 10</div>
            </div>
          </div>
        </div>
        
        <div className={`inline-block px-4 py-2 rounded-full ${riskLevel.bg} ${riskLevel.color} font-medium`}>
          {text[language][riskLevel.level as keyof TextContent]}
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="mb-6">
        <h4 className="font-semibold text-slate-800 mb-4">{text[language].breakdown}</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(riskCounts).map(([level, count]) => (
            <div key={level} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getRiskIcon(level)}
                <span className="text-sm font-medium text-slate-700">
                  {text[language][level as keyof TextContent]}
                </span>
              </div>
              <span className={`font-bold ${
                level === 'critical' ? 'text-red-600' :
                level === 'high' ? 'text-orange-600' :
                level === 'medium' ? 'text-yellow-600' :
                'text-blue-600'
              }`}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Categories */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800">{text[language].categories.financial}</h4>
        {(['financial', 'legal', 'operational', 'compliance'] as const).map(category => {
          const categoryRisks = risks.filter(r => r.category.toLowerCase() === category);
          const categoryScore = categoryRisks.length > 0 ? 
            categoryRisks.reduce((acc, risk) => {
              const scores = { critical: 4, high: 3, medium: 2, low: 1 };
              return acc + scores[risk.level];
            }, 0) / categoryRisks.length : 0;

          return (
            <div key={category} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">
                {text[language].categories[category]}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      categoryScore <= 1.5 ? 'bg-green-500' :
                      categoryScore <= 2.5 ? 'bg-yellow-500' :
                      categoryScore <= 3.5 ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(categoryScore / 4) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {categoryScore.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};