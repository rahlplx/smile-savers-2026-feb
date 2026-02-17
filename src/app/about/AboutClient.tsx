'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRACTICE_INFO, TEAM_MEMBERS, TESTIMONIALS } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { 
  Calendar, Phone, Award, Heart, Users, Shield, Clock, 
  Star, GraduationCap, Languages, ChevronRight
} from 'lucide-react';

export default function AboutClient() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">About Us</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Your Trusted Dental Home Since 2010
            </h1>
            <p className="text-lg text-muted-foreground">
              At Smile Savers Creating Smiles, we believe everyone deserves exceptional dental care 
              in a welcoming, comfortable environment. Our dedicated team combines expertise with 
              compassion to deliver the best possible outcomes for our patients.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Creating Healthy Smiles for Our Community
              </h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to provide accessible, high-quality dental care to the diverse 
                Woodside community. We are committed to creating a comfortable environment where 
                patients of all backgrounds feel welcome and receive personalized care tailored 
                to their unique needs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Heart, label: 'Patient-Centered Care' },
                  { icon: Shield, label: 'Safety First' },
                  { icon: Award, label: 'Excellence' },
                  { icon: Users, label: 'Community Focus' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/happy-family.png"
                  alt="Happy family at Smile Savers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Our Team</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Meet Your Dental Care Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our experienced dentists and staff are dedicated to providing you with the 
              highest quality dental care in a warm and welcoming environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">
                    {language === 'es' ? member.roleEs : language === 'zh' ? member.roleZh : member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {language === 'es' ? member.bioEs : language === 'zh' ? member.bioZh : member.bio}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Specialties</p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specialties.map((s, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Languages</p>
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4 text-primary" />
                        <span className="text-sm">{member.languages.join(', ')}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Education</p>
                      <div className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          {member.education.map((edu, i) => (
                            <p key={i} className="text-sm">{edu}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Why Choose Us</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              The Smile Savers Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: '15+ Years of Experience',
                desc: 'Our team has been serving the Woodside community for over 15 years, building lasting relationships with our patients.',
              },
              {
                icon: Users,
                title: 'Multilingual Team',
                desc: 'We speak English, Spanish, and Chinese to serve our diverse community in their preferred language.',
              },
              {
                icon: Clock,
                title: 'Convenient Hours',
                desc: 'Early morning and Saturday appointments available to fit your busy schedule.',
              },
              {
                icon: Shield,
                title: 'HIPAA Compliant',
                desc: 'Your privacy and security are our top priority. We maintain strict HIPAA compliance.',
              },
              {
                icon: Heart,
                title: 'Gentle Care',
                desc: 'We understand dental anxiety and provide gentle, compassionate care for nervous patients.',
              },
              {
                icon: Star,
                title: '5-Star Reviews',
                desc: 'Our patients love us! Check out our hundreds of positive reviews on Google and Facebook.',
              },
            ].map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Testimonials</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold">What Our Patients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                    "{language === 'es' ? testimonial.textEs : language === 'zh' ? testimonial.textZh : testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Join Our Family?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Schedule your appointment today and experience the Smile Savers difference.
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
