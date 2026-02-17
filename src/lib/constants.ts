// Practice Information
export const PRACTICE_INFO = {
  name: "Smile Savers Creating Smiles",
  shortName: "Smile Savers",
  tagline: "Your Trusted Dental Home in Woodside, NY",
  description: "Providing exceptional dental care for the Woodside community with compassion, expertise, and the latest technology. Your smile is our priority.",
  
  // Contact
  phone: "(718) 956-8400",
  phoneFormatted: "7189568400",
  email: "info@smilesaversandassociates.com",
  website: "https://smilesaversandassociates.com",
  
  // Address
  address: {
    street: "3202 53rd Place",
    city: "Woodside",
    state: "NY",
    zip: "11377",
    country: "USA",
    full: "3202 53rd Place, Woodside, NY 11377",
  },
  
  // Hours
  hours: {
    monday: { open: "10:00 AM", close: "5:00 PM", closed: false },
    tuesday: { open: "10:00 AM", close: "5:00 PM", closed: false },
    wednesday: { open: "10:00 AM", close: "5:00 PM", closed: false },
    thursday: { open: "10:00 AM", close: "6:00 PM", closed: false },
    friday: { open: "", close: "", closed: true },
    saturday: { open: "9:00 AM", close: "1:00 PM", closed: false },
    sunday: { open: "", close: "", closed: true },
  },
  
  // Social
  social: {
    facebook: "https://www.facebook.com/smilesavers32",
    instagram: "https://www.instagram.com/smilesavers",
    google: "https://g.page/smilesavers",
  },
  
  // Google Maps
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3202+53rd+Place%2C+Woodside%2C+NY+11377!5e0!3m2!1sen!2sus!4v1",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=3202+53rd+Place+Woodside+NY+11377",
} as const;

// Extended Service Areas with Local SEO Data (5-mile radius from Woodside, NY 11377)
export const SERVICE_AREAS = [
  { name: "Woodside", zip: "11377", primary: true, distance: 0, spanishSpeakingPercent: 42, population: 89000, searchVolume: "medium" as const },
  { name: "Sunnyside", zip: "11104", primary: false, distance: 0.8, spanishSpeakingPercent: 38, population: 63000, searchVolume: "high" as const },
  { name: "Jackson Heights", zip: "11372", primary: false, distance: 1.2, spanishSpeakingPercent: 58, population: 108000, searchVolume: "high" as const },
  { name: "Elmhurst", zip: "11373", primary: false, distance: 1.5, spanishSpeakingPercent: 45, population: 109000, searchVolume: "high" as const },
  { name: "Corona", zip: "11368", primary: false, distance: 2.0, spanishSpeakingPercent: 68, population: 109000, searchVolume: "high" as const },
  { name: "Astoria", zip: "11105", primary: false, distance: 2.5, spanishSpeakingPercent: 28, population: 154000, searchVolume: "high" as const },
  { name: "Long Island City", zip: "11101", primary: false, distance: 2.3, spanishSpeakingPercent: 22, population: 58000, searchVolume: "high" as const },
  { name: "Maspeth", zip: "11378", primary: false, distance: 2.0, spanishSpeakingPercent: 25, population: 32000, searchVolume: "low" as const },
  { name: "Middle Village", zip: "11379", primary: false, distance: 2.5, spanishSpeakingPercent: 18, population: 38000, searchVolume: "low" as const },
  { name: "Rego Park", zip: "11374", primary: false, distance: 2.8, spanishSpeakingPercent: 15, population: 45000, searchVolume: "medium" as const },
  { name: "Forest Hills", zip: "11375", primary: false, distance: 3.2, spanishSpeakingPercent: 12, population: 77000, searchVolume: "high" as const },
];

// Insurance Plans Accepted
export const INSURANCE_PLANS = [
  // PPO Plans
  { name: "Delta Dental", type: "PPO", logo: "/images/insurance/delta.png" },
  { name: "Cigna", type: "PPO", logo: "/images/insurance/cigna.png" },
  { name: "Aetna", type: "PPO", logo: "/images/insurance/aetna.png" },
  { name: "MetLife", type: "PPO", logo: "/images/insurance/metlife.png" },
  { name: "Guardian", type: "PPO", logo: "/images/insurance/guardian.png" },
  { name: "United Healthcare", type: "PPO", logo: "/images/insurance/uhc.png" },
  { name: "Blue Cross Blue Shield", type: "PPO", logo: "/images/insurance/bcbs.png" },
  { name: "Humana", type: "PPO", logo: "/images/insurance/humana.png" },
  // State Programs
  { name: "Medicaid", type: "State", logo: "/images/insurance/medicaid.png" },
  { name: "Child Health Plus", type: "State", logo: "/images/insurance/childhealth.png" },
] as const;

// Payment Options
export const PAYMENT_OPTIONS = [
  { name: "Cash", icon: "banknote" },
  { name: "Credit Card", icon: "credit-card", details: "Visa, MasterCard, American Express, Discover" },
  { name: "Debit Card", icon: "card" },
  { name: "CareCredit", icon: "heart", details: "0% financing available for qualified patients" },
  { name: "Payment Plans", icon: "calendar", details: "Flexible in-house payment plans" },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { href: "/", label: "Home", labelEs: "Inicio", labelZh: "首页" },
  { href: "/services", label: "Services", labelEs: "Servicios", labelZh: "服务" },
  { href: "/about", label: "About Us", labelEs: "Sobre Nosotros", labelZh: "关于我们" },
  { href: "/new-patients", label: "New Patients", labelEs: "Nuevos Pacientes", labelZh: "新患者" },
  { href: "/insurance", label: "Insurance", labelEs: "Seguro", labelZh: "保险" },
  { href: "/faq", label: "FAQ", labelEs: "Preguntas", labelZh: "常见问题" },
  { href: "/contact", label: "Contact", labelEs: "Contacto", labelZh: "联系我们" },
] as const;

