import React from 'react';
import { Upload, Shield, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Demystify
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {' '}Legal Documents
              </span>
              <br />
              with AI Power
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Transform complex legal jargon into clear, understandable guidance. 
              Make informed decisions with confidence using our AI-powered legal assistant.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Document</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300">
              View Demo
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Instant Analysis</h3>
              <p className="text-slate-600">
                Get comprehensive document analysis in seconds using advanced AI technology.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Risk Detection</h3>
              <p className="text-slate-600">
                Identify potentially unfavorable terms and hidden risks in your legal documents.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Multi-Language</h3>
              <p className="text-slate-600">
                Supports English and Hindi with more languages coming soon.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              Powered by Advanced AI Technology
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-slate-600">Documents Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
                <div className="text-slate-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-slate-600">Document Types</div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-12 flex items-center justify-center space-x-2 text-slate-500">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Enterprise-grade security • GDPR compliant • End-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};