'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRACTICE_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { 
  Calendar, Phone, Download, ClipboardCheck, CreditCard, 
  Heart, Clock, Shield, FileText, CheckCircle, ChevronRight,
  Star
} from 'lucide-react';

export default function NewPatientsClient() {
  const { t, language } = useLanguage();

  const patientForms = [
    { name: 'New Patient Registration Form', nameEs: 'Formulario de Registro', nameZh: '新患者登记表', file: '/forms/new-patient.pdf' },
    { name: 'Medical History Form', nameEs: 'Historial Médico', nameZh: '病史表', file: '/forms/medical-history.pdf' },
    { name: 'HIPAA Consent Form', nameEs: 'Formulario de Consentimiento HIPAA', nameZh: 'HIPAA同意书', file: '/forms/hipaa-consent.pdf' },
    { name: 'Financial Policy', nameEs: 'Política Financiera', nameZh: '财务政策', file: '/forms/financial-policy.pdf' },
  ];

  const whatToExpect = [
    {
      icon: ClipboardCheck,
      title: 'Check-In',
      titleEs: 'Registro',
      titleZh: '登记',
      desc: 'Arrive 15 minutes early to complete paperwork. Bring your ID, insurance card, and any previous dental records.',
      descEs: 'Llegue 15 minutos antes. Traiga su identificación, tarjeta de seguro y registros dentales previos.',
      descZh: '提前15分钟到达并填写表格。请携带身份证件、保险卡和之前的牙科记录。',
    },
    {
      icon: Heart,
      title: 'Comprehensive Exam',
      titleEs: 'Examen Completo',
      titleZh: '全面检查',
      desc: 'Our dentist will perform a thorough examination, including X-rays, oral cancer screening, and discuss your dental goals.',
      descEs: 'Nuestro dentista realizará un examen completo, incluyendo rayos X y detección de cáncer oral.',
      descZh: '我们的牙医将进行全面检查，包括X光片、口腔癌筛查，并讨论您的牙科目标。',
    },
    {
      icon: FileText,
      title: 'Treatment Plan',
      titleEs: 'Plan de Tratamiento',
      titleZh: '治疗计划',
      desc: 'We\'ll create a personalized treatment plan tailored to your needs and budget. No surprises!',
      descEs: 'Crearemos un plan de tratamiento personalizado según sus necesidades y presupuesto.',
      descZh: '我们将根据您的需求和预算制定个性化治疗计划。绝无隐形消费！',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">Welcome!</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              New Patient Information
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to Smile Savers! We're excited to meet you and help you achieve your 
              healthiest smile. Here's everything you need to know for your first visit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book First Appointment
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call {PRACTICE_INFO.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Patient Special */}
      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-accent" />
              <div className="text-left">
                <p className="text-sm text-accent font-medium">NEW PATIENT SPECIAL</p>
                <p className="text-xl font-bold">$99 Exam, X-Rays & Cleaning</p>
              </div>
            </div>
            <Button className="bg-accent hover:bg-accent/90">
              Claim This Offer
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Your First Visit</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              What to Expect
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We want your first visit to be as smooth and comfortable as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whatToExpect.map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-sm text-primary font-medium mb-1">Step {i + 1}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'es' ? item.titleEs : language === 'zh' ? item.titleZh : item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? item.descEs : language === 'zh' ? item.descZh : item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Forms */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Save Time</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Download Patient Forms
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete these forms before your visit to save time. You can also fill them out when you arrive.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {patientForms.map((form, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-medium text-sm mb-3">
                    {language === 'es' ? form.nameEs : language === 'zh' ? form.nameZh : form.name}
                  </h3>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={form.file} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Be Prepared</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                What to Bring
              </h2>
              <div className="space-y-3">
                {[
                  'Valid photo ID (driver\'s license, passport, or state ID)',
                  'Dental insurance card (if applicable)',
                  'List of current medications and dosages',
                  'Previous dental X-rays (if available)',
                  'Referral form from another dentist (if applicable)',
                  'Payment method (credit card, cash, or CareCredit)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Appointment Tips</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Arrive 15 minutes early to complete paperwork
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Write down any questions or concerns beforehand
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Bring a list of medications you're currently taking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Let us know if you have dental anxiety - we're here to help!
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Affordable Care</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Insurance & Payment Options
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Insurance Accepted</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, 
                  MetLife, and Medicaid. We'll help verify your benefits before treatment.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/insurance">View All Insurance</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">No Insurance? No Problem!</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  We offer an affordable in-house membership plan with discounts on all services, 
                  plus CareCredit financing options for larger treatments.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/insurance">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Schedule Your First Visit?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            We can't wait to meet you! Book your appointment today and take the first step 
            toward a healthier, brighter smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8" asChild>
              <Link href="/contact">
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent border-white/30 hover:bg-white/10" asChild>
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-5 w-5 mr-2" />
                {PRACTICE_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