// Mobile Bottom Nav Links
export const MOBILE_NAV_LINKS: Array<{
  href: string;
  label: string;
  labelEs: string;
  labelZh: string;
  icon: string;
  isCall?: boolean;
}> = [
  { href: "/", label: "Home", labelEs: "Inicio", labelZh: "首页", icon: "home" },
  { href: "/services", label: "Services", labelEs: "Servicios", labelZh: "服务", icon: "stethoscope" },
  { href: "/about", label: "About", labelEs: "Nosotros", labelZh: "关于", icon: "users" },
  { href: "/contact", label: "Contact", labelEs: "Contacto", labelZh: "联系", icon: "map-pin" },
  { href: `tel:${PRACTICE_INFO.phoneFormatted}`, label: "Call", labelEs: "Llamar", labelZh: "电话", icon: "phone", isCall: true },
];

// Services Data
export const SERVICES = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    nameEs: "Odontología General",
    nameZh: "普通牙科",
    shortDesc: "Comprehensive care for your entire family",
    shortDescEs: "Atención integral para toda su familia",
    shortDescZh: "为您全家提供全面护理",
    icon: "heart-pulse",
    image: "/images/services/general.jpg",
    featured: true,
    description: "Our general dentistry services form the foundation of excellent oral health. We provide comprehensive dental care including routine cleanings, examinations, fillings, and preventive treatments designed to keep your smile healthy for years to come. Our experienced team uses the latest techniques and technology to ensure comfortable, effective treatments for patients of all ages.",
    services: [
      "Comprehensive Dental Exams",
      "Professional Teeth Cleaning",
      "Dental Fillings (Tooth-Colored)",
      "Root Canal Therapy",
      "Tooth Extractions",
      "Fluoride Treatments",
      "Dental Sealants",
      "Oral Cancer Screenings",
      "Gum Disease Treatment",
      "Night Guards & Sports Guards",
    ],
    benefits: [
      "Prevent serious dental problems",
      "Maintain healthy teeth and gums",
      "Early detection of oral health issues",
      "Personalized treatment plans",
      "Comfortable, stress-free experience",
    ],
    faqs: [
      {
        q: "How often should I visit the dentist?",
        a: "We recommend visiting every 6 months for routine check-ups and cleanings. However, some patients may need more frequent visits based on their oral health needs.",
      },
      {
        q: "What happens during a dental exam?",
        a: "During your exam, we check for cavities, gum disease, oral cancer, and other issues. We also review your dental X-rays and discuss any concerns you may have.",
      },
    ],
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    nameEs: "Odontología Cosmética",
    nameZh: "美容牙科",
    shortDesc: "Transform your smile with expert care",
    shortDescEs: "Transforme su sonrisa con atención experta",
    shortDescZh: "专业护理，焕发笑容",
    icon: "sparkles",
    image: "/images/services/cosmetic.jpg",
    featured: true,
    description: "Achieve the beautiful smile you've always wanted with our comprehensive cosmetic dentistry services. From professional teeth whitening to complete smile makeovers, our skilled team combines artistry with advanced dental techniques to deliver stunning, natural-looking results that boost your confidence.",
    services: [
      "Professional Teeth Whitening",
      "Porcelain Veneers",
      "Dental Bonding",
      "Smile Makeovers",
      "Gum Contouring",
      "Tooth Reshaping",
      "Full Mouth Reconstruction",
      "Tooth-Colored Fillings",
    ],
    benefits: [
      "Enhanced self-confidence",
      "Natural-looking results",
      "Long-lasting improvements",
      "Personalized smile design",
      "Advanced whitening technology",
    ],
    faqs: [
      {
        q: "How long does teeth whitening last?",
        a: "Professional whitening can last 1-3 years depending on your habits. Touch-up treatments and avoiding staining foods can extend results.",
      },
      {
        q: "Are veneers right for me?",
        a: "Veneers are ideal for correcting chips, gaps, stains, or misshapen teeth. Schedule a consultation to discuss your options.",
      },
    ],
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    nameEs: "Implantes Dentales",
    nameZh: "种植牙",
    shortDesc: "Permanent solution for missing teeth",
    shortDescEs: "Solución permanente para dientes perdidos",
    shortDescZh: "缺牙的永久解决方案",
    icon: "pin",
    image: "/images/services/implants.jpg",
    featured: true,
    description: "Dental implants are the gold standard for replacing missing teeth, offering a permanent solution that looks, feels, and functions like natural teeth. Our experienced implant team uses state-of-the-art technology and techniques to restore your smile with precision and care.",
    services: [
      "Single Tooth Implants",
      "Multiple Teeth Implants",
      "Full Arch Implants (All-on-4)",
      "Implant-Supported Dentures",
      "Bone Grafting",
      "Sinus Lift Procedures",
      "Same-Day Implants",
      "Mini Dental Implants",
    ],
    benefits: [
      "Permanent tooth replacement",
      "Preserves jawbone health",
      "Natural look and feel",
      "No impact on adjacent teeth",
      "Improved chewing ability",
    ],
    faqs: [
      {
        q: "Am I a candidate for dental implants?",
        a: "Most adults with good general health are candidates. We'll evaluate your bone density and oral health during a consultation.",
      },
      {
        q: "How long do implants last?",
        a: "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years.",
      },
    ],
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    nameEs: "Blanqueamiento Dental",
    nameZh: "牙齿美白",
    shortDesc: "Bright, white smiles in just one visit",
    shortDescEs: "Sonrisas brillantes en una sola visita",
    shortDescZh: "一次就诊，笑容更亮白",
    icon: "sun",
    image: "/images/services/whitening.jpg",
    featured: true,
    description: "Professional teeth whitening is one of the most popular cosmetic dental treatments, and for good reason. Our advanced whitening systems can dramatically brighten your smile in just one visit, removing years of stains from coffee, tea, wine, and more.",
    services: [
      "In-Office Power Whitening",
      "Take-Home Whitening Kits",
      "Laser Teeth Whitening",
      "Deep Stain Removal",
      "Touch-Up Treatments",
    ],
    benefits: [
      "Results in as little as 1 hour",
      "Up to 8 shades whiter",
      "Safe for enamel",
      "Long-lasting results",
      "Customized treatment",
    ],
    faqs: [
      {
        q: "Is teeth whitening safe?",
        a: "Yes, professional whitening is completely safe when performed by dental professionals. We protect your gums and use tested products.",
      },
      {
        q: "Will whitening cause sensitivity?",
        a: "Some patients experience temporary sensitivity. We offer desensitizing treatments and can adjust the strength of whitening agents.",
      },
    ],
  },
  {
    id: "dental-veneers",
    name: "Dental Veneers",
    nameEs: "Carillas Dentales",
    nameZh: "牙贴面",
    shortDesc: "Perfect smiles with custom veneers",
    shortDescEs: "Sonrisas perfectas con carillas personalizadas",
    shortDescZh: "定制贴面，完美笑容",
    icon: "layout-template",
    image: "/images/services/veneers.jpg",
    featured: false,
    description: "Porcelain veneers are ultra-thin shells that cover the front surface of your teeth to create a flawless smile. Custom-crafted to match your natural teeth, veneers can correct multiple cosmetic issues at once, including chips, gaps, stains, and minor misalignment.",
    services: [
      "Porcelain Veneers",
      "Composite Veneers",
      "Lumineers",
      "Prepless Veneers",
      "Smile Design Consultation",
    ],
    benefits: [
      "Transform your entire smile",
      "Stain-resistant porcelain",
      "Natural appearance",
      "Durable (10-20 years)",
      "Minimal tooth preparation",
    ],
    faqs: [
      {
        q: "How many veneers do I need?",
        a: "Most patients get 6-8 veneers for their visible smile. During your consultation, we'll discuss the optimal number for your goals.",
      },
      {
        q: "Do veneers damage natural teeth?",
        a: "Modern veneers require minimal enamel removal (about 0.5mm). This preserves most of your natural tooth structure.",
      },
    ],
  },
  {
    id: "emergency-dentistry",
    name: "Emergency Dentistry",
    nameEs: "Odontología de Emergencia",
    nameZh: "紧急牙科",
    shortDesc: "Same-day emergency dental care",
    shortDescEs: "Atención dental de emergencia el mismo día",
    shortDescZh: "当日紧急牙科护理",
    icon: "alert-circle",
    image: "/images/services/emergency.jpg",
    featured: true,
    description: "Dental emergencies can happen at any time. That's why we offer same-day emergency appointments to address urgent dental problems quickly. Whether you're experiencing severe pain, a knocked-out tooth, or a broken restoration, our team is ready to help.",
    services: [
      "Toothache Relief",
      "Knocked-Out Tooth Treatment",
      "Broken or Chipped Teeth Repair",
      "Lost Filling or Crown Replacement",
      "Abscess Treatment",
      "Emergency Extractions",
      "Dental Trauma Care",
      "After-Hours Emergency Care",
    ],
    benefits: [
      "Same-day appointments",
      "Pain relief quickly",
      "Save damaged teeth",
      "Prevent complications",
      "Compassionate care",
    ],
    faqs: [
      {
        q: "What qualifies as a dental emergency?",
        a: "Severe pain, knocked-out teeth, uncontrolled bleeding, significant swelling, or dental trauma are all emergencies. Call us immediately.",
      },
      {
        q: "What should I do if a tooth is knocked out?",
        a: "Handle the tooth by the crown (not root), rinse gently, place in milk or saliva, and get to us within 30 minutes for the best chance of saving it.",
      },
    ],
  },
  {
    id: "invisalign",
    name: "Invisalign",
    nameEs: "Invisalign",
    nameZh: "隐适美",
    shortDesc: "Clear aligners for straighter teeth",
    shortDescEs: "Alineadores invisibles para dientes más rectos",
    shortDescZh: "隐形矫正，牙齿更整齐",
    icon: "align-center",
    image: "/images/services/invisalign.jpg",
    featured: true,
    description: "Invisalign offers a modern, discreet way to straighten your teeth without traditional metal braces. Using a series of custom-made, virtually invisible aligners, we can gradually shift your teeth into their ideal position, giving you the confident smile you deserve.",
    services: [
      "Invisalign Full",
      "Invisalign Lite",
      "Invisalign Teen",
      "Invisalign Express",
      "Retainers",
    ],
    benefits: [
      "Nearly invisible",
      "Removable for eating/cleaning",
      "More comfortable than braces",
      "Fewer office visits",
      "Predictable results",
    ],
    faqs: [
      {
        q: "How long does Invisalign treatment take?",
        a: "Treatment typically takes 12-18 months, though simpler cases may be completed in as little as 6 months.",
      },
      {
        q: "How often do I wear the aligners?",
        a: "For best results, wear your aligners 20-22 hours per day, removing them only for eating and brushing.",
      },
    ],
  },
  {
    id: "root-canal",
    name: "Root Canal Therapy",
    nameEs: "Tratamiento de Conducto",
    nameZh: "根管治疗",
    shortDesc: "Save your natural tooth",
    shortDescEs: "Salve su diente natural",
    shortDescZh: "保留天然牙齿",
    icon: "activity",
    image: "/images/services/rootcanal.jpg",
    featured: false,
    description: "Root canal therapy is a highly successful procedure that saves millions of teeth each year. Despite its reputation, modern root canals are virtually painless and can relieve the severe pain caused by infected tooth pulp while preserving your natural tooth.",
    services: [
      "Standard Root Canal",
      "Retreatment",
      "Apicoectomy",
      "Pulp Capping",
      "Emergency Root Canal",
    ],
    benefits: [
      "Relieve severe pain",
      "Save natural tooth",
      "Prevent spread of infection",
      "Restore normal biting",
      "Long-term solution",
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "Modern root canals are no more uncomfortable than getting a filling. We use effective anesthesia and can offer sedation options.",
      },
      {
        q: "How long does recovery take?",
        a: "Most patients return to normal activities the next day. Some sensitivity for a few days is normal.",
      },
    ],
  },
  {
    id: "dental-crowns",
    name: "Dental Crowns & Bridges",
    nameEs: "Coronas y Puentes Dentales",
    nameZh: "牙冠和牙桥",
    shortDesc: "Restore damaged teeth beautifully",
    shortDescEs: "Restaure dientes dañados bellamente",
    shortDescZh: "完美修复受损牙齿",
    icon: "crown",
    image: "/images/services/crowns.jpg",
    featured: false,
    description: "Dental crowns and bridges are versatile restorations that can repair damaged teeth, replace missing teeth, and restore your smile's function and beauty. Our high-quality porcelain restorations are custom-made to match your natural teeth perfectly.",
    services: [
      "Porcelain Crowns",
      "Ceramic Crowns",
      "Same-Day CEREC Crowns",
      "Traditional Dental Bridges",
      "Implant-Supported Bridges",
      "Maryland Bridges",
      "Cantilever Bridges",
    ],
    benefits: [
      "Natural appearance",
      "Durable (10-15+ years)",
      "Restore chewing function",
      "Protect weakened teeth",
      "Prevent teeth shifting",
    ],
    faqs: [
      {
        q: "How long does a crown last?",
        a: "With proper care, dental crowns typically last 10-15 years or longer. Good oral hygiene and regular check-ups help extend their lifespan.",
      },
      {
        q: "What's the difference between a crown and bridge?",
        a: "A crown covers a single damaged tooth, while a bridge replaces one or more missing teeth by anchoring to adjacent teeth or implants.",
      },
    ],
  },
  {
    id: "teeth-cleaning",
    name: "Teeth Cleaning",
    nameEs: "Limpieza Dental",
    nameZh: "洁牙",
    shortDesc: "Professional cleanings for healthy gums",
    shortDescEs: "Limpiezas profesionales para encías sanas",
    shortDescZh: "专业洁牙，牙龈健康",
    icon: "sparkle",
    image: "/images/services/cleaning.jpg",
    featured: false,
    description: "Professional teeth cleaning is the cornerstone of preventive dental care. Our skilled hygienists use advanced techniques and tools to remove plaque, tartar, and stains that regular brushing can't reach, helping you maintain optimal oral health.",
    services: [
      "Routine Dental Cleaning",
      "Deep Cleaning (Scaling & Root Planing)",
      "Periodontal Maintenance",
      "Ultrasonic Scaling",
      "Air Polishing",
    ],
    benefits: [
      "Prevent gum disease",
      "Remove stubborn stains",
      "Fresh breath",
      "Early problem detection",
      "Maintain overall health",
    ],
    faqs: [
      {
        q: "Does teeth cleaning hurt?",
        a: "Most patients find cleanings comfortable. If you have sensitive teeth or gum disease, we can use numbing gel or local anesthesia.",
      },
      {
        q: "How often should I get my teeth cleaned?",
        a: "We recommend every 6 months. Patients with gum disease may need more frequent cleanings (every 3-4 months).",
      },
    ],
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    nameEs: "Odontología Pediátrica",
    nameZh: "儿童牙科",
    shortDesc: "Gentle care for little smiles",
    shortDescEs: "Atención gentil para pequeñas sonrisas",
    shortDescZh: "温柔呵护小朋友的笑容",
    icon: "baby",
    image: "/images/services/pediatric.jpg",
    featured: false,
    description: "We love treating young patients! Our pediatric dental services are designed to make dental visits fun and stress-free for children. We focus on prevention, education, and creating positive experiences that help children develop healthy habits that last a lifetime.",
    services: [
      "Children's Dental Exams",
      "Fluoride Treatments",
      "Dental Sealants",
      "Cavity Fillings",
      "Space Maintainers",
      "Emergency Pediatric Care",
      "Thumb-Sucking Intervention",
      "Early Orthodontic Evaluation",
    ],
    benefits: [
      "Child-friendly environment",
      "Prevent early cavities",
      "Build healthy habits",
      "Gentle, patient approach",
      "Positive dental experiences",
    ],
    faqs: [
      {
        q: "When should my child first visit the dentist?",
        a: "The American Dental Association recommends a first visit by age 1 or within 6 months of the first tooth appearing.",
      },
      {
        q: "How can I prepare my child for their visit?",
        a: "Talk positively about the dentist, read books about dental visits, and avoid using scary words. We'll make it fun!",
      },
    ],
  },
] as const;

