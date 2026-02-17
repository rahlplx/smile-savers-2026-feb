import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';
import { SERVICES, PRACTICE_INFO } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const title = `${service.name} | ${PRACTICE_INFO.name}`;
  const description = service.description.slice(0, 160) + '...';

  return {
    title,
    description,
    keywords: [
      service.name.toLowerCase(),
      `dentist ${PRACTICE_INFO.address.city.toLowerCase()}`,
      `dental ${service.name.toLowerCase()}`,
      PRACTICE_INFO.address.city.toLowerCase(),
      'queens dentist',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
    },
    alternates: {
      canonical: `${PRACTICE_INFO.website}/services/${service.id}`,
    },
  };
}

// Map service IDs to MedicalProcedure types
const getProcedureType = (serviceId: string): string => {
  const procedureTypes: Record<string, string> = {
    'general-dentistry': 'DentalProcedure',
    'cosmetic-dentistry': 'CosmeticDentalProcedure',
    'dental-implants': 'DentalImplantProcedure',
    'teeth-whitening': 'TeethWhiteningProcedure',
    'dental-veneers': 'DentalVeneerProcedure',
    'emergency-dentistry': 'EmergencyDentalProcedure',
    'invisalign': 'OrthodonticProcedure',
    'root-canal': 'RootCanalProcedure',
    'dental-crowns': 'DentalCrownProcedure',
    'teeth-cleaning': 'DentalCleaningProcedure',
    'pediatric-dentistry': 'PediatricDentalProcedure',
  };
  return procedureTypes[serviceId] || 'MedicalProcedure';
};

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  // Generate FAQ Schema with enhanced AEO properties
  const faqSchema = service.faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "answerCount": 1,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a,
      "upvoteCount": 1,
      "author": {
        "@type": "Organization",
        "name": PRACTICE_INFO.name,
      },
      "inLanguage": ["en", "es", "zh"],
    },
  }));

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": PRACTICE_INFO.website,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${PRACTICE_INFO.website}/services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": `${PRACTICE_INFO.website}/services/${service.id}`,
      },
    ],
  };

  // MedicalProcedure Schema for dental services
  const medicalProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": service.name,
    "description": service.description,
    "url": `${PRACTICE_INFO.website}/services/${service.id}`,
    "procedureType": getProcedureType(service.id),
    "howPerformed": service.services.join(', '),
    "preparation": "Dental examination and consultation required prior to procedure.",
    "followup": "Follow-up appointments may be scheduled as needed.",
    "status": "https://schema.org/ActiveNotRecruiting",
    "study": {
      "@type": "MedicalStudy",
      "status": "https://schema.org/ResultsAvailable",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${PRACTICE_INFO.website}/services/${service.id}`,
    },
    "provider": {
      "@type": "Dentist",
      "name": PRACTICE_INFO.name,
      "url": PRACTICE_INFO.website,
      "telephone": PRACTICE_INFO.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": PRACTICE_INFO.address.street,
        "addressLocality": PRACTICE_INFO.address.city,
        "addressRegion": PRACTICE_INFO.address.state,
        "postalCode": PRACTICE_INFO.address.zip,
        "addressCountry": "US",
      },
    },
    "instrument": service.services.map((s: string) => ({
      "@type": "MedicalDevice",
      "name": s,
    })),
  };

  // Enhanced Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${PRACTICE_INFO.website}/services/${service.id}`,
    "serviceType": service.name,
    "areaServed": {
      "@type": "City",
      "name": PRACTICE_INFO.address.city,
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name,
      "itemListElement": service.services.map((s: string, index: number) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s,
        },
        "position": index + 1,
      })),
    },
    "provider": {
      "@type": "Dentist",
      "name": PRACTICE_INFO.name,
      "url": PRACTICE_INFO.website,
      "telephone": PRACTICE_INFO.phone,
      "email": PRACTICE_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": PRACTICE_INFO.address.street,
        "addressLocality": PRACTICE_INFO.address.city,
        "addressRegion": PRACTICE_INFO.address.state,
        "postalCode": PRACTICE_INFO.address.zip,
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.75,
        "longitude": -73.9,
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  // SpeakableSpecification for voice search
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${service.name} - ${PRACTICE_INFO.name}`,
    "description": service.shortDesc,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".service-description", ".service-benefits", ".service-faq"],
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": `${PRACTICE_INFO.website}/services/${service.id}`,
    },
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* MedicalProcedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(medicalProcedureSchema),
        }}
      />
      
      {/* Enhanced Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      
      {/* FAQPage Schema */}
      {faqSchema.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqSchema,
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": [".service-faq"],
              },
            }),
          }}
        />
      )}
      
      {/* SpeakableSpecification Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
      
      <ServiceDetailClient service={service} />
    </>
  );
}
