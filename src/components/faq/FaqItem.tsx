'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onClick?: () => void;
}

const FaqItem = ({ question, answer, isOpen = false, onClick }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-primary/5 transition-colors"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-text-primary pr-8">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-8 pb-8 pt-2">
          <p className="text-text-secondary leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
