export interface DocumentAnalysis {
  id: string;
  fileName: string;
  uploadDate: Date;
  summary: {
    simple: string;
    detailed: string;
  };
  risks: Risk[];
  keyTerms: KeyTerm[];
  riskScore: number;
  documentType: string;
  clauses: Clause[];
  recommendations: string[];
  legalCompliance: ComplianceCheck[];
}

export interface Risk {
  id: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  suggestion: string;
  category: string;
}

export interface KeyTerm {
  term: string;
  explanation: string;
  importance: 'high' | 'medium' | 'low';
  relatedClauses: string[];
}

export interface Clause {
  id: string;
  title: string;
  content: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  explanation: string;
  alternatives: string[];
}

export interface ComplianceCheck {
  regulation: string;
  status: 'compliant' | 'non-compliant' | 'unclear';
  details: string;
}

export interface DocumentComparison {
  document1: string;
  document2: string;
  differences: ComparisonDifference[];
  recommendation: string;
}

export interface ComparisonDifference {
  section: string;
  type: 'addition' | 'removal' | 'modification';
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface SmartTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  template: string;
  customizableFields: TemplateField[];
}

export interface TemplateField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
}

export interface AIInsight {
  type: 'warning' | 'suggestion' | 'info';
  title: string;
  description: string;
  confidence: number;
}