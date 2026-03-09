'use client';

import { useSite } from '@/context/SiteContext';
import { Cookie } from 'lucide-react';

const CookiesPage = () => {
  const siteData = useSite();
  const lastUpdated = 'March 7, 2025';

  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly.',
      examples: [
        'Session management',
        'Login information',
        'Security features',
        'Load balancing'
      ],
      canDisable: false
    },
    {
      title: 'Functional Cookies',
      description: 'These cookies enable personalized features and preferences.',
      examples: [
        'Language preferences',
        'Location settings',
        'User interface customization',
        'Form auto-fill data'
      ],
      canDisable: true
    },
    {
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      examples: [
        'Page visit statistics',
        'Traffic sources',
        'User behavior patterns',
        'Performance monitoring'
      ],
      canDisable: true
    },
    {
      title: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements.',
      examples: [
        'Ad personalization',
        'Campaign effectiveness tracking',
        'Interest-based advertising',
        'Conversion tracking'
      ],
      canDisable: true
    }
  ];

  const sections = [
    {
      title: 'What Are Cookies',
      content: [
        'Cookies are small text files stored on your device',
        'They help remember your preferences and improve your experience',
        'Cookies can be temporary (session) or permanent (persistent)',
        'Different types of cookies serve different purposes'
      ]
    },
    {
      title: 'How We Use Cookies',
      content: [
        'To provide essential website functionality',
        'To remember your preferences and settings',
        'To analyze and improve our services',
        'To provide personalized experiences',
        'To ensure website security'
      ]
    },
    {
      title: 'Managing Cookies',
      content: [
        'You can control cookies through your browser settings',
        'Essential cookies cannot be disabled',
        'Disabling certain cookies may limit functionality',
        'You can opt-out of non-essential cookies',
        'Cookie preferences can be updated at any time'
      ]
    },
    {
      title: 'Third-Party Cookies',
      content: [
        'Some cookies are placed by third-party services',
        'Third-party cookies follow their respective privacy policies',
        'We carefully select our third-party partners',
        'You can manage third-party cookies separately'
      ]
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Cookie className="w-16 h-16 text-white/90 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-white">
              Cookie Policy
            </h1>
            <p className="text-lg text-white/90">
              How we uses cookies to improve your experience
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-text-secondary">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto prose">
            <p className="text-text-secondary text-lg">
              This Cookie Policy explains how we use cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-text-primary">
              Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {type.title}
                      </h3>
                      <p className="text-text-secondary mt-1">
                        {type.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      type.canDisable 
                        ? 'bg-gray-100 text-text-secondary'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {type.canDisable ? 'Optional' : 'Required'}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
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
              Questions About Our Cookie Policy?
            </h2>
            <p className="text-text-secondary mb-6">
              If you have any questions about how we use cookies, please contact us at:
            </p>
            <a
              href={`mailto`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            >
              Contact Support Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CookiesPage;
