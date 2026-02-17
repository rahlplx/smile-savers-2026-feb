import { Metadata } from 'next';
import NewPatientsClient from './NewPatientsClient';
import { SEO_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.newPatients.title,
  description: SEO_DATA.newPatients.description,
  keywords: SEO_DATA.newPatients.keywords,
  openGraph: {
    title: SEO_DATA.newPatients.title,
    description: SEO_DATA.newPatients.description,
  },
};

export default function NewPatientsPage() {
  return <NewPatientsClient />;
}
