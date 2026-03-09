'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackPage() {
  const router = useRouter();
  const [trackingID, setTrackingID] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/package/track?id=${trackingID}`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Package not found');
        return;
      }

      router.push(`/tracking/${trackingID}`);
    } catch (err) {
      setError('Failed to verify tracking ID');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Track Package</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="trackingID"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Tracking ID
              </label>
              <input
                type="text"
                id="trackingID"
                name="trackingID"
                value={trackingID}
                onChange={(e) => setTrackingID(e.target.value)}
                placeholder="Enter tracking ID"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                required
                disabled={isSubmitting}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Track Package'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
