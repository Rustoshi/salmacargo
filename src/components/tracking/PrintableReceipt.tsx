import { IPackage, IShipmentHistory } from '@/types/models';
import Image from 'next/image';

interface PrintableReceiptProps {
  package_: IPackage;
  history: IShipmentHistory[];
}

export default function PrintableReceipt({ package_, history }: PrintableReceiptProps) {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="print-only bg-white p-8 text-foreground">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-300 pb-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-jakarta">Shipping Receipt</h1>
          <p className="text-foreground/60">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <div className="relative w-32 h-32">
            <div className="absolute top-0 right-0 w-32 h-32 flex items-center justify-center border-4 border-primary rounded-full">
              <div className="text-center">
                <div className="text-primary font-bold">DELIVERED</div>
                <div className="text-sm text-primary/60">{formatDate(package_.expectedDeliveryDate)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Info */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Tracking Information</h2>
        <div className="grid grid-cols-2 gap-4 text-foreground">
          <div>
            <p className="font-medium">Tracking ID:</p>
            <p>{package_.trackingID}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <p className="capitalize">{package_.status}</p>
          </div>
        </div>
      </div>

      {/* Sender & Receiver Details */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h2 className="text-lg font-medium mb-2">From</h2>
          <div className="space-y-1 text-foreground">
            <p>{package_.senderName}</p>
            <p>{package_.originAddress}</p>
            {package_.senderEmail && <p>Email: {package_.senderEmail}</p>}
            {package_.senderPhone && <p>Phone: {package_.senderPhone}</p>}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">To</h2>
          <div className="space-y-1 text-foreground">
            <p>{package_.receiverName}</p>
            <p>{package_.destinationAddress}</p>
            {package_.receiverEmail && <p>Email: {package_.receiverEmail}</p>}
            {package_.receiverPhone && <p>Phone: {package_.receiverPhone}</p>}
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Package Details</h2>
        <div className="grid grid-cols-3 gap-4 text-foreground">
          <div>
            <p className="font-medium">Weight:</p>
            <p>{package_.weight} kg</p>
          </div>
          <div>
            <p className="font-medium">Freight Type:</p>
            <p className="capitalize">{package_.freight}</p>
          </div>
          <div>
            <p className="font-medium">Charges:</p>
            <p>${package_.charges.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Shipment History */}
      <div>
        <h2 className="text-lg font-medium mb-2">Shipment History</h2>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="text-foreground">
              <p className="font-medium">{item.status}</p>
              <p>{item.currentLocation}</p>
              <p>{item.notes}</p>
              <p className="text-sm text-foreground/60">
                {formatDate(item.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-300 text-center text-foreground/60">
        <p>This is an official shipping receipt. Please retain for your records.</p>
      </div>
    </div>
  );
}
