'use client';

import { useSite } from '@/context/SiteContext';
import { Scale, AlertCircle } from 'lucide-react';
import PageTitle from '@/components/layout/PageTitle';

export default function TermsPage() {
  const { siteData } = useSite();
  const lastUpdated = 'March 8, 2025';

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using our services, you agree to these Terms of Service',
        'You must be at least 18 years old to use our services',
        'You agree to provide accurate and complete information',
        'We reserve the right to modify these terms at any time'
      ]
    },
    {
      title: 'Service Description',
      content: [
        'We provide domestic and international shipping services',
        'Service availability may vary by location',
        'Delivery times are estimates and not guaranteed',
        'We reserve the right to refuse service to anyone',
        'Additional services may be subject to separate terms'
      ]
    },
    {
      title: 'Shipping Restrictions',
      content: [
        'Prohibited items include dangerous goods, illegal substances, and hazardous materials',
        'Packages must comply with size and weight restrictions',
        'Proper packaging is required for all shipments',
        'International shipments must comply with customs regulations',
        'Sender is responsible for accurate declaration of contents'
      ]
    },
    {
      title: 'Pricing and Payment',
      content: [
        'Prices are subject to change without notice',
        'Payment is required before shipment processing',
        'Additional fees may apply for special handling',
        'Refunds are subject to our refund policy',
        'We accept major credit cards and approved payment methods'
      ]
    },
    {
      title: 'Liability and Insurance',
      content: [
        'Our liability is limited to declared value or applicable regulations',
        'Basic insurance is included in standard shipping',
        'Additional insurance is available for purchase',
        'Claims must be filed within 30 days of shipment',
        'We are not liable for indirect or consequential damages'
      ]
    },
    {
      title: 'Tracking and Delivery',
      content: [
        'Tracking numbers are provided for all shipments',
        'Delivery signatures may be required',
        'We are not responsible for delays beyond our control',
        'Address corrections may result in additional fees',
        'Special delivery instructions must be provided in advance'
      ]
    },
    {
      title: 'Account Management',
      content: [
        'You are responsible for maintaining account security',
        'Account sharing is not permitted',
        'We may suspend accounts for violations',
        'Business accounts require additional verification',
        'Account history is retained per legal requirements'
      ]
    },
    {
      title: 'Dispute Resolution',
      content: [
        'Disputes will be resolved through arbitration',
        'Governing law is the jurisdiction of our main office',
        'Small claims may be resolved in local courts',
        'Class action waiver applies',
        'Notice required before legal action'
      ]
    }
  ];

  return (
    <PageTitle title="Terms of Service">
      <main>
        {/* Hero Section */}
        <section className="bg-primary py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Scale className="w-16 h-16 text-white/90 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4 text-white">
                Terms of Service
              </h1>
              <p className="text-lg text-white/90">
                Please read these terms carefully before using {siteData.siteName} services
              </p>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-3xl mx-auto flex items-center gap-2 text-text-secondary">
              <AlertCircle className="w-4 h-4" />
              <p>Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto prose">
              <p className="text-text-secondary text-lg">
                These Terms of Service ("Terms") govern your use of services provided by {siteData.siteName} ("we," "our," or "us"). By using our services, you agree to be bound by these terms. If you disagree with any part of these terms, you may not use our services.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-text-primary">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                Questions About Our Terms?
              </h2>
              <p className="text-text-secondary mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${siteData.email}`}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Contact Legal Team
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors"
                >
                  General Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTitle>
  );
}
