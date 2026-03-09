'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StatusBadge from '@/components/tracking/StatusBadge';
import LogisticsMap from '@/components/logisitcsmap/LogisticsMap';
import PrintableReceipt from '@/components/tracking/PrintableReceipt';
import { IPackage, IShipmentHistory } from '@/types/models';


export default function TrackingPage() {
  const router = useRouter();
  const { trackingID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [package_, setPackage] = useState<IPackage | null>(null);
  const [history, setHistory] = useState<IShipmentHistory[]>([]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/package/track?id=${trackingID}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch package details');
        }

        const data = await response.json();
        setPackage(data.package);
        setHistory(data.history);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch package details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [trackingID]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error || !package_) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'Unable to find package details'}</p>
          <button
            onClick={() => router.push('/track')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
          >
            Track Another Package
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen p-4 md:p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Package Details</h1>
              <p className="text-gray-600">Tracking ID: {package_.trackingID}</p>
            </div>
            <div className="flex">
              <StatusBadge status={package_.status} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="font-medium text-gray-900 mb-2">Sender Details</h2>
              <div className="space-y-1 text-gray-600">
                <p>{package_.senderName}</p>
                <p>{package_.originAddress}</p>
                {package_.senderEmail && <p>Email: {package_.senderEmail}</p>}
                {package_.senderPhone && <p>Phone: {package_.senderPhone}</p>}
              </div>
            </div>

            <div>
              <h2 className="font-medium text-gray-900 mb-2">Receiver Details</h2>
              <div className="space-y-1 text-gray-600">
                <p>{package_.receiverName}</p>
                <p>{package_.destinationAddress}</p>
                {package_.receiverEmail && <p>Email: {package_.receiverEmail}</p>}
                {package_.receiverPhone && <p>Phone: {package_.receiverPhone}</p>}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-medium text-gray-900 mb-2">Current Location</h2>
            <p className="text-gray-600">{package_.currentLocation}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h2 className="font-medium text-gray-900 mb-2">Weight</h2>
              <p className="text-gray-600">{package_.weight} kg</p>
            </div>
            <div>
              <h2 className="font-medium text-gray-900 mb-2">Freight Type</h2>
              <p className="text-gray-600 capitalize">{package_.freight}</p>
            </div>
            <div>
              <h2 className="font-medium text-gray-900 mb-2">Charges</h2>
              <p className="text-gray-600">${package_.charges.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h2 className="font-medium text-gray-900 mb-2">Expected Delivery</h2>
            <p className="text-gray-600">
              {formatDate(package_.expectedDeliveryDate)}
            </p>
          </div>

          {package_.description && (
            <div className="mb-8">
              <h2 className="font-medium text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{package_.description}</p>
            </div>
          )}

          <div>
            <h2 className="font-medium text-gray-900 mb-4">Shipment History</h2>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border-l-2 border-gray-200 pl-4 pb-4 relative"
                >
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0" />
                  <p className="font-medium text-gray-900">{item.status}</p>
                  <p className="text-gray-600">{item.currentLocation}</p>
                  <p className="text-gray-600">{item.notes}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* embed google mapes */}
          <LogisticsMap coordinates={history.map(item => item.currentCoords)}/>
        </div>
      </main>

      {/* Printable Receipt (hidden until print) */}
      <div className="hidden">
        <PrintableReceipt package_={package_} history={history} />
      </div>
    </>
  );
}
