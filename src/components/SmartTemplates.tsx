import React, { useState } from 'react';
import { FileText, Download, Edit, Star, Filter } from 'lucide-react';
import { SmartTemplate } from '../types';

interface SmartTemplatesProps {
  language: 'en' | 'hi';
}

export const SmartTemplates: React.FC<SmartTemplatesProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<SmartTemplate | null>(null);

  const text = {
    en: {
      title: 'Smart Contract Templates',
      subtitle: 'AI-generated, legally sound templates customized for your needs',
      categories: 'Categories',
      all: 'All',
      rental: 'Rental',
      employment: 'Employment',
      business: 'Business',
      personal: 'Personal',
      customize: 'Customize Template',
      download: 'Download',
      popular: 'Popular',
      new: 'New'
    },
    hi: {
      title: 'स्मार्ट अनुबंध टेम्प्लेट',
      subtitle: 'AI-जनरेटेड, कानूनी रूप से सही टेम्प्लेट आपकी आवश्यकताओं के लिए अनुकूलित',
      categories: 'श्रेणियां',
      all: 'सभी',
      rental: 'किराया',
      employment: 'रोजगार',
      business: 'व्यापार',
      personal: 'व्यक्तिगत',
      customize: 'टेम्प्लेट अनुकूलित करें',
      download: 'डाउनलोड',
      popular: 'लोकप्रिय',
      new: 'नया'
    }
  };

  const templates: SmartTemplate[] = [
    {
      id: '1',
      name: 'Residential Lease Agreement',
      category: 'rental',
      description: 'Comprehensive rental agreement with tenant-friendly clauses',
      template: 'RESIDENTIAL LEASE AGREEMENT\n\nThis agreement is made between...',
      customizableFields: [
        { name: 'landlordName', type: 'text', required: true },
        { name: 'tenantName', type: 'text', required: true },
        { name: 'rentAmount', type: 'number', required: true },
        { name: 'securityDeposit', type: 'number', required: true },
        { name: 'leaseStartDate', type: 'date', required: true },
        { name: 'leaseDuration', type: 'select', required: true, options: ['6 months', '1 year', '2 years'] }
      ]
    },
    {
      id: '2',
      name: 'Employment Contract',
      category: 'employment',
      description: 'Standard employment agreement with fair terms',
      template: 'EMPLOYMENT AGREEMENT\n\nThis employment agreement is entered into...',
      customizableFields: [
        { name: 'employerName', type: 'text', required: true },
        { name: 'employeeName', type: 'text', required: true },
        { name: 'position', type: 'text', required: true },
        { name: 'salary', type: 'number', required: true },
        { name: 'startDate', type: 'date', required: true }
      ]
    },
    {
      id: '3',
      name: 'Service Agreement',
      category: 'business',
      description: 'Professional service contract for freelancers and consultants',
      template: 'SERVICE AGREEMENT\n\nThis service agreement is made between...',
      customizableFields: [
        { name: 'clientName', type: 'text', required: true },
        { name: 'serviceName', type: 'text', required: true },
        { name: 'projectFee', type: 'number', required: true },
        { name: 'deliveryDate', type: 'date', required: true }
      ]
    }
  ];

  const categories = ['all', 'rental', 'employment', 'business', 'personal'];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{text[language].title}</h2>
        <p className="text-lg text-slate-600">{text[language].subtitle}</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-slate-600" />
          <span className="font-semibold text-slate-800">{text[language].categories}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {text[language][category as keyof typeof text[typeof language]]}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div key={template.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex space-x-1">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  {text[language].popular}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{template.name}</h3>
            <p className="text-slate-600 text-sm mb-4">{template.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-slate-500 ml-1">4.8</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTemplate(template)}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  {text[language].customize}
                </button>
                <button className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg hover:bg-emerald-100 transition-colors text-sm">
                  <Download className="h-4 w-4 inline mr-1" />
                  {text[language].download}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Customization Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">{selectedTemplate.name}</h3>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedTemplate.customizableFields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {field.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select...</option>
                        {field.options?.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${field.name}`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg transition-all">
                  Generate Contract
                </button>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};