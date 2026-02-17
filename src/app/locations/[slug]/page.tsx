import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MapPin, Clock, Star, ChevronRight, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRACTICE_INFO, SERVICE_AREAS, SERVICES } from '@/lib/constants';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all locations
export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({
    slug: area.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = SERVICE_AREAS.find(
    (a) => a.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  if (!area) return { title: 'Location Not Found' };
  
  return {
    title: `Dentist in ${area.name}, NY ${area.zip} | Smile Savers Creating Smiles`,
    description: `Smile Savers Creating Smiles provides dental care to ${area.name}, NY ${area.zip}. Services include dental implants, Invisalign, teeth whitening, emergency dentistry. Se habla español. Call (718) 956-8400.`,
    keywords: [`dentist ${area.name.toLowerCase()}`, `dental clinic ${area.name}`, `dentist ${area.zip}`, `emergency dentist ${area.name}`, `invisalign ${area.name}`],
    openGraph: {
      title: `Dentist in ${area.name}, NY | Smile Savers`,
      description: `Quality dental care near ${area.name}, NY. Accepting new patients. Se habla español.`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find(
    (a) => a.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
  
  if (!area) notFound();
  
  const featuredServices = SERVICES.filter(s => s.featured);
  const distanceText = area.distance === 0 ? 'Our Location' : `${area.distance} miles from our office`;
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            Serving {area.name}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Dentist in {area.name}, NY {area.zip}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
            Smile Savers Creating Smiles provides exceptional dental care to families in {area.name}, Queens. 
            We accept most insurance plans including Medicaid. Se habla español. 讲中文.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{distanceText}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-5 w-5 text-primary" />
              <span>15+ Years Experience</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/contact">
                Book Appointment
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-5 w-5 mr-2" />
                Call {PRACTICE_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services for This Location */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Dental Services Near {area.name}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {service.shortDesc}
                    </p>
                    <span className="inline-flex items-center text-primary text-sm font-medium">
                      Learn More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Location Info */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Why Choose Smile Savers for {area.name}?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Accepting Medicaid and most major insurance plans</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Spanish, Chinese, and English speaking team</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Same-day emergency appointments available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>4.9-star rating from 200+ happy patients</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Location</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="font-semibold mb-2">Smile Savers Creating Smiles</p>
                  <p className="text-muted-foreground mb-2">
                    {PRACTICE_INFO.address.street}<br />
                    {PRACTICE_INFO.address.city}, {PRACTICE_INFO.address.state} {PRACTICE_INFO.address.zip}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Approximately {area.distance === 0 ? 'located here' : `${area.distance} miles from ${area.name}`}
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={PRACTICE_INFO.mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Serving {area.name} and all of Queens with quality dental care.
          </p>
          <Button size="lg" variant="secondary" className="text-base px-8" asChild>
            <Link href="/contact">Book Your Appointment</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
