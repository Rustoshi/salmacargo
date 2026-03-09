'use client';

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className = '' }: FeatureCardProps) => {
  return (
    <div className={`group p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;
