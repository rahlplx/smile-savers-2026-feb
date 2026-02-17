'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText, Bell, Users } from 'lucide-react';

export default function PrivacyClient() {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Badge variant="secondary" className="mb-4">Legal</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Privacy Policy & HIPAA Notice
          </h1>
          <p className="text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-slate max-w-none">
            {/* Introduction */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Your Privacy Matters</h2>
                    <p className="text-sm text-muted-foreground mb-0">
                      At Smile Savers Creating Smiles, we are committed to protecting your personal 
                      and health information. This policy outlines how we collect, use, and safeguard 
                      your information in compliance with HIPAA regulations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HIPAA Notice */}
            <div id="hipaa" className="mb-8">
              <h2 className="text-2xl font-bold mb-4">HIPAA Notice of Privacy Practices</h2>
              <p className="text-muted-foreground mb-4">
                This notice describes how medical information about you may be used and disclosed 
                and how you can get access to this information. Please review it carefully.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">Your Rights Under HIPAA</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-primary mt-1" />
                    <span>Right to request access to your health records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary mt-1" />
                    <span>Right to request corrections to your health records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Bell className="h-4 w-4 text-primary mt-1" />
                    <span>Right to receive notifications of privacy breaches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-1" />
                    <span>Right to restrict certain disclosures of your information</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We may collect the following types of information:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Personal Information', items: ['Name, address, phone number', 'Date of birth', 'Social Security number (for insurance)'] },
                  { title: 'Health Information', items: ['Medical history', 'Dental records', 'X-rays and diagnostic images'] },
                  { title: 'Financial Information', items: ['Insurance details', 'Payment history', 'Billing records'] },
                  { title: 'Communication Records', items: ['Appointment history', 'Email correspondence', 'Phone call logs'] },
                ].map((section, i) => (
                  <Card key={i} className="border-border/50">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{section.title}</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {section.items.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide and coordinate your dental care</li>
                <li>Communicate with you about appointments and treatment</li>
                <li>Process insurance claims and payments</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and patient experience</li>
                <li>Send appointment reminders and follow-up communications</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Our Security Measures</h3>
                      <p className="text-sm text-muted-foreground">
                        We implement appropriate technical and organizational security measures to 
                        protect your personal and health information. These include:
                      </p>
                      <ul className="text-sm text-muted-foreground mt-3 space-y-1">
                        <li>• Encrypted electronic health records (EHR)</li>
                        <li>• Secure, HIPAA-compliant communication systems</li>
                        <li>• Access controls and authentication protocols</li>
                        <li>• Regular security assessments and staff training</li>
                        <li>• Physical security measures at our facility</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Information Sharing */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Other healthcare providers involved in your care</li>
                <li>Your insurance company for claims processing</li>
                <li>Third-party service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Questions or Concerns</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this privacy policy or wish to exercise your rights 
                under HIPAA, please contact our Privacy Officer:
              </p>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="font-medium">Privacy Officer</p>
                  <p className="text-muted-foreground">Smile Savers Creating Smiles</p>
                  <p className="text-muted-foreground">3202 53rd Place, Woodside, NY 11377</p>
                  <p className="text-muted-foreground">Phone: (718) 956-8400</p>
                </CardContent>
              </Card>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. The most current version 
                will always be available on our website. We encourage you to review this policy 
                periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
