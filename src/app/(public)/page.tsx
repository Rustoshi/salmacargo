import TrackingForm from '@/components/tracking/TrackingForm';
import Features from '@/components/features/Features';
import Services from '@/components/services/Services';
import Faq from '@/components/faq/Faq';
import TrustedBrands from '@/components/brands/TrustedBrands';
import Contact from '@/components/contact/Contact';
import { useSite } from '@/context/SiteContext';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="text-text-primary">
      <div className="relative min-h-[85vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Logistics Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Fast & Reliable Worldwide Shipping Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Track your shipment in real-time and experience seamless delivery services across the globe. Your trusted partner in logistics excellence.
            </p>

            {/* Tracking Form */}
            <TrackingForm className="mb-8" />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold mb-1 text-primary">150+</div>
                <div className="text-sm text-text-primary">Countries Served</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold mb-1 text-primary">24/7</div>
                <div className="text-sm text-text-primary">Support Available</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold mb-1 text-primary">99%</div>
                <div className="text-sm text-text-primary">On-Time Delivery</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-bold mb-1 text-primary">1M+</div>
                <div className="text-sm text-text-primary">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* Features Section */}
      <Features />

      {/* Services Section */}
      <Services />

      {/* Trusted Brands */}
      <TrustedBrands />

      {/* FAQ Section */}
      <Faq />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
