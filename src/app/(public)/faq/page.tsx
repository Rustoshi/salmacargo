"use client"

import PageTitle from '@/components/layout/PageTitle';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';



interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How can I track my package?',
    answer: 'You can track your package by entering your tracking number on our homepage or track page. Our real-time tracking system will show you the current status and location of your shipment.'
  },
  {
    question: 'What shipping methods do you offer?',
    answer: 'We offer various shipping methods including air freight, sea freight, and land transportation. The available options depend on your origin and destination locations.'
  },
  {
    question: 'How do I get a tracking number?',
    answer: 'A tracking number is automatically generated and provided to you once your package is registered in our system. You will receive it via email and/or SMS.'
  },
  {
    question: 'What should I do if my package is delayed?',
    answer: 'If your package is delayed, you can check its status using the tracking number. For further assistance, please contact our customer support team with your tracking number ready.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping services to most countries worldwide. Shipping rates and delivery times vary by destination.'
  },
  {
    question: 'How are shipping costs calculated?',
    answer: 'Shipping costs are calculated based on various factors including weight, dimensions, shipping method, origin, and destination. You can get a quote by contacting our team.'
  },
  {
    question: 'What items are prohibited for shipping?',
    answer: 'Prohibited items include dangerous goods, illegal substances, perishables without proper packaging, and certain valuables. Please contact us for a detailed list.'
  },
  {
    question: 'How do I package my items properly?',
    answer: 'Use appropriate packaging materials, ensure items are properly cushioned, seal all openings securely, and label the package clearly. We recommend double-boxing fragile items.'
  }
];

function FaqAccordion({ question, answer }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <PageTitle title="FAQ">
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FaqAccordion key={index} {...faq} />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Can't find what you're looking for?{' '}
              <a href="/contact" className="text-primary hover:text-primary-dark font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageTitle>
  );
}
