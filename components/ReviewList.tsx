
import React from 'react';
import type { Review } from '../types';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
        <div className="text-center mt-12">
            <h3 className="text-xl font-medium text-slate-600">Your results will appear here.</h3>
            <p className="text-slate-500 mt-2">Start by pasting a paper's content and asking a question.</p>
        </div>
    );
  }

  return (
    <section className="mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 border-b pb-2">Analysis History</h2>
        {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </section>
  );
};