// Team Members
export const TEAM_MEMBERS = [
  {
    id: "dr-chen",
    name: "Dr. Sarah Chen, DDS",
    nameZh: "陈医生",
    role: "Lead Dentist",
    roleEs: "Dentista Principal",
    roleZh: "主治医师",
    image: "/images/dentist-1.png",
    bio: "Dr. Sarah Chen brings over 15 years of experience in comprehensive dental care. A graduate of NYU College of Dentistry, she specializes in cosmetic dentistry and dental implants. Dr. Chen is known for her gentle approach and commitment to patient comfort.",
    bioEs: "La Dra. Sarah Chen aporta más de 15 años de experiencia en atención dental integral. Graduada de NYU College of Dentistry, se especializa en odontología cosmética e implantes dentales.",
    bioZh: "陈医生在综合牙科护理方面拥有超过15年的经验。她毕业于纽约大学牙科学院，专攻美容牙科和种植牙。",
    specialties: ["Cosmetic Dentistry", "Dental Implants", "Invisalign"],
    education: ["NYU College of Dentistry", "Advanced Implant Training"],
    languages: ["English", "Chinese (Mandarin)", "Spanish"],
  },
  {
    id: "dr-martinez",
    name: "Dr. Miguel Martinez, DMD",
    nameZh: "马丁内斯医生",
    role: "Associate Dentist",
    roleEs: "Dentista Asociado",
    roleZh: "助理医师",
    image: "/images/dentist-2.png",
    bio: "Dr. Martinez is passionate about providing quality dental care to the diverse Woodside community. With expertise in preventive and restorative dentistry, he focuses on helping patients achieve optimal oral health through education and personalized treatment plans.",
    bioEs: "Al Dr. Martínez le apasiona proporcionar atención dental de calidad a la diversa comunidad de Woodside.",
    bioZh: "马丁内斯医生热衷于为伍德赛德的多元化社区提供优质牙科护理。",
    specialties: ["General Dentistry", "Root Canal Therapy", "Pediatric Dentistry"],
    education: ["Columbia University College of Dental Medicine"],
    languages: ["English", "Spanish"],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Maria G.",
    nameZh: "玛丽亚",
    location: "Woodside, NY",
    rating: 5,
    text: "I've been coming to Smile Savers for years. Dr. Chen and her team are amazing! They always make me feel comfortable and explain everything clearly. Highly recommend!",
    textEs: "He estado viniendo a Smile Savers durante años. ¡La Dra. Chen y su equipo son increíbles! Siempre me hacen sentir cómoda.",
    textZh: "我来Smile Savers很多年了。陈医生和她的团队太棒了！他们总是让我感到舒适，清楚解释一切。强烈推荐！",
    service: "General Dentistry",
    date: "2024-03-15",
  },
  {
    id: 2,
    name: "James L.",
    nameZh: "詹姆斯",
    location: "Sunnyside, NY",
    rating: 5,
    text: "Best dental experience ever! I was terrified of dentists, but the team here made me feel so at ease. My Invisalign treatment was smooth and the results are fantastic.",
    textEs: "¡La mejor experiencia dental! Tenía terror a los dentistas, pero el equipo me hizo sentir tan tranquilo.",
    textZh: "有史以来最好的牙科体验！我以前害怕看牙医，但这里的团队让我感到非常安心。我的隐适美治疗很顺利，效果非常好。",
    service: "Invisalign",
    date: "2024-02-20",
  },
  {
    id: 3,
    name: "Wei Z.",
    nameZh: "张伟",
    location: "Jackson Heights, NY",
    rating: 5,
    text: "终于找到一家可以说中文的牙医诊所！陈医生非常专业， staff也很友善。强烈推荐给需要中文服务的华人朋友！",
    textEs: "Found a dental office that speaks Chinese! Dr. Chen is very professional and the staff is friendly.",
    textZh: "终于找到一家可以说中文的牙医诊所！陈医生非常专业，staff也很友善。强烈推荐给需要中文服务的华人朋友！",
    service: "Dental Implants",
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Carmen R.",
    nameZh: "卡门",
    location: "Elmhurst, NY",
    rating: 5,
    text: "¡Excelente servicio! Todo el equipo habla español y me explicaron todo mi tratamiento perfectamente. Mis implantes quedaron perfectos.",
    textEs: "¡Excelente servicio! Todo el equipo habla español y me explicaron todo mi tratamiento perfectamente. Mis implantes quedaron perfectos.",
    textZh: "Excellent service! The whole team speaks Spanish and explained my treatment perfectly. My implants turned out perfect.",
    service: "Dental Implants",
    date: "2024-03-01",
  },
] as const;

