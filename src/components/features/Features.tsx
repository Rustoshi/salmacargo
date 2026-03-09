'use client';

import Image from 'next/image';
import FeatureCard from './FeatureCard';
import { Truck, Package, Globe, Clock, Shield, Headphones } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Why Choose Our Courier Service?
          </h2>
          <p className="text-text-secondary text-lg">
            Experience seamless shipping with our comprehensive logistics solutions designed to meet all your delivery needs.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Global Shipping Network"
            description="Access our extensive network covering 150+ countries for reliable worldwide delivery services."
            icon={Globe}
          />
          <FeatureCard
            title="Real-Time Tracking"
            description="Track your shipments 24/7 with our advanced tracking system providing live updates."
            icon={Package}
          />
          <FeatureCard
            title="Express Delivery"
            description="Get your packages delivered faster with our priority shipping options."
            icon={Truck}
          />
          <FeatureCard
            title="24/7 Support"
            description="Our dedicated customer service team is available round the clock to assist you."
            icon={Headphones}
          />
          <FeatureCard
            title="Secure Handling"
            description="Your packages are handled with utmost care and security throughout the journey."
            icon={Shield}
          />
          <FeatureCard
            title="Time-Definite Services"
            description="Choose from our range of time-definite delivery options to suit your schedule."
            icon={Clock}
          />
        </div>

        {/* Feature Highlight */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 shadow-lg">
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src="/delivery-network.jpg"
              alt="Global Delivery Network"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
              Advanced Logistics Network
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Global Coverage</h4>
                  <p className="text-text-secondary">Extensive network spanning across continents</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Smart Routing</h4>
                  <p className="text-text-secondary">Optimized delivery paths for faster shipping</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Package Protection</h4>
                  <p className="text-text-secondary">Advanced handling systems for secure transit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
