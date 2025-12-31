export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://skylyfe.tech";
const DEFAULT_OG_IMAGE = "/logo.png";

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: "Skylyfe Tech - Emerging Technology Services | AI, AR, IoT, E-commerce",
    description: "Skylyfe Technologies LLC delivers AI/ML, Spatial/AR, 3D printing, IoT/GPS, and e-commerce solutions. From vision to market—tech-powered entrepreneurship for bold brands.",
    keywords: "AI services, machine learning, augmented reality, 3D printing, IoT solutions, GPS tracking, Shopify development, emerging technology, tech consulting",
    canonicalPath: "/",
    ogType: "website",
  },
  services: {
    title: "Technology Services | AI, AR, 3D Printing, IoT, E-commerce | Skylyfe Tech",
    description: "Explore our full range of emerging technology services: AI/ML & GenAI, Spatial/AR experiences, 3D printing, IoT & GPS tracking, e-commerce, branding, and training.",
    keywords: "technology services, AI consulting, AR development, 3D printing services, IoT solutions, e-commerce development",
    canonicalPath: "/services",
  },
  scope: {
    title: "Start Your Project - SOW Generator | Skylyfe Tech",
    description: "Launch your technology project with our AI-powered Statement of Work generator. Get a professional project scope with clear timelines, deliverables, and pricing.",
    keywords: "project scope, statement of work, SOW generator, technology project, project planning",
    canonicalPath: "/scope",
  },
  work: {
    title: "Our Work - Case Studies & Portfolio | Skylyfe Tech",
    description: "See how we've helped businesses transform with AI, AR, IoT, and e-commerce solutions. Real projects, real results, real impact.",
    keywords: "case studies, portfolio, technology projects, success stories, client work",
    canonicalPath: "/work",
  },
  about: {
    title: "About Us - Veteran-Led Technology Innovation | Skylyfe Tech",
    description: "Skylyfe Technologies LLC is a veteran-led technology company helping organizations turn ideas into market-ready solutions using emerging technologies.",
    keywords: "about skylyfe, veteran owned business, technology innovation, Jacksonville FL tech company",
    canonicalPath: "/about",
  },
  contact: {
    title: "Contact Us - Get in Touch | Skylyfe Tech",
    description: "Ready to start your technology project? Contact Skylyfe Technologies for AI, AR, IoT, and e-commerce solutions. Located in Jacksonville, Florida.",
    keywords: "contact skylyfe, technology consulting, Jacksonville Florida, tech services",
    canonicalPath: "/contact",
  },
  legal: {
    title: "Legal - Terms of Service & Privacy Policy | Skylyfe Tech",
    description: "Review our terms of service and privacy policy. Learn how Skylyfe Technologies handles your data and the terms governing our services.",
    canonicalPath: "/legal",
    noIndex: true,
  },
};

export function getServiceSEO(slug: string, title: string, subtitle: string): PageSEO {
  return {
    title: `${title} Services | ${subtitle} | Skylyfe Tech`,
    description: `${subtitle}. Professional ${title.toLowerCase()} services from Skylyfe Technologies. Get a custom scope and start your project today.`,
    keywords: `${title.toLowerCase()}, ${slug.replace(/-/g, " ")}, technology services, Skylyfe Tech`,
    canonicalPath: `/services/${slug}`,
  };
}

export function getFullUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export function getOgImageUrl(image?: string): string {
  return image ? `${BASE_URL}${image}` : `${BASE_URL}${DEFAULT_OG_IMAGE}`;
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Skylyfe Technologies LLC",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Emerging technology services for bold brands and communities. AI/ML, Spatial/AR, 3D printing, IoT/GPS, and e-commerce solutions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25 East Beaver Street",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32206",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "myskylyfe@gmail.com",
      contactType: "customer service",
    },
    sameAs: [
      "https://instagram.com/skylyfetech",
      "https://github.com/orgs/Skylyfe-Inc/dashboard",
    ],
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Skylyfe Technologies LLC",
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    email: "myskylyfe@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25 East Beaver Street",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32206",
      addressCountry: "US",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: "United States",
    serviceType: ["AI/ML Consulting", "AR Development", "3D Printing", "IoT Solutions", "E-commerce Development", "Branding", "Technology Training"],
  },
};

export function getServiceStructuredData(service: { title: string; subtitle: string; slug: string; outcomes: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.subtitle,
    provider: {
      "@type": "Organization",
      name: "Skylyfe Technologies LLC",
    },
    url: `${BASE_URL}/services/${service.slug}`,
    serviceOutput: service.outcomes,
  };
}
