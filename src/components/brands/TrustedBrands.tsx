'use client';

import Image from 'next/image';

const brands = [
  {
    name: 'FedEx',
    logo: 'https://www.fedex.com/content/dam/fedex-com/logos/FedEx-Logo.png',
    url: 'https://www.fedex.com'
  },
  {
    name: 'DHL',
    logo: 'https://www.dhl.com/content/dam/dhl/global/core/images/logos/dhl-logo.svg',
    url: 'https://www.dhl.com'
  },
  {
    name: 'UPS',
    logo: 'https://www.ups.com/assets/resources/images/UPS_logo.svg',
    url: 'https://www.ups.com'
  }
];

const TrustedBrands = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">
            Trusted by Leading Brands
          </h2>
          <p className="text-text-secondary">
            We partner with the world's most reliable shipping companies
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center justify-items-center max-w-4xl mx-auto">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[180px] h-20 relative grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
