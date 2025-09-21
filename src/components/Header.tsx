import React from 'react';
import { Scale, Globe, ToggleLeft, ToggleRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentView: 'home' | 'upload' | 'dashboard' | 'compare' | 'templates' | 'collaborate';
  onNavigate: (view: 'home' | 'upload' | 'dashboard' | 'compare' | 'templates' | 'collaborate') => void;
  isSimpleMode: boolean;
  onToggleMode: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  user: User | null | undefined;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  isSimpleMode,
  onToggleMode,
  language,
  onToggleLanguage,
  user,
  onSignIn,
  onSignOut
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const text = {
    en: {
      brand: 'LegalEase AI',
      home: 'Home',
      upload: 'Upload',
      dashboard: 'Dashboard',
      compare: 'Compare',
      templates: 'Templates',
      collaborate: 'Collaborate',
      simple: 'Simple',
      detailed: 'Detailed',
      signIn: 'Sign In',
      signOut: 'Sign Out'
    },
    hi: {
      brand: 'लीगल ईज़ एआई',
      home: 'होम',
      upload: 'अपलोड',
      dashboard: 'डैशबोर्ड',
      compare: 'तुलना',
      templates: 'टेम्प्लेट',
      collaborate: 'सहयोग',
      simple: 'सरल',
      detailed: 'विस्तृत',
      signIn: 'साइन इन',
      signOut: 'साइन आउट'
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">{text[language].brand}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {text[language].home}
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'upload' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {text[language].upload}
            </button>
            <button
              onClick={() => onNavigate('compare')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'compare' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {text[language].compare}
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentView === 'templates' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {text[language].templates}
            </button>
            {currentView === 'dashboard' && (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-3 py-2 rounded-md text-blue-600 bg-blue-50"
                >
                  {text[language].dashboard}
                </button>
                <button
                  onClick={() => onNavigate('collaborate')}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentView === 'collaborate' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {text[language].collaborate}
                </button>
              </>
            )}
          </nav>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Mode Toggle */}
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <span className={`text-sm px-2 py-1 rounded-md transition-all ${
                isSimpleMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'
              }`}>
                {text[language].simple}
              </span>
              <button
                onClick={onToggleMode}
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                {isSimpleMode ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
              </button>
              <span className={`text-sm px-2 py-1 rounded-md transition-all ${
                !isSimpleMode ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'
              }`}>
                {text[language].detailed}
              </span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Globe className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                {language === 'en' ? 'EN' : 'हि'}
              </span>
            </button>

            {/* Sign In Button */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.displayName?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user.displayName}</span>
                </div>
                <button 
                  onClick={onSignOut}
                  className="text-slate-600 hover:text-red-600 transition-colors text-sm"
                >
                  {text[language].signOut}
                </button>
              </div>
            ) : (
              <button 
                onClick={onSignIn}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {text[language].signIn}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600"
              >
                {text[language].home}
              </button>
              <button
                onClick={() => {
                  onNavigate('upload');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600"
              >
                {text[language].upload}
              </button>
              <button
                onClick={() => {
                  onNavigate('compare');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600"
              >
                {text[language].compare}
              </button>
              <button
                onClick={() => {
                  onNavigate('templates');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-600 hover:text-blue-600"
              >
                {text[language].templates}
              </button>
              
              {/* Mobile Controls */}
              <div className="px-4 py-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    {isSimpleMode ? text[language].simple : text[language].detailed}
                  </span>
                  <button
                    onClick={onToggleMode}
                    className="text-blue-600"
                  >
                    {isSimpleMode ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
                  </button>
                </div>
                
                <button
                  onClick={onToggleLanguage}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{language === 'en' ? 'English' : 'हिंदी'}</span>
                </button>

                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs">
                        {user.displayName?.[0] || 'U'}
                      </div>
                      <span className="text-sm">{user.displayName}</span>
                    </div>
                    <button 
                      onClick={onSignOut}
                      className="w-full text-red-600 px-4 py-2 border border-red-300 rounded-lg"
                    >
                      {text[language].signOut}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={onSignIn}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    {text[language].signIn}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};