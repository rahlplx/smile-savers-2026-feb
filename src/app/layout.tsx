import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header, Footer, MobileBottomNav, AccessibilityFAB } from "@/components/dental";
import { LanguageProvider } from "@/lib/i18n";
import { PRACTICE_INFO, SEO_DATA } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PRACTICE_INFO.website),
  title: {
    default: SEO_DATA.home.title,
    template: `%s | ${PRACTICE_INFO.name}`,
  },
  description: SEO_DATA.home.description,
  keywords: SEO_DATA.home.keywords,
  authors: [{ name: PRACTICE_INFO.name }],
  publisher: PRACTICE_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US", "zh_CN"],
    url: PRACTICE_INFO.website,
    siteName: PRACTICE_INFO.name,
    title: SEO_DATA.home.title,
    description: SEO_DATA.home.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: PRACTICE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DATA.home.title,
    description: SEO_DATA.home.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0d9488" />
        {/* Enhanced LocalBusiness/Dentist Schema with MedicalOrganization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Dentist",
                  "@id": `${PRACTICE_INFO.website}/#organization`,
                  "name": PRACTICE_INFO.name,
                  "description": "Family and cosmetic dentistry serving Woodside, Queens for over 15 years. Specializing in dental implants, Invisalign, emergency care, and preventive dentistry. Se habla español. 讲中文.",
                  "url": PRACTICE_INFO.website,
                  "telephone": PRACTICE_INFO.phone,
                  "email": PRACTICE_INFO.email,
                  "foundingDate": "2009",
                  "priceRange": "$$",
                  "image": `${PRACTICE_INFO.website}/images/og-image.jpg`,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": PRACTICE_INFO.address.street,
                    "addressLocality": PRACTICE_INFO.address.city,
                    "addressRegion": PRACTICE_INFO.address.state,
                    "postalCode": PRACTICE_INFO.address.zip,
                    "addressCountry": "US"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.7470,
                    "longitude": -73.9065
                  },
                  "openingHoursSpecification": [
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday"], "opens": "10:00", "closes": "17:00" },
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "10:00", "closes": "18:00" },
                    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "13:00" }
                  ],
                  "areaServed": ["Woodside", "Sunnyside", "Jackson Heights", "Elmhurst", "Corona", "Astoria", "Long Island City", "Maspeth"],
                  "medicalSpecialty": ["Dentistry", "Cosmetic Dentistry", "Implant Dentistry", "Orthodontics"],
                  "availableLanguage": ["English", "Spanish", "Chinese"],
                  "healthPlanNetworkId": ["Delta Dental", "Cigna", "Aetna", "MetLife", "Medicaid"],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "200",
                    "bestRating": "5"
                  },
                  "sameAs": [
                    PRACTICE_INFO.social.facebook,
                    PRACTICE_INFO.social.instagram
                  ]
                },
                {
                  "@type": "MedicalOrganization",
                  "@id": `${PRACTICE_INFO.website}/#medicalorg`,
                  "name": PRACTICE_INFO.name,
                  "medicalSpecialty": "Dentistry"
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${PRACTICE_INFO.website}/#localbusiness`,
                  "name": PRACTICE_INFO.name,
                  "branchOf": { "@id": `${PRACTICE_INFO.website}/#organization` }
                }
              ],
            }),
          }}
        />
        {/* Organization Schema for Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${PRACTICE_INFO.website}/#organization`,
              "name": PRACTICE_INFO.name,
              "alternateName": PRACTICE_INFO.shortName,
              "url": PRACTICE_INFO.website,
              "logo": `${PRACTICE_INFO.website}/images/logo.png`,
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": PRACTICE_INFO.phone,
                  "contactType": "customer service",
                  "availableLanguage": ["English", "Spanish", "Chinese"],
                  "areaServed": "US",
                },
                {
                  "@type": "ContactPoint",
                  "telephone": PRACTICE_INFO.phone,
                  "contactType": "reservations",
                  "availableLanguage": ["English", "Spanish", "Chinese"],
                },
                {
                  "@type": "ContactPoint",
                  "telephone": PRACTICE_INFO.phone,
                  "contactType": "emergency",
                  "availableLanguage": ["English", "Spanish", "Chinese"],
                },
              ],
              "sameAs": [
                PRACTICE_INFO.social.facebook,
                PRACTICE_INFO.social.instagram,
                PRACTICE_INFO.social.google,
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16 md:pt-28 pb-20 lg:pb-0">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
            <AccessibilityFAB />
          </div>
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
