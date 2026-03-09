'use client';

import { useState, useEffect } from 'react';
import { Save, Lock } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface SiteSettings {
  siteName: string;
  address: string;
  phone: string;
  email: string;
}

interface PasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export default function Settings() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    address: '',
    phone: '',
    email: ''
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/site');
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data.site || {
        siteName: '',
        address: '',
        phone: '',
        email: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!settings.siteName.trim()) errors.push('Site name is required');
    if (!settings.address.trim()) errors.push('Address is required');
    if (!settings.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      errors.push('Please enter a valid email address');
    }
    return errors;
  };

  const validatePasswordForm = () => {
    const errors: string[] = [];
    if (!passwordForm.newPassword) {
      errors.push('New password is required');
    } else if (passwordForm.newPassword.length < 6) {
      errors.push('New password must be at least 6 characters');
    }
    if (!passwordForm.confirmPassword) {
      errors.push('Please confirm your new password');
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.push('Passwords do not match');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const response = await fetch('/api/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save settings');
      }

      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validatePasswordForm();
    if (errors.length > 0) {
      setPasswordError(errors.join(', '));
      return;
    }

    try {
      setChangingPassword(true);
      setPasswordError(null);

      const response = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          password: passwordForm.newPassword
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to change password');
      }

      setPasswordSuccess('Password changed successfully');
      setPasswordForm({
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Site Settings Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Site Settings</h3>
            <p className="mt-2 text-sm text-gray-500">
              Update your site information and contact details.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter site name"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter phone number (optional)"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter email address"
              />
            </div>

            <div className="flex justify-end pt-5">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="inline-flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-r-transparent rounded-full" />
                    Saving...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Password Change Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="pb-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
            <p className="mt-2 text-sm text-gray-500">
              Update your account password. Please make sure it's secure.
            </p>
          </div>

          {passwordError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{passwordError}</p>
            </div>
          )}

          {passwordSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{passwordSuccess}</p>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="mt-6 space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <p className="mt-1 text-sm text-gray-500">Must be at least 6 characters long</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
            </div>

            <div className="flex justify-end pt-5">
              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {changingPassword ? (
                  <span className="inline-flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-r-transparent rounded-full" />
                    Changing Password...
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