// FAQ Categories and Questions
export const FAQ_CATEGORIES = [
  { id: "general", name: "General Questions", nameEs: "Preguntas Generales", nameZh: "一般问题" },
  { id: "appointments", name: "Appointments & Scheduling", nameEs: "Citas y Horarios", nameZh: "预约与时间" },
  { id: "insurance", name: "Insurance & Payment", nameEs: "Seguro y Pago", nameZh: "保险与付款" },
  { id: "services", name: "Dental Services", nameEs: "Servicios Dentales", nameZh: "牙科服务" },
  { id: "emergency", name: "Emergency Care", nameEs: "Atención de Emergencia", nameZh: "紧急护理" },
] as const;

export const FAQS = [
  // General Questions
  {
    category: "general",
    question: "What are your office hours?",
    questionEs: "¿Cuáles son sus horarios de oficina?",
    questionZh: "你们的营业时间是什么？",
    answer: "We are open Monday through Thursday from 10:00 AM to 5:00 PM (Thursday until 6:00 PM), and Saturday from 9:00 AM to 1:00 PM. We are closed on Fridays and Sundays.",
    answerEs: "Estamos abiertos de lunes a jueves de 10:00 AM a 5:00 PM (jueves hasta las 6:00 PM) y sábado de 9:00 AM a 1:00 PM. Cerramos viernes y domingos.",
    answerZh: "我们周一至周四上午10:00至下午5:00营业（周四至下午6:00），周六上午9:00至下午1:00。周五和周日休息。",
  },
  {
    category: "general",
    question: "Do you accept new patients?",
    questionEs: "¿Aceptan nuevos pacientes?",
    questionZh: "你们接受新患者吗？",
    answer: "Yes! We are always welcoming new patients to our practice. Call us at (718) 956-8400 or book online to schedule your first appointment.",
    answerEs: "¡Sí! Siempre estamos dando la bienvenida a nuevos pacientes. Llámenos al (718) 956-8400 o reserve en línea.",
    answerZh: "是的！我们随时欢迎新患者。请致电(718) 956-8400或在线预约您的首次就诊。",
  },
  {
    category: "general",
    question: "What languages do you speak?",
    questionEs: "¿Qué idiomas hablan?",
    questionZh: "你们说什么语言？",
    answer: "Our team speaks English, Spanish, and Chinese (Mandarin & Cantonese). We're proud to serve the diverse Woodside community in their preferred language.",
    answerEs: "Nuestro equipo habla inglés, español y chino (mandarín y cantonés). Estamos orgullosos de servir a la diversa comunidad de Woodside.",
    answerZh: "我们的团队讲英语、西班牙语和中文（普通话和粤语）。我们很自豪能为伍德赛德的多元化社区服务。",
  },
  // Appointments
  {
    category: "appointments",
    question: "How do I schedule an appointment?",
    questionEs: "¿Cómo programo una cita?",
    questionZh: "如何预约？",
    answer: "You can schedule an appointment by calling us at (718) 956-8400, using our online booking form, or visiting our office in person. We recommend booking in advance for routine visits.",
    answerEs: "Puede programar una cita llamándonos al (718) 956-8400, usando nuestro formulario en línea, o visitando nuestra oficina.",
    answerZh: "您可以通过致电(718) 956-8400、使用我们的在线预约表格或亲自访问我们的办公室来预约。",
  },
  {
    category: "appointments",
    question: "What should I bring to my first appointment?",
    questionEs: "¿Qué debo llevar a mi primera cita?",
    questionZh: "第一次就诊应该带什么？",
    answer: "Please bring a valid ID, insurance card (if applicable), list of current medications, and any previous dental records or X-rays if available. Arrive 15 minutes early to complete paperwork.",
    answerEs: "Por favor traiga una identificación válida, tarjeta de seguro (si aplica), lista de medicamentos actuales, y registros dentales previos.",
    answerZh: "请携带有效身份证件、保险卡（如适用）、当前用药清单，以及任何以前的牙科记录或X光片。",
  },
  {
    category: "appointments",
    question: "Do you offer same-day appointments?",
    questionEs: "¿Ofrecen citas el mismo día?",
    questionZh: "你们提供当日预约吗？",
    answer: "Yes, we offer same-day appointments for dental emergencies. For routine care, we typically can accommodate within a few days to a week.",
    answerEs: "Sí, ofrecemos citas el mismo día para emergencias dentales. Para atención rutinaria, generalmente podemos acomodar en pocos días.",
    answerZh: "是的，我们为牙科急诊提供当日预约。对于常规护理，我们通常可以在几天到一周内安排。",
  },
  // Insurance
  {
    category: "insurance",
    question: "What insurance plans do you accept?",
    questionEs: "¿Qué planes de seguro aceptan?",
    questionZh: "你们接受哪些保险计划？",
    answer: "We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, Guardian, and many more. We also accept Medicaid and Child Health Plus. Contact us to verify your specific coverage.",
    answerEs: "Aceptamos la mayoría de los planes de seguro dental importantes incluyendo Delta Dental, Cigna, Aetna, MetLife, Guardian y muchos más.",
    answerZh: "我们接受大多数主要牙科保险计划，包括Delta Dental、Cigna、Aetna、MetLife、Guardian等。我们也接受Medicaid和Child Health Plus。",
  },
  {
    category: "insurance",
    question: "Do you offer payment plans?",
    questionEs: "¿Ofrecen planes de pago?",
    questionZh: "你们提供付款计划吗？",
    answer: "Yes! We offer flexible payment plans and accept CareCredit for financing. We also provide an in-house membership plan for patients without insurance.",
    answerEs: "¡Sí! Ofrecemos planes de pago flexibles y aceptamos CareCredit para financiamiento. También proporcionamos un plan de membresía.",
    answerZh: "是的！我们提供灵活的付款计划，并接受CareCredit融资。我们还为没有保险的患者提供内部会员计划。",
  },
  {
    category: "insurance",
    question: "What if I don't have dental insurance?",
    questionEs: "¿Qué pasa si no tengo seguro dental?",
    questionZh: "如果没有牙科保险怎么办？",
    answer: "We offer an affordable in-house membership plan that provides discounts on preventive and restorative care. We also accept CareCredit and offer payment plans to make dental care accessible for everyone.",
    answerEs: "Ofrecemos un plan de membresía interno asequible que proporciona descuentos en atención preventiva y restauradora.",
    answerZh: "我们提供实惠的内部会员计划，为预防和修复护理提供折扣。我们还接受CareCredit并提供付款计划。",
  },
  // Services
  {
    category: "services",
    question: "How often should I get my teeth cleaned?",
    questionEs: "¿Con qué frecuencia debo limpiar mis dientes?",
    questionZh: "应该多久洗一次牙？",
    answer: "We recommend professional teeth cleaning every 6 months for most patients. Patients with gum disease may need more frequent cleanings (every 3-4 months) to maintain their oral health.",
    answerEs: "Recomendamos una limpieza dental profesional cada 6 meses para la mayoría de los pacientes.",
    answerZh: "我们建议大多数患者每6个月进行一次专业洁牙。患有牙龈疾病的患者可能需要更频繁的洁牙（每3-4个月）。",
  },
  {
    category: "services",
    question: "Is teeth whitening safe?",
    questionEs: "¿Es seguro el blanqueamiento dental?",
    questionZh: "牙齿美白安全吗？",
    answer: "Yes, professional teeth whitening is completely safe when performed under dental supervision. Our whitening treatments are FDA-approved and won't damage your enamel when used as directed.",
    answerEs: "Sí, el blanqueamiento dental profesional es completamente seguro cuando se realiza bajo supervisión dental.",
    answerZh: "是的，在牙科监督下进行的专业牙齿美白是完全安全的。我们的美白治疗获得FDA批准，按指示使用不会损害牙釉质。",
  },
  {
    category: "services",
    question: "How long do dental implants last?",
    questionEs: "¿Cuánto tiempo duran los implantes dentales?",
    questionZh: "种植牙能使用多久？",
    answer: "With proper care and maintenance, dental implants can last a lifetime. The crown on top may need replacement after 10-15 years due to normal wear, but the implant itself is designed to be permanent.",
    answerEs: "Con el cuidado y mantenimiento adecuados, los implantes dentales pueden durar toda la vida.",
    answerZh: "只要适当护理和维护，种植牙可以使用一生。顶部的牙冠可能因正常磨损需要在10-15年后更换，但种植体本身设计为永久性。",
  },
  // Emergency
  {
    category: "emergency",
    question: "What should I do in a dental emergency?",
    questionEs: "¿Qué debo hacer en una emergencia dental?",
    questionZh: "牙科急诊应该怎么办？",
    answer: "Call us immediately at (718) 956-8400. For severe pain, bleeding, or knocked-out teeth, we offer same-day emergency appointments. If a tooth is knocked out, keep it moist in milk and get to us within 30 minutes.",
    answerEs: "Llámenos inmediatamente al (718) 956-8400. Para dolor severo, sangrado o dientes arrancados, ofrecemos citas de emergencia el mismo día.",
    answerZh: "请立即致电(718) 956-8400。对于严重疼痛、出血或牙齿脱落，我们提供当日急诊预约。如果牙齿脱落，请将其保存在牛奶中并在30分钟内到达。",
  },
  {
    category: "emergency",
    question: "What counts as a dental emergency?",
    questionEs: "¿Qué se considera una emergencia dental?",
    questionZh: "什么情况算牙科急诊？",
    answer: "Dental emergencies include severe toothache, knocked-out teeth, broken teeth, lost fillings or crowns, dental abscesses, uncontrolled bleeding, and significant facial swelling. When in doubt, call us.",
    answerEs: "Las emergencias dentales incluyen dolor de muelas severo, dientes arrancados, dientes rotos, empastes o coronas perdidas, abscesos dentales.",
    answerZh: "牙科急诊包括严重的牙痛、牙齿脱落、牙齿断裂、填充物或牙冠脱落、牙科脓肿、无法控制的出血和明显的面部肿胀。",
  },
] as const;

