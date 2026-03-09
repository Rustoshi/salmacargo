'use client';

import ServiceCard from './ServiceCard';
import { Plane, Truck, Ship, Box, Zap, Package } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Comprehensive Shipping Solutions
          </h2>
          <p className="text-text-secondary text-lg">
            Experience excellence in logistics with our range of specialized shipping services designed to meet your needs.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Plane className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Air Freight</h3>
            <p className="text-text-secondary">Fast and reliable air shipping solutions worldwide</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Ship className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Ocean Freight</h3>
            <p className="text-text-secondary">Cost-effective sea shipping for larger cargo</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Truck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Ground Shipping</h3>
            <p className="text-text-secondary">Reliable door-to-door delivery services</p>
          </div>
        </div>

        {/* Service Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Standard Delivery"
            description="Reliable shipping solution for regular deliveries"
            icon={Box}
            features={[
              "3-5 business days delivery",
              "Real-time tracking",
              "Door-to-door delivery",
              "Basic insurance coverage",
              "Email notifications"
            ]}
          />
          <ServiceCard
            title="Express Shipping"
            description="Fast and guaranteed delivery for time-sensitive packages"
            icon={Zap}
            primary={true}
            features={[
              "1-2 business days delivery",
              "Priority handling",
              "Door-to-door delivery",
              "Extended insurance coverage",
              "SMS & Email notifications",
              "Signature confirmation"
            ]}
          />
          <ServiceCard
            title="International Service"
            description="Comprehensive shipping solution for global deliveries"
            icon={Package}
            features={[
              "Global shipping network",
              "Customs clearance assistance",
              "Door-to-door delivery",
              "Full insurance coverage",
              "Multi-language support",
              "International tracking"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
