'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StatusBadge } from '../../../../components/ui/status-badge';

interface PackageTrackerProps {
  history: {
    currentLocation: string;
    status: 'pending' | 'processing' | 'in transit' | 'delivered' | 'cancelled';
    notes?: string;
    createdAt: string;
    coordinates?: [number, number];
  }[];
  getStaticMapUrl: (coordinates: [number, number]) => string;
  isValidCoordinates: (coordinates: [number, number] | undefined) => coordinates is [number, number];
  LocationDisplay: React.ComponentType<{ location: string }>;
  ErrorDisplay: React.ComponentType<{ message: string; onRetry: () => void }>;
}

export function PackageTracker({
  history,
  getStaticMapUrl,
  isValidCoordinates,
  LocationDisplay,
  ErrorDisplay,
}: PackageTrackerProps) {
  const [mapError, setMapError] = useState<string>('');

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-foreground">Location Map</h2>
        <StatusBadge status={history[0].status} />
      </div>
      <div className="h-[400px] w-full rounded-lg overflow-hidden border border-border relative bg-background shadow-sm">
        {mapError ? (
          <ErrorDisplay
            message={mapError}
            onRetry={() => {
              setMapError('');
            }}
          />
        ) : (
          <div className="relative w-full h-full group">
            <div className="absolute inset-0 bg-background/20" />
            {isValidCoordinates(history[0].coordinates) ? (
              <>
                <div className="relative w-full h-full">
                  <Image
                    src={getStaticMapUrl(history[0].coordinates!)}
                    alt={`Map showing location at ${history[0].currentLocation}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-opacity group-hover:opacity-95"
                    onError={(e) => {
                      console.error('Map loading error:', e);
                      setMapError('Unable to load map. Please try again later.');
                    }}
                    priority
                    unoptimized
                  />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-2">
                  <div className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-full shadow-lg">
                    Current Location
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-primary/90 shadow-lg animate-pulse" />
                </div>
              </>
            ) : (
              <LocationDisplay location={history[0].currentLocation} />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-background/95 p-4 backdrop-blur-sm border-t border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground mb-1 truncate">
                    {history[0].currentLocation}
                  </p>
                  <p className="text-xs text-foreground/60">
                    Last updated: {new Date(history[0].createdAt).toLocaleString()}
                  </p>
                  {history[0].notes && (
                    <p className="text-xs text-foreground/60 mt-2 line-clamp-2">
                      Note: {history[0].notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={history[0].status} />
                  {isValidCoordinates(history[0].coordinates) && (
                    <p className="text-xs text-foreground/60">
                      {history[0].coordinates![1].toFixed(6)}, {history[0].coordinates![0].toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