// Voice Search Optimized FAQs (40-60 word direct answers for AI Overview)
export const VOICE_SEARCH_FAQS = [
  {
    question: "Where is Smile Savers dental office located?",
    questionEs: "¿Dónde está ubicada la oficina dental Smile Savers?",
    answer: "Smile Savers is located at 3202 53rd Place, Woodside, NY 11377, in the heart of Queens, New York. We're easily accessible by the 7 train at Woodside Station.",
    answerEs: "Smile Savers está ubicado en 3202 53rd Place, Woodside, NY 11377, en el corazón de Queens, Nueva York. Somos fácilmente accesibles por el tren 7 en la estación Woodside.",
  },
  {
    question: "Does Smile Savers accept Medicaid?",
    questionEs: "¿Smile Savers acepta Medicaid?",
    answer: "Yes, Smile Savers accepts Medicaid and Child Health Plus. We also accept most major dental insurance plans including Delta Dental, Cigna, Aetna, and MetLife.",
    answerEs: "Sí, Smile Savers acepta Medicaid y Child Health Plus. También aceptamos la mayoría de los planes de seguro dental importantes.",
  },
  {
    question: "Is there an emergency dentist near me in Queens?",
    questionEs: "¿Hay un dentista de emergencia cerca de mí en Queens?",
    answer: "Yes, Smile Savers in Woodside offers same-day emergency dental appointments for severe toothaches, knocked-out teeth, and dental trauma. Call (718) 956-8400 immediately.",
    answerEs: "Sí, Smile Savers en Woodside ofrece citas de emergencia el mismo día para dolores de muelas severos y trauma dental. Llame al (718) 956-8400.",
  },
  {
    question: "Do you have Spanish speaking dentists?",
    questionEs: "¿Tienen dentistas que hablan español?",
    answer: "Yes, our dental team speaks English, Spanish, and Chinese (Mandarin and Cantonese). We're proud to serve the diverse Queens community in their preferred language.",
    answerEs: "Sí, nuestro equipo dental habla inglés, español y chino. Estamos orgullosos de servir a la diversa comunidad de Queens en su idioma preferido.",
  },
  {
    question: "How much do dental implants cost?",
    questionEs: "¿Cuánto cuestan los implantes dentales?",
    answer: "Dental implants typically cost between $3,000 and $6,000 per tooth. We accept most insurance plans and offer flexible payment options including CareCredit financing.",
    answerEs: "Los implantes dentales generalmente cuestan entre $3,000 y $6,000 por diente. Aceptamos la mayoría de los seguros y ofrecemos opciones de pago flexibles.",
  },
];

