'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';

export type Language = 'en' | 'es' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.newPatients': 'New Patients',
    'nav.insurance': 'Insurance',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.bookNow': 'Book Now',
    'nav.callNow': 'Call Now',
    
    // Hero
    'hero.title': 'Your Trusted Dental Home in Woodside, NY',
    'hero.subtitle': 'Providing exceptional dental care with compassion, expertise, and the latest technology. Se habla español. 讲中文.',
    'hero.cta.primary': 'Book Appointment',
    'hero.cta.secondary': 'Call Now',
    'hero.badge': 'Accepting New Patients',
    
    // Services
    'services.title': 'Our Dental Services',
    'services.subtitle': 'Comprehensive care for your entire family',
    'services.cta': 'Learn More',
    'services.allServices': 'View All Services',
    
    // Why Choose Us
    'why.title': 'Why Choose Smile Savers?',
    'why.subtitle': 'Experience the difference of patient-centered dental care',
    'why.experience.title': 'Experienced Team',
    'why.experience.desc': 'Over 15 years of experience serving the Woodside community with personalized care.',
    'why.technology.title': 'Modern Technology',
    'why.technology.desc': 'State-of-the-art equipment for accurate diagnoses and comfortable treatments.',
    'why.comfort.title': 'Patient Comfort',
    'why.comfort.desc': 'Gentle techniques, sedation options, and a relaxing environment for stress-free visits.',
    'why.languages.title': 'Multilingual Team',
    'why.languages.desc': 'We speak English, Spanish, and Chinese to serve our diverse community.',
    'why.emergency.title': 'Emergency Care',
    'why.emergency.desc': 'Same-day appointments available for dental emergencies. Call us anytime.',
    'why.insurance.title': 'Insurance Friendly',
    'why.insurance.desc': 'We accept most insurance plans and offer flexible payment options.',
    
    // Testimonials
    'testimonials.title': 'What Our Patients Say',
    'testimonials.subtitle': 'Join thousands of satisfied patients',
    
    // Insurance
    'insurance.title': 'Insurance & Payment',
    'insurance.subtitle': 'We make dental care affordable',
    'insurance.accepted': 'Insurance Plans Accepted',
    'insurance.paymentOptions': 'Payment Options',
    
    // CTA Section
    'cta.title': 'Ready for a Healthier Smile?',
    'cta.subtitle': 'Schedule your appointment today and experience the Smile Savers difference.',
    'cta.button': 'Book Your Appointment',
    
    // Footer
    'footer.description': 'Providing exceptional dental care for the Woodside community since 2010. Your smile is our priority.',
    'footer.hours': 'Office Hours',
    'footer.closed': 'Closed',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.hipaa': 'HIPAA Notice',
    
    // Contact Form
    'form.name': 'Full Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.service': 'Service Interested In',
    'form.message': 'Your Message',
    'form.submit': 'Send Message',
    'form.consent': 'I agree to the privacy policy and consent to being contacted.',
    'form.success': 'Thank you! We will contact you shortly.',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.back': 'Back',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred. Please try again.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Sobre Nosotros',
    'nav.newPatients': 'Nuevos Pacientes',
    'nav.insurance': 'Seguro',
    'nav.faq': 'Preguntas',
    'nav.contact': 'Contacto',
    'nav.bookNow': 'Reservar',
    'nav.callNow': 'Llamar',
    
    // Hero
    'hero.title': 'Sonrisas Saludables para Toda Su Familia',
    'hero.subtitle': 'Más de 15 años cuidando las sonrisas de Woodside y Queens. Nuestro equipo amable habla español y trata a cada paciente como familia. Aceptamos Medicaid.',
    'hero.cta.primary': 'Agendar Mi Cita',
    'hero.cta.secondary': 'Llamar Ahora',
    'hero.badge': 'Bienvenidos - Aceptamos Nuevos Pacientes',
    
    // Services
    'services.title': 'Nuestros Servicios Dentales',
    'services.subtitle': 'Atención integral para toda su familia',
    'services.cta': 'Más Información',
    'services.allServices': 'Ver Todos los Servicios',
    
    // Why Choose Us
    'why.title': '¿Por Qué Elegir Smile Savers?',
    'why.subtitle': 'Tratamos a cada paciente como parte de nuestra familia',
    'why.experience.title': 'Más de 15 Años de Experiencia',
    'why.experience.desc': 'Llevamos más de 15 años sirviendo con amor a la comunidad de Woodside y Queens.',
    'why.technology.title': 'Tecnología Moderna',
    'why.technology.desc': 'Equipos de última generación para diagnósticos precisos y tratamientos cómodos.',
    'why.comfort.title': 'Su Comodidad es Importante',
    'why.comfort.desc': 'Técnicas suaves, sedación disponible, y un ambiente tranquilo para que se sienta como en casa.',
    'why.languages.title': 'Hablamos Su Idioma',
    'why.languages.desc': 'Todo nuestro equipo habla español. También hablamos inglés y chino. Le explicaremos todo con paciencia.',
    'why.emergency.title': 'Emergencias Dentales',
    'why.emergency.desc': 'Atendemos emergencias el mismo día. Llámenos cuando nos necesite.',
    'why.insurance.title': 'Aceptamos Su Seguro',
    'why.insurance.desc': 'Aceptamos Medicaid, Medicare y la mayoría de seguros. Ofrecemos planes de pago flexibles.',
    
    // Testimonials
    'testimonials.title': 'Lo Que Dicen Nuestros Pacientes',
    'testimonials.subtitle': 'Únase a miles de pacientes satisfechos',
    
    // Insurance
    'insurance.title': 'Seguro y Pago',
    'insurance.subtitle': 'Hacemos que la atención dental sea asequible',
    'insurance.accepted': 'Planes de Seguro Aceptados',
    'insurance.paymentOptions': 'Opciones de Pago',
    
    // CTA Section
    'cta.title': '¿Listo para Cuidar Su Sonrisa?',
    'cta.subtitle': 'Llámenos hoy para agendar su cita. Será un gusto atenderle a usted y su familia.',
    'cta.button': 'Agendar Mi Cita',
    
    // Footer
    'footer.description': 'Cuidando las sonrisas de la comunidad de Woodside y Queens desde 2010. Su familia es nuestra familia.',
    'footer.hours': 'Horario de Oficina',
    'footer.closed': 'Cerrado',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.services': 'Servicios',
    'footer.contact': 'Contáctenos',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.hipaa': 'Aviso HIPAA',
    
    // Contact Form
    'form.name': 'Nombre Completo',
    'form.email': 'Correo Electrónico',
    'form.phone': 'Número de Teléfono',
    'form.service': 'Servicio de Interés',
    'form.message': 'Su Mensaje',
    'form.submit': 'Enviar Mensaje',
    'form.consent': 'Acepto la política de privacidad y consiento ser contactado.',
    'form.success': '¡Gracias por confiar en nosotros! Le llamaremos pronto para confirmar su cita.',
    
    // Common
    'common.learnMore': 'Más Información',
    'common.viewAll': 'Ver Todo',
    'common.back': 'Atrás',
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error. Por favor intente de nuevo.',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.services': '服务',
    'nav.about': '关于我们',
    'nav.newPatients': '新患者',
    'nav.insurance': '保险',
    'nav.faq': '常见问题',
    'nav.contact': '联系我们',
    'nav.bookNow': '预约',
    'nav.callNow': '立即致电',
    
    // Hero
    'hero.title': '您在伍德赛德的可信赖牙科之家',
    'hero.subtitle': '以热情、专业和最新技术提供卓越的牙科护理。我们讲中文。',
    'hero.cta.primary': '预约就诊',
    'hero.cta.secondary': '立即致电',
    'hero.badge': '接受新患者',
    
    // Services
    'services.title': '我们的牙科服务',
    'services.subtitle': '为您全家提供全面护理',
    'services.cta': '了解更多',
    'services.allServices': '查看所有服务',
    
    // Why Choose Us
    'why.title': '为什么选择 Smile Savers？',
    'why.subtitle': '体验以患者为中心的牙科护理的不同之处',
    'why.experience.title': '经验丰富的团队',
    'why.experience.desc': '超过15年为伍德赛德社区服务的经验。',
    'why.technology.title': '现代技术',
    'why.technology.desc': '最先进的设备，提供准确诊断和舒适治疗。',
    'why.comfort.title': '患者舒适',
    'why.comfort.desc': '温和的技术、镇静选项和放松的环境。',
    'why.languages.title': '多语言团队',
    'why.languages.desc': '我们讲英语、西班牙语和中文，服务多元化社区。',
    'why.emergency.title': '急诊护理',
    'why.emergency.desc': '牙科急诊当日预约。随时致电我们。',
    'why.insurance.title': '保险友好',
    'why.insurance.desc': '我们接受大多数保险计划并提供灵活的付款方式。',
    
    // Testimonials
    'testimonials.title': '患者怎么说',
    'testimonials.subtitle': '加入成千上万满意的患者',
    
    // Insurance
    'insurance.title': '保险和付款',
    'insurance.subtitle': '我们让牙科护理变得实惠',
    'insurance.accepted': '接受的保险计划',
    'insurance.paymentOptions': '付款方式',
    
    // CTA Section
    'cta.title': '准备好拥有更健康的笑容了吗？',
    'cta.subtitle': '今天预约，体验 Smile Savers 的不同之处。',
    'cta.button': '预约您的就诊',
    
    // Footer
    'footer.description': '自2010年以来为伍德赛德社区提供卓越的牙科护理。您的笑容是我们的首要任务。',
    'footer.hours': '营业时间',
    'footer.closed': '休息',
    'footer.quickLinks': '快速链接',
    'footer.services': '服务项目',
    'footer.contact': '联系我们',
    'footer.rights': '版权所有。',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.hipaa': 'HIPAA通知',
    
    // Contact Form
    'form.name': '全名',
    'form.email': '电子邮件',
    'form.phone': '电话号码',
    'form.service': '感兴趣的服务',
    'form.message': '您的留言',
    'form.submit': '发送消息',
    'form.consent': '我同意隐私政策并同意被联系。',
    'form.success': '谢谢！我们会尽快与您联系。',
    
    // Common
    'common.learnMore': '了解更多',
    'common.viewAll': '查看全部',
    'common.back': '返回',
    'common.loading': '加载中...',
    'common.error': '发生错误。请重试。',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get initial language (for SSR compatibility)
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem('language') as Language;
  if (stored && ['en', 'es', 'zh'].includes(stored)) {
    return stored;
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('zh')) return 'zh';
  
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with default, will be updated on client
  const [language, setLanguage] = useState<Language>('en');
  const hasInitialized = useRef(false);

  // Sync language preference on mount
  const initializeLanguage = useCallback(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    const initial = getInitialLanguage();
    setLanguage(initial);
  }, []);

  // Run initialization once on client
  useEffect(() => {
    // Queue microtask to avoid synchronous setState
    queueMicrotask(initializeLanguage);
  }, [initializeLanguage]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
};

export const languageFlags: Record<Language, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  zh: '🇨🇳',
};
