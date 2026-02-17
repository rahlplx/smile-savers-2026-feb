import { Metadata } from 'next';
import FaqClient from './FaqClient';
import { SEO_DATA, FAQS, PRACTICE_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: SEO_DATA.faq.title,
  description: SEO_DATA.faq.description,
  keywords: SEO_DATA.faq.keywords,
  openGraph: {
    title: SEO_DATA.faq.title,
    description: SEO_DATA.faq.description,
  },
};

export default function FaqPage() {
  // Enhanced FAQPage schema with AEO optimizations
  const faqSchema = FAQS.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "answerCount": 1,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
      "upvoteCount": 1,
      "url": `${PRACTICE_INFO.website}/faq`,
      "author": {
        "@type": "Organization",
        "name": PRACTICE_INFO.name,
      },
      "dateCreated": new Date().toISOString(),
      "inLanguage": ["en", "es", "zh"],
    },
  }));

  // Speakable specification for voice search
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Frequently Asked Questions - Smile Savers",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".faq-question", ".faq-answer"],
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": `${PRACTICE_INFO.website}/faq`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSchema,
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": [".faq-item"],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
      <FaqClient />
    </>
  );
}
