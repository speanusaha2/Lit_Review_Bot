
import React, { useState, useRef } from 'react';
import { LoadingSpinner, UploadIcon, CrossIcon } from './icons';

interface InputFormProps {
  onAnalyze: (paperText: string, question: string, file?: File) => void;
  isLoading: boolean;
}

const defaultQuestion = "In the paper, what livestock emission was measured and what method/technique/equipment were used? List them one by one, for example: NH3 --> acid trap, PM10--> TEOM";

export const InputForm: React.FC<InputFormProps> = ({ onAnalyze, isLoading }) => {
  const [inputType, setInputType] = useState<'text' | 'file'>('text');
  const [paperText, setPaperText] = useState('');
  const [question, setQuestion] = useState(defaultQuestion);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setPaperText(''); // Clear text input when a file is selected
    }
  };

  const removeFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPaperText(e.target.value);
      if (file) {
        removeFile(); // Clear file input when text is entered
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(paperText, question, file || undefined);
  };
  
  const activeTabClass = "border-blue-500 text-blue-600";
  const inactiveTabClass = "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300";

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Analyze a Research Paper</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                 <div className="border-b border-slate-200 mb-4">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button
                            type="button"
                            onClick={() => setInputType('text')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${inputType === 'text' ? activeTabClass : inactiveTabClass}`}
                        >
                            Paste Text
                        </button>
                        <button
                            type="button"
                            onClick={() => setInputType('file')}
                             className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${inputType === 'file' ? activeTabClass : inactiveTabClass}`}
                        >
                            Upload PDF
                        </button>
                    </nav>
                </div>
                
                {inputType === 'text' ? (
                    <div>
                        <label htmlFor="paper-text" className="block text-sm font-medium text-slate-700 mb-1">
                            Paste Paper Content
                        </label>
                        <textarea
                            id="paper-text"
                            value={paperText}
                            onChange={handleTextChange}
                            placeholder="Paste the full text of the research article here..."
                            className="w-full h-64 p-3 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Upload PDF File
                        </label>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon />
                                <div className="flex text-sm text-slate-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" accept="application/pdf" className="sr-only" onChange={handleFileChange} ref={fileInputRef} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PDF up to 20MB</p>
                            </div>
                        </div>
                        {file && (
                             <div className="mt-3 flex items-center justify-between bg-slate-50 p-2 rounded-md border border-slate-200">
                                <p className="text-sm text-slate-700 truncate">{file.name}</p>
                                <button type="button" onClick={removeFile} className="text-slate-500 hover:text-slate-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <span className="sr-only">Remove file</span>
                                    <CrossIcon />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="question" className="block text-sm font-medium text-slate-700 mb-1">
                    Your Question
                </label>
                <input
                    id="question"
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading || (!paperText.trim() && !file)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner />
                            <span className="ml-2">Analyzing...</span>
                        </>
                    ) : (
                        'Analyze Paper'
                    )}
                </button>
            </div>
        </form>
    </section>
  );
};
