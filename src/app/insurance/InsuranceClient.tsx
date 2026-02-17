'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INSURANCE_PLANS, PAYMENT_OPTIONS, PRACTICE_INFO } from '@/lib/constants';
import { 
  CreditCard, Shield, CheckCircle, Phone, Calendar, 
  Heart, Star, Building, Wallet
} from 'lucide-react';

export default function InsuranceClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">Insurance & Payment</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Making Dental Care Affordable
            </h1>
            <p className="text-lg text-muted-foreground">
              We believe everyone deserves access to quality dental care. That's why we accept 
              most insurance plans and offer flexible payment options to fit your budget.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Plans */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Accepted Plans</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Insurance Plans We Accept
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We work with most major dental insurance providers. If you don't see your plan 
              listed, please call us – we may still accept it!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INSURANCE_PLANS.map((plan, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">{plan.type}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Don't see your insurance? Call us at{' '}
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`} className="text-primary font-medium">
                {PRACTICE_INFO.phone}
              </a>
            </p>
            <Button variant="outline" asChild>
              <a href={`tel:${PRACTICE_INFO.phoneFormatted}`}>
                <Phone className="h-4 w-4 mr-2" />
                Verify Your Insurance
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Flexible Payment</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Payment Options
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer multiple payment methods to make your dental care as convenient as possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wallet, name: 'Cash', desc: 'Pay with cash at time of service' },
              { icon: CreditCard, name: 'Credit & Debit Cards', desc: 'Visa, MasterCard, Amex, Discover' },
              { icon: Building, name: 'Personal Checks', desc: 'Accepted with valid ID' },
              { icon: Heart, name: 'CareCredit', desc: '0% financing for qualified patients' },
              { icon: Calendar, name: 'Payment Plans', desc: 'Flexible in-house financing available' },
              { icon: Star, name: 'Membership Plan', desc: 'Exclusive discounts for uninsured patients' },
            ].map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plan */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">For Uninsured Patients</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Smile Savers Membership Plan
              </h2>
              <p className="text-muted-foreground mb-6">
                No dental insurance? No problem! Our in-house membership plan provides 
                affordable access to quality dental care with significant savings on all services.
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  '2 comprehensive exams per year',
                  '2 professional cleanings per year',
                  'All necessary X-rays',
                  '15-25% discount on all other treatments',
                  'No deductibles or waiting periods',
                  'No annual maximums',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Individual Plan</p>
                    <p className="text-2xl font-bold text-primary">$299<span className="text-sm font-normal">/year</span></p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Family Plan</p>
                    <p className="text-2xl font-bold text-primary">$699<span className="text-sm font-normal">/year</span></p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Enroll Today!</h3>
                <p className="opacity-90 mb-6">
                  Start saving on your dental care right away. Enrollment is quick and easy – 
                  ask our front desk staff for details.
                </p>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/contact">
                    <Calendar className="h-5 w-5 mr-2" />
                    Enroll Now
                  </Link>
                </Button>
                <p className="text-xs opacity-75 text-center mt-4">
                  Or call us at {PRACTICE_INFO.phone}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CareCredit */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Finance Your Smile with CareCredit
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    CareCredit is a healthcare credit card designed for your health and wellness 
                    needs. It's a way to pay for the costs of many treatments and procedures and 
                    pay for them in convenient monthly payments.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      No interest if paid in full within 6-12 months
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Low monthly payments available
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      No annual fees
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Quick and easy application
                    </li>
                  </ul>
                  <Button asChild>
                    <a href="https://www.carecredit.com" target="_blank" rel="noopener noreferrer">
                      Apply for CareCredit
                    </a>
                  </Button>
                </div>
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">0%</div>
                  <p className="text-muted-foreground">Interest financing available</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    for qualified applicants
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Questions About Payment?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Our friendly team is here to help you understand your options and maximize your benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30" asChild>
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
