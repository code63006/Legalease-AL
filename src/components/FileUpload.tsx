import React, { useState, useRef } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  language: 'en' | 'hi';
  loading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, language, loading: externalLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(externalLoading || false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setUploading(externalLoading || false);
  }, [externalLoading]);

  const text = {
    en: {
      title: 'Upload Your Legal Document',
      subtitle: 'Drag and drop your document here, or click to select',
      supportedFormats: 'Supported formats: PDF, PNG, JPG (Max 10MB)',
      selectFile: 'Select File',
      analyzing: 'Analyzing Document...',
      uploadAnother: 'Upload Another Document',
      fileName: 'File Name',
      fileSize: 'File Size',
      analyze: 'Analyze Document',
      errors: {
        invalidType: 'Please upload a valid file type (PDF, PNG, JPG)',
        tooLarge: 'File size must be less than 10MB',
        uploadFailed: 'Upload failed. Please try again.'
      }
    },
    hi: {
      title: 'अपना कानूनी दस्तावेज़ अपलोड करें',
      subtitle: 'अपना दस्तावेज़ यहाँ ड्रैग और ड्रॉप करें, या चुनने के लिए क्लिक करें',
      supportedFormats: 'समर्थित प्रारूप: PDF, PNG, JPG (अधिकतम 10MB)',
      selectFile: 'फ़ाइल चुनें',
      analyzing: 'दस्तावेज़ का विश्लेषण...',
      uploadAnother: 'दूसरा दस्तावेज़ अपलोड करें',
      fileName: 'फ़ाइल का नाम',
      fileSize: 'फ़ाइल का आकार',
      analyze: 'दस्तावेज़ का विश्लेषण करें',
      errors: {
        invalidType: 'कृपया एक वैध फ़ाइल प्रकार अपलोड करें (PDF, PNG, JPG)',
        tooLarge: 'फ़ाइल का आकार 10MB से कम होना चाहिए',
        uploadFailed: 'अपलोड विफल। कृपया पुनः प्रयास करें।'
      }
    }
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError(text[language].errors.invalidType);
      return false;
    }

    if (file.size > maxSize) {
      setError(text[language].errors.tooLarge);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    if (file) {
      onFileUpload(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          {text[language].title}
        </h2>
        <p className="text-lg text-slate-600">
          {text[language].subtitle}
        </p>
      </div>

      {!file ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-4 rounded-full">
              <Upload className="h-12 w-12 text-white" />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-slate-700">
                {text[language].subtitle}
              </p>
              <p className="text-sm text-slate-500">
                {text[language].supportedFormats}
              </p>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {text[language].selectFile}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <File className="h-8 w-8 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-800 truncate">
                    {file.name}
                  </h3>
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                  <div>
                    <span className="font-medium">{text[language].fileName}:</span>
                    <p className="truncate">{file.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">{text[language].fileSize}:</span>
                    <p>{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAnalyze}
                    disabled={uploading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>{text[language].analyzing}</span>
                      </>
                    ) : (
                      <span>{text[language].analyze}</span>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      setFile(null);
                      setError(null);
                      setUploading(false);
                    }}
                    className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Loader className="h-5 w-5 text-blue-600 animate-spin" />
                <span className="text-blue-800">{text[language].analyzing}</span>
              </div>
              <div className="mt-3 bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <span className="text-red-800">{error}</span>
        </div>
      )}
    </div>
  );
};