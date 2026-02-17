# Smile Savers Creating Smiles

> Modern dental practice website for Smile Savers Creating Smiles in Woodside, NY

## About

This is the official website for **Smile Savers Creating Smiles**, a dental practice located in Woodside, Queens, New York. The website provides comprehensive information about dental services, team members, appointment booking, and patient resources.

## Practice Information

| | |
|---|---|
| **Address** | 3202 53rd Place, Woodside, NY 11377 |
| **Phone** | (718) 956-8400 |
| **Website** | https://smilesaversandassociates.com |

### Office Hours

| Day | Hours |
|-----|-------|
| Monday | 10:00 AM – 5:00 PM |
| Tuesday | 10:00 AM – 5:00 PM |
| Wednesday | 10:00 AM – 5:00 PM |
| Thursday | 10:00 AM – 6:00 PM |
| Friday | Closed |
| Saturday | 9:00 AM – 1:00 PM |
| Sunday | Closed |

## Features

### Design
- **Mobile-First**: Responsive design optimized for all devices
- **Modern UI**: Clean, professional healthcare aesthetic
- **Accessibility**: WCAG 2.1 compliant
- **Fast Loading**: Optimized images and code splitting

### Multi-Language Support
- English (Primary)
- Spanish (Español)
- Chinese (中文)

### HIPAA Compliance
- Secure contact forms with encryption notices
- Privacy policy and HIPAA notice
- Consent management
- Protected health information handling

### SEO Optimization
- Programmatic SEO for service pages
- Local SEO for Woodside, Queens, NYC
- Schema.org markup (LocalBusiness, FAQPage)
- OpenGraph and Twitter cards
- Semantic HTML structure

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services overview, testimonials |
| Services | `/services` | All dental services offered |
| Service Detail | `/services/[slug]` | Individual service information (11 pages) |
| About | `/about` | Practice history, team members |
| New Patients | `/new-patients` | First visit info, patient forms |
| Contact | `/contact` | Contact form, map, office hours |
| Insurance | `/insurance` | Accepted insurance, payment options |
| FAQ | `/faq` | Frequently asked questions |
| Privacy | `/privacy` | Privacy policy, HIPAA notice |

## Services Offered

1. General Dentistry
2. Cosmetic Dentistry
3. Dental Implants
4. Teeth Whitening
5. Dental Veneers
6. Emergency Dentistry
7. Invisalign
8. Root Canal Therapy
9. Dental Crowns & Bridges
10. Professional Teeth Cleaning
11. Pediatric Dentistry

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── public/
│   └── images/          # Static images
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── about/       # About page
│   │   ├── contact/     # Contact page
│   │   ├── faq/         # FAQ page
│   │   ├── insurance/   # Insurance page
│   │   ├── new-patients/# New patients page
│   │   ├── privacy/     # Privacy policy
│   │   ├── services/    # Services pages
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── dental/      # Practice-specific components
│   │   └── ui/          # Reusable UI components
│   ├── lib/
│   │   ├── constants.ts # Site configuration & data
│   │   ├── i18n.tsx     # Internationalization
│   │   └── utils.ts     # Utility functions
│   └── hooks/           # Custom React hooks
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Customization

### Practice Information

Edit `src/lib/constants.ts` to update:
- Practice name, address, phone
- Office hours
- Team members
- Services offered
- Insurance plans accepted
- Testimonials
- FAQ content

### Styling

The design system uses CSS custom properties defined in `src/app/globals.css`:

- **Primary**: Teal (#0d9488) - Healthcare trust
- **Secondary**: Navy (#334e68) - Professionalism  
- **Accent**: Coral/Orange (#f97316) - Call-to-action

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add `page.tsx` for the route
3. Update navigation in `src/lib/constants.ts`

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Deploy automatically on push

### Other Platforms

```bash
npm run build
```

The built output in `.next/` folder can be deployed to any Node.js hosting.

## Social Media

- **Facebook**: https://www.facebook.com/smilesavers32
- **Google Maps**: https://goo.gl/maps/xkbYTgQ56LQd18KJ7
- **Yelp**: https://www.yelp.com/biz/smile-savers-woodside-2

## License

© 2025 Smile Savers Creating Smiles. All rights reserved.

---

**Smile Savers Creating Smiles**  
3202 53rd Place, Woodside, NY 11377  
Phone: (718) 956-8400
