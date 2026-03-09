'use client';

import { useSite } from '@/context/SiteContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const site = useSite();

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Get in Touch
          </h2>
          <p className="text-text-secondary text-lg">
            Have questions? Our team is here to help. Contact us through any of the following channels.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Email Us</h3>
            <a 
              href={`mailto:${site.siteData.email}`}
              className="text-primary hover:text-primary-light transition-colors"
            >
              {site.siteData.email}
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Call Us</h3>
            <a 
              href={`tel:${site.siteData.phone}`}
              className="text-primary hover:text-primary-light transition-colors"
            >
              {site.siteData.phone}
            </a>
          </div>

          {/* Address */}
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Visit Us</h3>
            <p className="text-text-secondary">
              {site.siteData.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
