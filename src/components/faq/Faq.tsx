'use client';

import { useState } from 'react';
import { useSite } from '@/context/SiteContext';
import FaqItem from './FaqItem';

const faqData = [
  {
    question: "How can I track my shipment?",
    answer: "You can easily track your shipment by entering your tracking number in the tracking form on our homepage or navigation bar. Our real-time tracking system will provide you with detailed updates about your package's location and estimated delivery time."
  },
  {
    question: "What are your delivery timeframes?",
    answer: "Our delivery timeframes vary based on the service you choose. Standard delivery typically takes 3-5 business days, Express shipping delivers within 1-2 business days, and International shipping times vary by destination. Specific delivery estimates are provided at the time of booking."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer comprehensive international shipping services to over 150 countries worldwide. Our international service includes customs clearance assistance, door-to-door delivery, and full tracking capabilities. We ensure your packages are handled with care throughout their international journey."
  },
  {
    question: "What items are prohibited for shipping?",
    answer: "Prohibited items include dangerous goods, hazardous materials, illegal substances, and certain perishables. For a complete list of restricted items, please contact our customer service or refer to our shipping guidelines. We prioritize safety and compliance with international shipping regulations."
  },
  {
    question: "How do I prepare my package for shipping?",
    answer: "To prepare your package: 1) Use a sturdy box appropriate for the item's size and weight, 2) Wrap items securely with appropriate padding material, 3) Seal all openings with packing tape, 4) Attach shipping label clearly on the top surface, 5) Remove any old labels or markings from the box."
  },
  {
    question: "What insurance coverage do you provide?",
    answer: "We offer various levels of insurance coverage depending on your chosen service. Basic coverage is included with standard shipping, while premium services include extended coverage. Additional insurance can be purchased for high-value items. All claims must be filed within 30 days of shipment."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const siteData = useSite();

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Customer Support Request');
    const body = encodeURIComponent('Hello, I need assistance with the following:\n\n');
    window.location.href = `mailto:${siteData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary text-lg">
            Find answers to common questions about our shipping services and processes.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <p className="text-text-secondary text-lg mb-6">
            Still have questions? We're here to help!
          </p>
          <button 
            onClick={handleContactSupport}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors font-medium"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
