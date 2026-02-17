import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { SEO_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.about.title,
  description: SEO_DATA.about.description,
  keywords: SEO_DATA.about.keywords,
  openGraph: {
    title: SEO_DATA.about.title,
    description: SEO_DATA.about.description,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
