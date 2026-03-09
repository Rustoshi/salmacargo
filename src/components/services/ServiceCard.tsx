'use client';

import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  primary?: boolean;
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  features,
  primary = false,
  className = '',
}: ServiceCardProps) => {
  return (
    <div
      className={`relative p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-xl ${
        primary ? 'border-primary shadow-lg' : 'border-gray-100'
      } ${className}`}
    >
      {primary && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
          Featured Service
        </div>
      )}
      
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-text-secondary">
            <svg className="w-4 h-4 mr-3 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
