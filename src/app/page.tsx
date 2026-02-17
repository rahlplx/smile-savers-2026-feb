'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, Calendar, Clock, Shield, Award, Heart, Star, ChevronRight,
  AlertCircle, CheckCircle, Users, Sparkles, CreditCard, MapPin, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookingCard, BookingBanner } from '@/components/dental';
import { HeroBackground, FloatingOrbs, GradientMesh } from '@/components/ui/backgrounds';
import { PRACTICE_INFO, SERVICES, TESTIMONIALS, SERVICE_AREAS, INSURANCE_PLANS } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Icon mapping for services
const serviceIcons: Record<string, string> = {
  'heart-pulse': '🦷',
  'sparkles': '✨',
  'pin': '🔧',
  'sun': '☀️',
  'alert-circle': '🚨',
  'align-center': '😁',
};

// Skeleton Card Component for loading states
function ServiceCardSkeleton() {
  return (
    <Card className="h-full border-border/50 bg-white">
      <CardContent className="p-6">
        <Skeleton className="w-14 h-14 rounded-xl mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

// Mobile Sticky CTA Component
function MobileStickyCTA({ isVisible }: { isVisible: boolean }) {
  const { language } = useLanguage();
  
  return (
    <div
      className={cn(
        'fixed bottom-16 left-0 right-0 z-40 lg:hidden',
        'bg-white/95 backdrop-blur-md border-t border-border shadow-lg',
        'transform transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
        <Button 
          size="lg" 
          className="flex-1 h-12 text-base min-h-[48px]" 
          asChild
        >
          <Link href="/contact">
            <Calendar className="h-5 w-5 mr-2" />
            {language === 'es' ? 'Agendar' : language === 'zh' ? '预约' : 'Book Now'}
          </Link>
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="flex-1 h-12 text-base min-h-[48px]" 
          asChild
        >
          <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
            <Phone className="h-5 w-5 mr-2" />
            {language === 'es' ? 'Llamar' : language === 'zh' ? '电话' : 'Call'}
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const featuredServices = SERVICES.filter(s => s.featured);
  
  // Loading state for skeleton
  const [isLoading, setIsLoading] = useState(true);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6; // 60vh
      setShowStickyCTA(window.scrollY > heroHeight);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Mobile Sticky CTA - Shows after scrolling past hero */}
      <MobileStickyCTA isVisible={showStickyCTA} />
      
      {/* Hero Section - Reduced height on mobile for better above-fold content */}
      <section id="main-content" className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <HeroBackground />
        
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <Badge variant="secondary" className="mb-3 px-4 py-2 text-sm min-h-[44px] inline-flex items-center">
                <CheckCircle className="h-4 w-4 mr-1.5 text-primary" />
                {t('hero.badge')}
              </Badge>
              
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-3 md:mb-6">
                {t('hero.title')}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>
              
              {/* Google Rating Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 p-3 bg-white rounded-xl shadow-sm border border-border/50 w-fit mx-auto lg:mx-0 min-h-[56px]">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">4.9 Rating</p>
                  <p className="text-xs text-muted-foreground">Based on 200+ Google Reviews</p>
                </div>
              </div>
              
              {/* Insurance Acceptance Badges - Touch-friendly */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-4 py-2 text-sm min-h-[44px] inline-flex items-center">
                  Medicare Accepted
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 text-sm min-h-[44px] inline-flex items-center">
                  Medicaid Accepted
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 px-4 py-2 text-sm min-h-[44px] inline-flex items-center">
                  Emergency Care
                </Badge>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm min-h-[44px]">
                  <Users className="h-5 w-5 text-primary" />
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm min-h-[44px]">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
              
              {/* CTAs - Touch-friendly 48px minimum */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="text-base px-6 sm:px-8 min-h-[48px]" asChild>
                  <Link href="/contact">
                    <Calendar className="h-5 w-5 mr-2" />
                    {t('hero.cta.primary')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-6 sm:px-8 min-h-[48px]" asChild>
                  <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    {t('hero.cta.secondary')}
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Image - Smaller on mobile */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/images/dentist-1.png"
                    alt="Dr. Sarah Chen - Lead Dentist"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -left-4 sm:left-0 top-1/4 bg-white rounded-xl shadow-lg p-3 sm:p-4 hidden md:block animate-fade-in-up">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Same Day</p>
                      <p className="font-semibold text-sm">Appointments</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 sm:right-0 bottom-1/4 bg-white rounded-xl shadow-lg p-3 sm:p-4 hidden md:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Emergency</p>
                      <p className="font-semibold text-sm">Care Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner - Touch-friendly */}
      <section className="bg-accent/10 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3 min-h-[44px]">
              <AlertCircle className="h-6 w-6 text-accent flex-shrink-0" />
              <p className="font-medium text-sm sm:text-base">
                <span className="text-accent">Dental Emergency?</span> We offer same-day appointments. Call now!
              </p>
            </div>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white min-h-[48px]" asChild>
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-4 w-4 mr-2" />
                {PRACTICE_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section - With Skeleton Loading */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 min-h-[44px] px-4 py-2">Our Expertise</Badge>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {isLoading ? (
              // Skeleton loading state
              <>
                {[...Array(6)].map((_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </>
            ) : (
              // Actual service cards - Touch-friendly
              featuredServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="group touch-target"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-white active:scale-[0.98]">
                    <CardContent className="p-5 sm:p-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                        <span className="text-xl sm:text-2xl">{serviceIcons[service.icon] || '🦷'}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {language === 'es' ? service.shortDescEs : language === 'zh' ? service.shortDescZh : service.shortDesc}
                      </p>
                      <span className="inline-flex items-center text-primary text-sm font-medium min-h-[44px] group-hover:gap-2 transition-all">
                        {t('services.cta')}
                        <ChevronRight className="h-4 w-4 ml-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
          
          <div className="text-center mt-8 sm:mt-10">
            <Button size="lg" variant="outline" className="min-h-[48px]" asChild>
              <Link href="/services">
                {t('services.allServices')}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile optimized */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 min-h-[44px] px-4 py-2">Why Us</Badge>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3">
              {t('why.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Award, title: t('why.experience.title'), desc: t('why.experience.desc') },
              { icon: Sparkles, title: t('why.technology.title'), desc: t('why.technology.desc') },
              { icon: Heart, title: t('why.comfort.title'), desc: t('why.comfort.desc') },
              { icon: Users, title: t('why.languages.title'), desc: t('why.languages.desc') },
              { icon: AlertCircle, title: t('why.emergency.title'), desc: t('why.emergency.desc') },
              { icon: CreditCard, title: t('why.insurance.title'), desc: t('why.insurance.desc') },
            ].map((item, index) => (
              <div key={index} className="text-center group p-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Mobile optimized */}
      <section className="py-12 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 min-h-[44px] px-4 py-2">Testimonials</Badge>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3">
              {t('testimonials.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t('testimonials.subtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                    "{language === 'es' ? testimonial.textEs : language === 'zh' ? testimonial.textZh : testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 min-h-[44px]">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas - Touch-friendly badges */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 min-h-[44px] px-4 py-2">Service Areas</Badge>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3">
              Proudly Serving Queens
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Convenient dental care for Woodside and surrounding communities
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {SERVICE_AREAS.map((area) => (
              <Link 
                key={area.zip} 
                href={`/locations/${area.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="touch-target"
              >
                <Badge
                  variant={area.primary ? "default" : "outline"}
                  className={cn(
                    "px-4 py-2.5 text-sm min-h-[44px]",
                    area.primary && "bg-primary"
                  )}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {area.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section - Touch-friendly */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-3 min-h-[44px] px-4 py-2">Insurance</Badge>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-3">
              {t('insurance.title')}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t('insurance.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {INSURANCE_PLANS.slice(0, 8).map((plan) => (
              <div
                key={plan.name}
                className="bg-white px-4 sm:px-6 py-3 rounded-lg shadow-sm border border-border/50 hover:border-primary/50 transition-colors min-h-[48px] flex items-center"
              >
                <span className="font-medium text-sm">{plan.name}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="min-h-[48px]" asChild>
              <Link href="/insurance">
                View All Insurance Options
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Using BookingBanner */}
      <BookingBanner />
    </div>
  );
}
