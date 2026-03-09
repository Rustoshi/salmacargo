'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

const TrackingForm = ({ className = '' }: { className?: string }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      window.location.href = `/tracking/${trackingNumber}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative flex w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter your tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-full px-4 py-3 text-base rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary bg-white text-text-primary placeholder:text-text-secondary/70 shadow-lg"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-secondary text-white rounded-r-lg hover:bg-secondary-light transition-colors flex items-center justify-center font-medium shadow-lg"
        >
          <Search className="w-5 h-5" />
          <span className="ml-2">Track</span>
        </button>
      </div>
    </form>
  );
};

export default TrackingForm;
