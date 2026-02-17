'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQ_CATEGORIES, FAQS, PRACTICE_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/i18n';
import { 
  Search, Phone, Calendar, MessageCircle, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqClient() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions about our services, insurance, appointments, and more. 
              Can't find what you're looking for? Contact us!
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        !activeCategory 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      )}
                    >
                      All Questions
                    </button>
                    {FAQ_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                          activeCategory === category.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        )}
                      >
                        {language === 'es' ? category.nameEs : language === 'zh' ? category.nameZh : category.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              {filteredFaqs.length === 0 ? (
                <Card className="text-center p-8">
                  <CardContent>
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any FAQs matching your search.
                    </p>
                    <Button onClick={() => { setSearchTerm(''); setActiveCategory(null); }}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {filteredFaqs.map((faq, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`item-${i}`}
                      className="bg-white border rounded-lg px-4 faq-item"
                      itemProp="mainEntity"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <AccordionTrigger className="text-left py-4 hover:no-underline faq-question">
                        <div className="flex items-start gap-3">
                          <span className="text-primary font-medium">Q:</span>
                          <span className="font-medium" itemProp="name">
                            {language === 'es' ? faq.questionEs : language === 'zh' ? faq.questionZh : faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        <div 
                          className="flex items-start gap-3 pl-7 faq-answer" 
                          itemProp="acceptedAnswer" 
                          itemScope 
                          itemType="https://schema.org/Answer"
                        >
                          <span className="text-primary font-medium">A:</span>
                          <span itemProp="text">
                            {language === 'es' ? faq.answerEs : language === 'zh' ? faq.answerZh : faq.answer}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our friendly team is here to help. Contact us and we'll get back to you promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Calendar className="h-5 w-5 mr-2" />
                Contact Us
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
      </section>
    </div>
  );
}
