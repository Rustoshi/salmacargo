'use client';

import { IShipmentHistory } from '@/types/models';
import { MapPin, Package, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TimelineProps {
  history: IShipmentHistory[];
}

export default function Timeline({ history }: TimelineProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {history.map((event, eventIdx) => (
          <li key={event.createdAt?.toString()}>
            <div className="relative pb-8">
              {eventIdx !== history.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {event.status === 'delivered' ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : event.status === 'in transit' ? (
                      <Package className="h-5 w-5 text-primary" />
                    ) : (
                      <MapPin className="h-5 w-5 text-primary" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p className="text-sm text-text-primary font-medium">
                      {event.currentLocation}
                    </p>
                    {event.notes && (
                      <p className="mt-0.5 text-sm text-text-secondary">
                        {event.notes}
                      </p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-text-secondary">
                    <time dateTime={event.createdAt?.toISOString()}>
                      {event.createdAt
                        ? formatDistanceToNow(event.createdAt, { addSuffix: true })
                        : ''}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
