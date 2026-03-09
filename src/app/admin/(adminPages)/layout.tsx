'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, Settings, Home, LogOut } from 'lucide-react';
import { SessionProvider, signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Packages', href: '/admin/packages', icon: Package },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <SessionProvider>
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 h-16 border-b">
            <Link href="/admin" className="text-xl font-semibold text-gray-800">
              Admin Panel
            </Link>
            <button
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-16 bg-white shadow-sm lg:hidden">
        <button
          className="p-4 text-gray-500 focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="p-4 font-semibold text-gray-900">Admin Panel</div>
        <div className="w-12" /> {/* Spacer for balance */}
      </div>

      {/* Main content */}
      <main
        className={`lg:pl-64 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        <div className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
    </SessionProvider>
  );
}
