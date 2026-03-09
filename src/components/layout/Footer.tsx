'use client';

import { useSite } from '@/context/SiteContext';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const site = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{site.siteData.siteName}</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {site.siteData.address}
              </p>
              {site.siteData.phone && (
                <p className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${site.siteData.phone}`} className="hover:text-primary transition-colors">
                    {site.siteData.phone}
                  </a>
                </p>
              )}
              <p className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${site.siteData.email}`} className="hover:text-primary transition-colors">
                  {site.siteData.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track" className="text-gray-600 hover:text-primary transition-colors">
                  Track Package
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            &copy; {currentYear} {site.siteData.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
