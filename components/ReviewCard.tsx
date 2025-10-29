
import React from 'react';
import type { Review } from '../types';
import { AiIcon, QuestionIcon } from './icons';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="mb-4">
            <h4 className="flex items-center text-sm font-semibold text-slate-600 mb-2">
                <QuestionIcon />
                <span className="ml-2">Question Asked</span>
            </h4>
            <p className="text-slate-800 italic">"{review.question}"</p>
        </div>
        
        <div>
            <h4 className="flex items-center text-sm font-semibold text-slate-600 mb-2">
                <AiIcon />
                <span className="ml-2">AI Generated Answer</span>
            </h4>
            <div className="prose prose-slate max-w-none text-slate-800 bg-slate-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{review.answer}</p>
            </div>
        </div>

        <details className="mt-4 text-sm">
            <summary className="cursor-pointer text-slate-500 hover:text-slate-700">Show paper snippet</summary>
            <p className="mt-2 text-slate-600 bg-slate-100 p-3 rounded">{review.paperSnippet}</p>
        </details>
      </div>
    </article>
  );
};
