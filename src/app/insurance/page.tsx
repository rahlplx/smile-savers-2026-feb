import { Metadata } from 'next';
import InsuranceClient from './InsuranceClient';
import { SEO_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.insurance.title,
  description: SEO_DATA.insurance.description,
  keywords: SEO_DATA.insurance.keywords,
  openGraph: {
    title: SEO_DATA.insurance.title,
    description: SEO_DATA.insurance.description,
  },
};

export default function InsurancePage() {
  return <InsuranceClient />;
}
