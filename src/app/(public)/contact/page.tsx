'use client';

import { useSite } from '@/context/SiteContext';
import { Mail, Phone, MapPin, Clock, Globe2, ArrowUpRight } from 'lucide-react';
import PageTitle from '@/components/layout/PageTitle';

export default function ContactPage() {
  const { siteData } = useSite();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: siteData.email,
      link: `mailto:${siteData.email}`,
      description: 'For general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: siteData.phone,
      link: siteData.phone ? `tel:${siteData.phone}` : undefined,
      description: '24/7 customer support available'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: siteData.address,
      description: 'Our main office location'
    }
  ];

  const additionalInfo = [
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed'
      ]
    },
    {
      icon: Globe2,
      title: 'Service Areas',
      details: [
        'Domestic Shipping: All States',
        'International: 150+ Countries',
        'Express Delivery Available'
      ]
    }
  ];

  return (
    <PageTitle title="Contact Us">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/contact-hero.jpg')] opacity-20 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Contact Us
              </h1>
              <p className="text-xl text-white/90">
                Get in touch with our team. We're here to help with all your shipping needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-text-primary">
                      {info.title}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {info.description}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                      >
                        {info.value}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="text-text-primary">{info.value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {additionalInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary">
                        {info.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {info.details.map((detail, idx) => (
                        <li key={idx} className="text-text-secondary">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[400px] relative bg-gray-100">
          <div className="absolute inset-0 bg-[url('/map.jpg')] bg-cover bg-center opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteData.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-50 transition-colors shadow-lg font-medium"
            >
              <MapPin className="w-5 h-5" />
              View on Google Maps
            </a>
          </div>
        </section>
      </main>
    </PageTitle>
  );
}
