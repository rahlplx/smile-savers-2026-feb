import { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { SERVICES, SEO_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.services.title,
  description: SEO_DATA.services.description,
  keywords: SEO_DATA.services.keywords,
  openGraph: {
    title: SEO_DATA.services.title,
    description: SEO_DATA.services.description,
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
