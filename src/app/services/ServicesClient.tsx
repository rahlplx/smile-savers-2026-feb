'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SERVICES } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { ChevronRight, Clock, Phone, Shield, Award } from 'lucide-react';
import { PRACTICE_INFO } from '@/lib/constants';

const serviceIcons: Record<string, string> = {
  'heart-pulse': '🦷',
  'sparkles': '✨',
  'pin': '🔧',
  'sun': '☀️',
  'alert-circle': '🚨',
  'align-center': '😁',
  'layout-template': '💎',
  'activity': '⚕️',
  'crown': '👑',
  'sparkle': '✨',
  'baby': '👶',
};

export default function ServicesClient() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Comprehensive Dental Care
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From routine cleanings to advanced cosmetic procedures, we offer a full range of dental services 
              to keep your smile healthy and beautiful. Our experienced team uses the latest technology to 
              provide comfortable, effective treatments.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-5 w-5 text-primary" />
                <span>Same-Day Appointments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-5 w-5 text-primary" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.filter(s => s.featured).map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <span className="text-3xl">{serviceIcons[service.icon] || '🦷'}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {language === 'es' ? service.shortDescEs : language === 'zh' ? service.shortDescZh : service.shortDesc}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {service.services.slice(0, 4).map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Learn More
                        <ChevronRight className="h-4 w-4 ml-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* All Services */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-all hover:border-primary/30">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="text-xl">{serviceIcons[service.icon] || '🦷'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                            {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {language === 'es' ? service.shortDescEs : language === 'zh' ? service.shortDescZh : service.shortDesc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Schedule your appointment today and let us help you achieve your healthiest smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Book Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call {PRACTICE_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
