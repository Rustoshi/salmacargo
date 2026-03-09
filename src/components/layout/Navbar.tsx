'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const site = useSite();

  // Inject Google Translate script on mount
  useEffect(() => {
    const existingScript = document.getElementById('google_translate_script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google_translate_script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
    // Define the initialization function
    (window as any).googleTranslateElementInit = () => {
      if (document.getElementById('google_translate_element')) return;
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      document.body.appendChild(div);
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };
  }, []);

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      window.location.href = `/tracking/${trackingNumber}`;
    }
  };

  return (
    <nav className="w-full bg-background">
      {/* Top Header */}
      <div className="hidden md:block bg-primary/5">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a
                href={`mailto:${site.siteData.email}`}
                className="flex items-center text-text-primary hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {site.siteData.email}
              </a>
              <a
                href={`tel:${site.siteData.phone}`}
                className="flex items-center text-text-primary hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                {site.siteData.phone}
              </a>
              <div className="flex items-center text-text-primary">
                <MapPin className="h-4 w-4 mr-2" />
                {site.siteData.address}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Google Translate Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none bg-white text-text-primary pr-8 pl-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => {
                    const lang = e.target.value;
                    // Get the Google Translate widget container
                    const element = document.getElementById('google_translate_element');
                    if (element) {
                      // Find the select within the widget
                      const selects = element.getElementsByTagName('select');
                      if (selects.length > 0) {
                        const gtSelect = selects[0];
                        gtSelect.value = lang;
                        const event = new Event('change', { bubbles: true });
                        gtSelect.dispatchEvent(event);
                      } else {
                        // Wait for the widget to initialize if the select isn't there yet
                        const waitForGoogle = setInterval(() => {
                          const newSelects = element.getElementsByTagName('select');
                          if (newSelects.length > 0) {
                            clearInterval(waitForGoogle);
                            const gtSelect = newSelects[0];
                            gtSelect.value = lang;
                            const event = new Event('change', { bubbles: true });
                            gtSelect.dispatchEvent(event);
                          }
                        }, 100);
                        setTimeout(() => clearInterval(waitForGoogle), 5000);
                      }
                    }
                  }}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-primary" />
              </div>
              <button
                onClick={() => setIsTrackingOpen(!isTrackingOpen)}
                className="bg-primary text-white px-4 py-1 rounded-md hover:bg-primary-light transition-colors"
              >
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              alt={site.siteData.siteName}
              width={512}
              height={512}
              style={{ width: 150 }}
              src="/logo2.png"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-text-primary hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-text-primary hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-text-primary hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-text-primary hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-text-primary hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-text-primary hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/faq" className="text-text-primary hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-text-primary hover:text-primary transition-colors">
                Contact
              </Link>
              <div className="pt-4 border-t space-y-2">
                <a
                  href={`mailto:${site.siteData.email}`}
                  className="flex items-center text-text-primary hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {site.siteData.email}
                </a>
                <a
                  href={`tel:${site.siteData.phone}`}
                  className="flex items-center text-text-primary hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {site.siteData.phone}
                </a>
                <div className="flex items-center text-text-primary">
                  <MapPin className="h-4 w-4 mr-2" />
                  {site.siteData.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tracking Modal */}
      {isTrackingOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Track Your Shipment</h2>
              <button onClick={() => setIsTrackingOpen(false)} className="text-text-primary">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleTracking}>
              <input
                type="text"
                placeholder="Enter tracking number"
                className="w-full p-2 border rounded-md mb-4 text-text-primary placeholder:text-text-secondary/70"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-light transition-colors font-medium"
              >
                Track
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