// Featured Snippet Optimized Content Blocks
export const FEATURED_SNIPPETS = {
  dentalImplants: {
    question: "What are dental implants?",
    answer: "Dental implants are titanium posts surgically placed into the jawbone to replace missing tooth roots. They provide a permanent foundation for replacement teeth that look, feel, and function like natural teeth.",
    benefits: [
      "Permanent tooth replacement solution",
      "Preserve jawbone and prevent bone loss",
      "No impact on adjacent teeth",
      "Natural look and feel",
      "Improved chewing ability",
    ],
  },
  invisalign: {
    question: "How does Invisalign work?",
    answer: "Invisalign uses a series of custom-made, virtually invisible aligners that gradually shift teeth into their ideal position. Each set of aligners is worn for 1-2 weeks before moving to the next set.",
    benefits: [
      "Nearly invisible appearance",
      "Removable for eating and cleaning",
      "More comfortable than metal braces",
      "Fewer dental visits required",
      "Predictable results with digital planning",
    ],
  },
  rootCanal: {
    question: "What is a root canal?",
    answer: "A root canal is a dental procedure that removes infected or damaged pulp tissue from inside a tooth, relieving pain and saving the natural tooth from extraction.",
    benefits: [
      "Relieves severe tooth pain",
      "Saves your natural tooth",
      "Prevents spread of infection",
      "Restores normal biting and chewing",
      "Long-term solution with proper care",
    ],
  },
} as const;

