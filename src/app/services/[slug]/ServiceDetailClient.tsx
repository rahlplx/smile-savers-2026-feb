'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PRACTICE_INFO, SERVICES } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { 
  Phone, Calendar, ChevronRight, CheckCircle, Clock, Shield, 
  Award, Heart, ArrowLeft, Star
} from 'lucide-react';

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

interface ServiceDetailClientProps {
  service: typeof SERVICES[number];
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { language } = useLanguage();
  
  const relatedServices = SERVICES.filter(s => s.id !== service.id && s.featured).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/services" className="hover:text-primary">Services</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {service.featured ? 'Featured Service' : 'Dental Service'}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'es' ? service.shortDescEs : language === 'zh' ? service.shortDescZh : service.shortDesc}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Same-Day Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Gentle Care</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-primary/10 flex items-center justify-center">
                <span className="text-7xl sm:text-8xl">{serviceIcons[service.icon] || '🦷'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About This Service */}
              <div className="service-description">
                <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Services Included */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Services We Offer</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.services.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="service-benefits">
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <Card key={i} className="border-primary/20">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div className="service-faq">
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick CTA Card */}
              <Card className="bg-primary text-primary-foreground sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Schedule your {service.name.toLowerCase()} appointment today.
                  </p>
                  <Button className="w-full bg-white text-primary hover:bg-white/90 mb-3" asChild>
                    <Link href="/contact">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 hover:bg-white/10" asChild>
                    <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {PRACTICE_INFO.phone}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Why Choose Us</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-sm">15+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="text-sm">Gentle, Caring Team</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-sm">Same-Day Emergency</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {relatedServices.map((related) => (
                      <Link
                        key={related.id}
                        href={`/services/${related.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="text-xl">{serviceIcons[related.icon] || '🦷'}</span>
                        <span className="text-sm font-medium">
                          {language === 'es' ? related.nameEs : language === 'zh' ? related.nameZh : related.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
