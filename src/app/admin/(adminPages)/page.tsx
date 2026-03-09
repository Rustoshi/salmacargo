'use client';

import { useState, useEffect } from 'react';
import { Package, ChevronLeft, ChevronRight, Search, AlertCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IPackage } from '@/types/models';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/package`);
      if (!response.ok) throw new Error('Failed to fetch packages');
      const data = await response.json();
      setPackages(data.packages);
      setTotalPages(Math.ceil(data.packages.length / 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Filter packages based on search query
  const filteredPackages = packages.filter((pkg:IPackage) => 
    pkg.trackingID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.receiverName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate packages
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedPackages = filteredPackages.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      'in transit': 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mt-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-jakarta text-foreground">Package Management</h1>
        <p className="mt-1 text-foreground/60">Manage and track all packages in the system</p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-primary" />
          <div className="ml-4">
            <p className="text-sm font-medium text-foreground/60">Total Packages</p>
            <p className="text-2xl font-semibold text-foreground">{packages.length}</p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
              <input
                type="text"
                placeholder="Search by tracking number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-foreground bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-foreground/60"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Create package button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Packages</h1>
        <Link
          href="/admin/packages/create"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Package
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Tracking Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-foreground/60 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedPackages.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No packages found
                </td>
              </tr>
            ) : (
              paginatedPackages.map((pkg:IPackage) => (
                <tr key={pkg.trackingID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {pkg.trackingID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {pkg.destinationAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => router.push(`/admin/packages/${pkg.trackingID}`)}
                      className="text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-foreground/80 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-foreground/80 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-foreground/60">
                  Showing page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-foreground/80 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={loading}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === idx + 1
                          ? 'z-10 bg-primary border-primary text-white'
                          : 'border-gray-300 bg-white text-foreground/80 hover:bg-gray-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-foreground/80 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}