'use client';

import { useEffect } from 'react';
import { useSite } from '@/context/SiteContext';

interface PageTitleProps {
  title?: string;
  children?: React.ReactNode;
}

export default function PageTitle({ title, children }: PageTitleProps) {
  const { siteData } = useSite();
  
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${siteData.siteName}`;
    }
  }, [title, siteData.siteName]);

  return children || null;
}
