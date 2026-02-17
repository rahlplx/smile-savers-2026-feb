'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { PRACTICE_INFO, NAV_LINKS, SERVICES } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t, language } = useLanguage();
  const featuredServices = SERVICES.filter(s => s.featured).slice(0, 6);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <div>
                <span className="font-bold text-lg text-white">Smile Savers</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/80 text-sm mb-4 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a
                href={PRACTICE_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={PRACTICE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-foreground/80 hover:text-white text-sm transition-colors"
                  >
                    {language === 'es' ? link.labelEs : language === 'zh' ? link.labelZh : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2.5">
              {featuredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-secondary-foreground/80 hover:text-white text-sm transition-colors"
                  >
                    {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <a
                href={`tel:${PRACTICE_INFO.phoneFormatted}`}
                className="flex items-start gap-3 text-secondary-foreground/80 hover:text-white text-sm transition-colors"
              >
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{PRACTICE_INFO.phone}</span>
              </a>
              <a
                href={PRACTICE_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-secondary-foreground/80 hover:text-white text-sm transition-colors"
              >
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{PRACTICE_INFO.address.full}</span>
              </a>
              <a
                href={`mailto:${PRACTICE_INFO.email}`}
                className="flex items-start gap-3 text-secondary-foreground/80 hover:text-white text-sm transition-colors"
              >
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{PRACTICE_INFO.email}</span>
              </a>
            </div>

            <h3 className="font-semibold text-white mt-6 mb-3">{t('footer.hours')}</h3>
            <div className="text-sm space-y-1 text-secondary-foreground/80">
              <div className="flex justify-between">
                <span>Mon - Wed:</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Thursday:</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday:</span>
                <span>{t('footer.closed')}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>{t('footer.closed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-foreground/60">
            <p>
              © {new Date().getFullYear()} {PRACTICE_INFO.name}. {t('footer.rights')}
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/privacy#hipaa" className="hover:text-white transition-colors">
                {t('footer.hipaa')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
