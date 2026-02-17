import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';
import { PRACTICE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy | ${PRACTICE_INFO.name}`,
  description: 'Privacy policy and HIPAA notice for Smile Savers Creating Smiles dental practice in Woodside, NY.',
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
