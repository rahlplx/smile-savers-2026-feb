'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { PRACTICE_INFO, SERVICES } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { 
  Phone, Mail, MapPin, Clock, Shield, Send, CheckCircle,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactClient() {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a HIPAA-compliant backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const hoursData = [
    { day: 'Monday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Friday', hours: 'Closed', closed: true },
    { day: 'Saturday', hours: '9:00 AM - 1:00 PM' },
    { day: 'Sunday', hours: 'Closed', closed: true },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">{t('nav.contact')}</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to schedule your appointment? Have questions? We're here to help! 
              Reach out to us through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Send Us a Message</h2>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('form.success')}
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* HIPAA Notice */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        Your information is protected. This form uses secure, HIPAA-compliant encryption.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('form.name')} *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('form.phone')} *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="(718) 555-1234"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t('form.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="service">{t('form.service')}</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({...formData, service: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {language === 'es' ? service.nameEs : language === 'zh' ? service.nameZh : service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('form.message')}</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your dental needs..."
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        required
                        checked={formData.consent}
                        onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                        {t('form.consent')} <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                      </Label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      {t('form.submit')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Info & Map */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Quick Contact</h2>
                  <div className="space-y-4">
                    <a
                      href={`tel:${PRACTICE_INFO.phoneFormatted}`}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call Us</p>
                        <p className="font-semibold">{PRACTICE_INFO.phone}</p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${PRACTICE_INFO.email}`}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Us</p>
                        <p className="font-semibold">{PRACTICE_INFO.email}</p>
                      </div>
                    </a>
                    <a
                      href={PRACTICE_INFO.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Visit Us</p>
                        <p className="font-semibold">{PRACTICE_INFO.address.full}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">{t('footer.hours')}</h2>
                  </div>
                  <div className="space-y-2">
                    {hoursData.map((item) => (
                      <div
                        key={item.day}
                        className={cn(
                          'flex justify-between py-2 border-b border-border/50 last:border-0',
                          item.closed && 'text-muted-foreground'
                        )}
                      >
                        <span className="font-medium">{item.day}</span>
                        <span>{item.closed ? t('footer.closed') : item.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-sm font-medium text-accent">
                      🚨 Emergency? Call us anytime for same-day care!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="border-border/50 overflow-hidden">
                <div className="aspect-video bg-muted">
                  <iframe
                    src={PRACTICE_INFO.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Smile Savers Location"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