// SEO Meta Data
export const SEO_DATA = {
  home: {
    title: "Dentist in Woodside, NY | Smile Savers Creating Smiles",
    description: "Smile Savers Creating Smiles is your trusted dentist in Woodside, NY. We offer comprehensive dental services including implants, Invisalign, cosmetic dentistry, and emergency care. Se habla español. 讲中文. Call (718) 956-8400.",
    keywords: ["dentist woodside ny", "dental clinic woodside", "emergency dentist", "invisalign woodside", "dental implants queens", "cosmetic dentist nyc", "affordable dentist", "spanish speaking dentist", "chinese speaking dentist"],
  },
  services: {
    title: "Dental Services | Smile Savers Woodside, NY",
    description: "Comprehensive dental services in Woodside, NY. General dentistry, cosmetic treatments, dental implants, Invisalign, emergency care, and more. Accepting new patients. Call (718) 956-8400.",
    keywords: ["dental services woodside", "teeth whitening", "dental implants", "root canal", "invisalign", "veneers", "teeth cleaning"],
  },
  about: {
    title: "About Us | Meet Our Dental Team | Smile Savers Woodside",
    description: "Learn about Smile Savers Creating Smiles in Woodside, NY. Meet Dr. Chen and our experienced dental team dedicated to providing exceptional care to our community.",
    keywords: ["dentist woodside", "dental team", "dr chen dentist", "dental practice woodside ny"],
  },
  contact: {
    title: "Contact Us | Book Appointment | Smile Savers Woodside, NY",
    description: "Contact Smile Savers Creating Smiles in Woodside, NY. Call (718) 956-8400 or book online. Find our location, hours, and directions. We're here to help!",
    keywords: ["dentist contact woodside", "book dentist appointment", "dental office woodside ny"],
  },
  faq: {
    title: "Frequently Asked Questions | Smile Savers Woodside, NY",
    description: "Find answers to common questions about our dental services, insurance, appointments, and more. Smile Savers Creating Smiles in Woodside, NY.",
    keywords: ["dentist faq", "dental questions", "insurance questions dentist"],
  },
  newPatients: {
    title: "New Patients | What to Expect | Smile Savers Woodside, NY",
    description: "Welcome new patients! Learn what to expect at your first visit, download patient forms, and discover our new patient special. Call (718) 956-8400 to schedule.",
    keywords: ["new patient dentist", "first dentist visit", "patient forms", "new patient special woodside"],
  },
  insurance: {
    title: "Insurance & Payment Options | Smile Savers Woodside, NY",
    description: "We accept most dental insurance plans including Delta Dental, Cigna, and Medicaid. Learn about our payment options and in-house membership plan. Call (718) 956-8400.",
    keywords: ["dental insurance woodside", "medicaid dentist", "payment plans dental", "affordable dentist queens"],
  },
};

// Local Business Schema for SEO
export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": PRACTICE_INFO.name,
  "image": `${PRACTICE_INFO.website}/images/og-image.jpg`,
  "url": PRACTICE_INFO.website,
  "telephone": PRACTICE_INFO.phone,
  "email": PRACTICE_INFO.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": PRACTICE_INFO.address.street,
    "addressLocality": PRACTICE_INFO.address.city,
    "addressRegion": PRACTICE_INFO.address.state,
    "postalCode": PRACTICE_INFO.address.zip,
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.75,
    "longitude": -73.9,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday"],
      "opens": "10:00",
      "closes": "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "10:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00",
    },
  ],
  "priceRange": "$$",
  "areaServed": SERVICE_AREAS.map(a => a.name),
  "medicalSpecialty": ["General Dentistry", "Cosmetic Dentistry", "Implant Dentistry", "Pediatric Dentistry"],
  "availableLanguage": ["English", "Spanish", "Chinese"],
  "sameAs": [
    PRACTICE_INFO.social.facebook,
    PRACTICE_INFO.social.instagram,
  ],
} as const;
