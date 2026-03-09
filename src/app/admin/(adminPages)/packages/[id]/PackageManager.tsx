
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';
import { IPackage, IShipmentHistory } from '@/types/models';

export default function PackageManager({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<IPackage | null>(null);
  const [shipmentHistory, setShipmentHistory] = useState<IShipmentHistory[]>([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [packageForm, setPackageForm] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    originAddress: '',
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    destinationAddress: '',
    weight: '',
    freight: '',
    charges: '',
    description: '',
    expectedDeliveryDate: ''
  });

  useEffect(() => {
    fetchPackage();
  }, []);

  useEffect(() => {
    if (packageData) {
      setPackageForm({
        senderName: packageData.senderName || '',
        senderEmail: packageData.senderEmail || '',
        senderPhone: packageData.senderPhone || '',
        originAddress: packageData.originAddress || '',
        receiverName: packageData.receiverName || '',
        receiverEmail: packageData.receiverEmail || '',
        receiverPhone: packageData.receiverPhone || '',
        destinationAddress: packageData.destinationAddress || '',
        weight: packageData.weight || '',
        freight: packageData.freight || '',
        charges: packageData.charges?.toString() || '',
        description: packageData.description || '',
        expectedDeliveryDate: packageData.expectedDeliveryDate ? new Date(packageData.expectedDeliveryDate).toISOString().split('T')[0] : ''
      });
    }
  }, [packageData]);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/package/track?id=${encodeURIComponent(id)}`);
      if (!response.ok) throw new Error('Failed to fetch package');
      const data = await response.json();
      setPackageData(data.package);
      setShipmentHistory(data.history);
      setCurrentLocation(data.package.currentLocation || '');
      setStatus(data.package.status || '');
      setPackageForm({
        senderName: data.package.senderName || '',
        senderEmail: data.package.senderEmail || '',
        senderPhone: data.package.senderPhone || '',
        originAddress: data.package.originAddress || '',
        receiverName: data.package.receiverName || '',
        receiverEmail: data.package.receiverEmail || '',
        receiverPhone: data.package.receiverPhone || '',
        destinationAddress: data.package.destinationAddress || '',
        weight: data.package.weight || '',
        freight: data.package.freight || '',
        charges: data.package.charges?.toString() || '',
        description: data.package.description || '',
        expectedDeliveryDate: data.package.expectedDeliveryDate ? new Date(data.package.expectedDeliveryDate).toISOString().split('T')[0] : ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLocation || !status) {
      setError('Location and status are required');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await fetch('/api/package/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackingID: id,
          currentLocation,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update package');
      }

      await fetchPackage();
      setSuccess('Package status updated successfully');
      setNotes('');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update package');
    } finally {
      setSaving(false);
    }
  };

  const handlePackageUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const response = await fetch(`/api/package/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...packageForm,
          tracking: id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update package details');
      }

      await fetchPackage();
      setSuccess('Package details updated successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update package details');
    } finally {
      setSaving(false);
    }
  };

  const handlePackageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPackageForm(prev => ({ ...prev, [name]: value }));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'on hold': 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      'in transit': 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleDeleteHistory = async (id: string, index: number) => {
    if (index === 0) {
      setError('Cannot delete the current package status. Please update the status instead.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (!window.confirm('Are you sure you want to delete this history entry? This action cannot be undone.')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/history/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete history entry');
      }

      await fetchPackage();
      setSuccess('History entry deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete history entry');
    }
  };

  const handleDeletePackage = async () => {
    if (!window.confirm(`Are you sure you want to delete package ${id}? This action cannot be undone and will delete all associated history.`)) {
      return;
    }

    try {
      setDeleting(true);
      setError(null);
      const response = await fetch(`/api/package/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete package');
      }

      setSuccess('Package deleted successfully. Redirecting...');
      setTimeout(() => {
        router.push('/admin/packages'); 
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete package');
      setDeleting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            Package Details - {id}
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleDeletePackage}
            disabled={deleting}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            {deleting ? (
              <span className="inline-flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-r-transparent rounded-full" />
                Deleting...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Package
              </span>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="mt-8 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6">
          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Package Details Display */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Package Information</h2>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Tracking ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{packageData?.trackingID}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Status</dt>
                <dd className="mt-1 text-sm text-gray-900">{packageData?.status}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{packageData?.currentLocation}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Expected Delivery</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {packageData?.expectedDeliveryDate
                    ? new Date(packageData.expectedDeliveryDate).toLocaleDateString()
                    : 'Not specified'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Update Status Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Update Status</h2>
            <form onSubmit={handleStatusSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="currentLocation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Location
                </label>
                <input
                  type="text"
                  id="currentLocation"
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                >
                  <option value="">Select status</option>
                  <option value="order received">Order Received</option>
                  <option value="in transit">In Transit</option>
                  <option value="on hold">On Hold</option>
                  <option value="delivered">Delivered</option>
                  <option value="damaged">Damaged</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Add any additional notes about this update"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>

          {/* Update Package Details Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Update Package Details</h2>
            <form onSubmit={handlePackageUpdate} className="space-y-6">
              {/* Sender Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Sender Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                      Sender Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={packageForm.senderName}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                      Sender Email
                    </label>
                    <input
                      type="email"
                      id="senderEmail"
                      name="senderEmail"
                      value={packageForm.senderEmail}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700">
                      Sender Phone
                    </label>
                    <input
                      type="tel"
                      id="senderPhone"
                      name="senderPhone"
                      value={packageForm.senderPhone}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="originAddress" className="block text-sm font-medium text-gray-700">
                      Origin Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="originAddress"
                      name="originAddress"
                      value={packageForm.originAddress}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Receiver Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700">
                      Receiver Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      value={packageForm.receiverName}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverEmail" className="block text-sm font-medium text-gray-700">
                      Receiver Email
                    </label>
                    <input
                      type="email"
                      id="receiverEmail"
                      name="receiverEmail"
                      value={packageForm.receiverEmail}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverPhone" className="block text-sm font-medium text-gray-700">
                      Receiver Phone
                    </label>
                    <input
                      type="tel"
                      id="receiverPhone"
                      name="receiverPhone"
                      value={packageForm.receiverPhone}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="destinationAddress" className="block text-sm font-medium text-gray-700">
                      Destination Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="destinationAddress"
                      name="destinationAddress"
                      value={packageForm.destinationAddress}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Package Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={packageForm.weight}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="freight" className="block text-sm font-medium text-gray-700">
                      Freight Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="freight"
                      name="freight"
                      value={packageForm.freight}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                    >
                      <option value="">Select freight type</option>
                      <option value="air">Air</option>
                      <option value="land">Land</option>
                      <option value="sea">Sea</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="charges" className="block text-sm font-medium text-gray-700">
                      Charges <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        id="charges"
                        name="charges"
                        value={packageForm.charges}
                        onChange={handlePackageFormChange}
                        className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">
                      Expected Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="expectedDeliveryDate"
                      name="expectedDeliveryDate"
                      value={packageForm.expectedDeliveryDate}
                      onChange={handlePackageFormChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={packageForm.description}
                  onChange={handlePackageFormChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="Enter package description..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Updating...' : 'Update Package Details'}
                </button>
              </div>
            </form>
          </div>

          {/* Shipment History */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Shipment History</h2>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {shipmentHistory.map((event: any, idx) => (
                  <li key={event.createdAt.toString()}>
                    <div className="relative pb-8">
                      {idx !== shipmentHistory.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(
                              event.status
                            )}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                              {' at '}
                              <span className="font-medium text-gray-900">
                                {event.currentLocation}
                              </span>
                            </div>
                            {idx !== 0 && (
                              <button
                                onClick={() => handleDeleteHistory(event._id, idx)}
                                disabled={deleting === event._id}
                                className="ml-4 text-gray-400 hover:text-red-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Delete history entry"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete history entry</span>
                              </button>
                            )}
                          </div>
                          {event.notes && (
                            <p className="mt-0.5 text-sm text-gray-500">{event.notes}</p>
                          )}
                          <p className="mt-0.5 text-sm text-gray-500">
                            {new Date(event.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}