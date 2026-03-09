'use client';

import { useSite } from '@/context/SiteContext';
import Image from 'next/image';
import { Award, Users, Globe2, Shield, Truck, Clock } from 'lucide-react';
import PageTitle from '@/components/layout/PageTitle';

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'We prioritize the safety and security of your shipments with advanced tracking and insurance coverage.'
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'Our commitment to punctuality ensures your packages reach their destination on schedule, every time.'
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'With our extensive network, we connect businesses and individuals across 150+ countries worldwide.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do, providing personalized solutions and support.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards of service quality and operational efficiency.'
  },
  {
    icon: Truck,
    title: 'Innovation',
    description: 'We leverage cutting-edge technology to optimize delivery routes and enhance customer experience.'
  }
];

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '150+', label: 'Countries Served' },
  { value: '1M+', label: 'Packages Delivered' },
  { value: '99%', label: 'Customer Satisfaction' }
];

export default function AboutPage() {
  const { siteData } = useSite();

  return (
    <PageTitle title="About Us">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/about-hero.jpg')] opacity-20 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                About {siteData.siteName}
              </h1>
              <p className="text-xl text-white/90">
                Your trusted partner in global logistics, delivering excellence and reliability since 2010.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Mission</h2>
                <p className="text-text-secondary text-lg mb-8">
                  At {siteData.siteName}, our mission is to revolutionize the logistics industry by providing innovative, reliable, and sustainable shipping solutions that connect businesses and individuals worldwide.
                </p>
                <p className="text-text-secondary text-lg">
                  We strive to be the most trusted name in global logistics, setting new standards for excellence, sustainability, and customer satisfaction.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/mission.jpg"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-text-primary">Our Values</h2>
              <p className="text-text-secondary text-lg">
                These core values guide our actions and decisions, ensuring we deliver the best possible service to our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-text-primary">{value.title}</h3>
                    <p className="text-text-secondary">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-primary">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Ship with Us?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Experience the difference of working with a logistics partner who puts your needs first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/track"
                className="px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-100 transition-colors font-medium"
              >
                Track a Package
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent text-white border border-white rounded-xl hover:bg-white/10 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageTitle>
  );
}
