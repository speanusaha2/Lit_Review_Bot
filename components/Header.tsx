
import React from 'react';
import { BookIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BookIcon />
            <h1 className="text-xl font-bold text-slate-900">Lit Review Bot</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
