'use client';

import PageTitle from '@/components/layout/PageTitle';
import { Plane, Ship, Truck, Package, Clock, Shield } from 'lucide-react';


const services = [
  {
    icon: Plane,
    name: 'Air Freight',
    description: 'Fast and reliable air freight services for time-sensitive deliveries worldwide.',
    features: [
      'Express delivery options',
      'Global coverage',
      'Real-time tracking',
      'Door-to-door service'
    ]
  },
  {
    icon: Ship,
    name: 'Sea Freight',
    description: 'Cost-effective sea freight solutions for large shipments and international trade.',
    features: [
      'Container shipping',
      'Bulk cargo handling',
      'Custom clearance',
      'Port-to-port service'
    ]
  },
  {
    icon: Truck,
    name: 'Land Transport',
    description: 'Efficient ground transportation services for domestic and cross-border deliveries.',
    features: [
      'Full truckload services',
      'Less than truckload options',
      'Interstate delivery',
      'Last-mile delivery'
    ]
  }
];

const features = [
  {
    icon: Package,
    title: 'Package Protection',
    description: 'All shipments are fully insured and handled with utmost care to ensure safe delivery.'
  },
  {
    icon: Clock,
    title: 'Time-Definite Delivery',
    description: 'Guaranteed delivery times with our express shipping options.'
  },
  {
    icon: Shield,
    title: 'Secure Handling',
    description: 'Advanced security measures and tracking systems to protect your shipments.'
  }
];

export default function ServicesPage() {
  return (
    <PageTitle title="Our Services">
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/services-hero.jpg')] opacity-20 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Services
              </h1>
              <p className="text-xl text-white/90">
                Comprehensive shipping solutions tailored to your needs. Fast, reliable, and secure delivery worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">
                      {service.name}
                    </h3>
                    <p className="text-text-secondary mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-text-secondary">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-text-primary">
                Why Choose Our Services?
              </h2>
              <p className="text-lg text-text-secondary">
                We provide comprehensive logistics solutions with a focus on reliability, security, and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-text-primary">
                Ready to Ship?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Get started with our shipping services today. We're here to help you with all your logistics needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/track"
                  className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Track a Package
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 bg-white text-primary border border-primary rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTitle>
  );
}
