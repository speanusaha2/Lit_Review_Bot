
import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ReviewList } from './components/ReviewList';
import { analyzePaper } from './services/geminiService';
import type { Review } from './types';
import { Header } from './components/Header';
import { LoadingSpinner, ErrorIcon } from './components/icons';

const App: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (paperText: string, question: string, file?: File) => {
    if ((!paperText.trim() && !file) || !question.trim()) {
      setError("Please provide the paper content (either text or PDF) and a question.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let source: { text?: string; file?: { data: string; mimeType: string; } };
      let paperSnippet: string;

      if (file) {
        const base64Data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error("Failed to read file as base64"));
                }
            };
            reader.onerror = error => reject(error);
        });
        source = { file: { data: base64Data, mimeType: file.type } };
        paperSnippet = `File: ${file.name}`;
      } else {
        source = { text: paperText };
        paperSnippet = paperText.substring(0, 100) + '...';
      }
      
      const answer = await analyzePaper(source, question);
      const newReview: Review = {
        id: new Date().toISOString(),
        question,
        answer,
        paperSnippet,
      };
      setReviews(prevReviews => [newReview, ...prevReviews]);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to get analysis: ${e.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            <ErrorIcon />
            <p>{error}</p>
          </div>
        )}

        {isLoading && reviews.length === 0 && (
           <div className="mt-8 flex flex-col items-center justify-center text-slate-500">
             <LoadingSpinner />
             <p className="mt-2 text-lg">Analyzing your first document...</p>
           </div>
        )}

        <ReviewList reviews={reviews} />
      </main>
    </div>
  );
};

export default App;
