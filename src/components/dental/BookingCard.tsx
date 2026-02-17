'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, Phone, Clock, MapPin, ChevronRight, 
  CheckCircle, Shield, CreditCard, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRACTICE_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

/**
 * BookingCard - Consistent Appointment Booking UI
 * 
 * Design inspired by Google Stitch booking pages
 * Features:
 * - Glassmorphism card design
 * - Clear call-to-action hierarchy
 * - Trust indicators (HIPAA, Insurance)
 * - Emergency availability highlight
 * - Mobile-first responsive design
 */

interface BookingCardProps {
  variant?: 'default' | 'compact' | 'emergency' | 'sidebar';
  showTrustBadges?: boolean;
  className?: string;
}

export function BookingCard({ 
  variant = 'default', 
  showTrustBadges = true,
  className 
}: BookingCardProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const labels = {
    bookAppointment: language === 'es' ? 'Agendar Cita' : language === 'zh' ? '预约就诊' : 'Book Appointment',
    callNow: language === 'es' ? 'Llamar Ahora' : language === 'zh' ? '立即致电' : 'Call Now',
    sameDay: language === 'es' ? 'Mismo Día' : language === 'zh' ? '当日预约' : 'Same Day',
    available: language === 'es' ? 'Disponible' : language === 'zh' ? '可用' : 'Available',
    emergency: language === 'es' ? 'Emergencia' : language === 'zh' ? '急诊' : 'Emergency',
    hours: language === 'es' ? 'Horario' : language === 'zh' ? '营业时间' : 'Hours',
    location: language === 'es' ? 'Ubicación' : language === 'zh' ? '地址' : 'Location',
    insuranceAccepted: language === 'es' ? 'Seguros Aceptados' : language === 'zh' ? '接受保险' : 'Insurance Accepted',
    hipaaCompliant: language === 'es' ? 'Cumple HIPAA' : language === 'zh' ? '符合HIPAA' : 'HIPAA Compliant',
    newPatients: language === 'es' ? 'Nuevos Pacientes' : language === 'zh' ? '新患者' : 'New Patients',
    welcome: language === 'es' ? 'Bienvenidos' : language === 'zh' ? '欢迎' : 'Welcome',
  };

  // Emergency variant
  if (variant === 'emergency') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl p-5',
          'bg-gradient-to-br from-accent to-accent/90',
          'text-white',
          'shadow-lg shadow-accent/30',
          className
        )}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] animate-shimmer" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-lg">{labels.emergency}</p>
              <p className="text-sm text-white/80">{labels.sameDay} {labels.available}</p>
            </div>
          </div>

          <p className="text-sm text-white/90 mb-4">
            {language === 'es' 
              ? 'Atención dental de emergencia el mismo día. Llame ahora para cita inmediata.'
              : language === 'zh'
              ? '当日牙科急诊服务。立即致电预约。'
              : 'Same-day emergency dental care available. Call now for immediate appointment.'}
          </p>

          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-white text-accent hover:bg-white/90 min-h-[48px]"
            >
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-4 w-4 mr-2" />
                {labels.callNow}
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'floating-card rounded-xl p-4',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{labels.bookAppointment}</p>
            <p className="text-xs text-muted-foreground">{labels.sameDay} {labels.available}</p>
          </div>
          <Button asChild size="sm" className="min-h-[44px]">
            <Link href="/contact">
              {labels.bookAppointment}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div
        className={cn(
          'floating-card rounded-2xl p-5 space-y-4',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-bold">{labels.bookAppointment}</p>
            <p className="text-sm text-muted-foreground">{labels.sameDay} {labels.available}</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Mon-Thu: 10am-5pm, Sat: 9am-1pm</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{PRACTICE_INFO.address.city}, {PRACTICE_INFO.address.state}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <Button asChild className="w-full min-h-[48px]">
            <Link href="/contact">
              <Calendar className="h-4 w-4 mr-2" />
              {labels.bookAppointment}
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full min-h-[48px]">
            <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
              <Phone className="h-4 w-4 mr-2" />
              {PRACTICE_INFO.phone}
            </a>
          </Button>
        </div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>{labels.hipaaCompliant}</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span>{labels.insuranceAccepted}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        'floating-card rounded-2xl overflow-hidden',
        'transition-all duration-300',
        isHovered && 'shadow-[0_12px_40px_rgba(0,0,0,0.15)]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-5 py-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/20">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold">{labels.bookAppointment}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>{labels.sameDay} {labels.available}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{labels.newPatients}</p>
            <p className="text-sm font-semibold text-primary">{labels.welcome}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{labels.hours}</p>
              <p className="text-xs font-medium truncate">Mon-Thu 10-5, Sat 9-1</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{labels.location}</p>
              <p className="text-xs font-medium truncate">{PRACTICE_INFO.address.city}, NY</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <Button
            asChild
            className="flex-1 min-h-[52px] text-base font-semibold shadow-lg shadow-primary/20"
          >
            <Link href="/contact">
              <Calendar className="h-5 w-5 mr-2" />
              {labels.bookAppointment}
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="min-h-[52px] px-4"
          >
            <a href={`tel:${PRACTICE_INFO.phoneFormatted}`} aria-label={labels.callNow}>
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
              <span>{labels.hipaaCompliant}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span>{labels.insuranceAccepted}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * BookingBanner - Full-width booking banner
 * For use at top/bottom of pages
 */
export function BookingBanner({ className }: { className?: string }) {
  const { language } = useLanguage();
  
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-r from-primary via-primary to-primary/90',
        'text-white',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-lg">
                {language === 'es' ? '¿Listo para su cita?' : language === 'zh' ? '准备预约吗？' : 'Ready for your appointment?'}
              </p>
              <p className="text-sm text-white/80">
                {language === 'es' 
                  ? 'Citas disponibles el mismo día. Medicare/Medicaid aceptados.'
                  : language === 'zh'
                  ? '当日预约可用。接受Medicare/Medicaid。'
                  : 'Same-day appointments available. Medicare/Medicaid accepted.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="min-h-[48px] font-semibold"
            >
              <Link href="/contact">
                <Calendar className="h-5 w-5 mr-2" />
                {language === 'es' ? 'Agendar' : language === 'zh' ? '预约' : 'Book Now'}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-[48px] bg-transparent border-white/30 hover:bg-white/10"
            >
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-5 w-5 mr-2" />
                {PRACTICE_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
