import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { SEO_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.contact.title,
  description: SEO_DATA.contact.description,
  keywords: SEO_DATA.contact.keywords,
  openGraph: {
    title: SEO_DATA.contact.title,
    description: SEO_DATA.contact.description,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
