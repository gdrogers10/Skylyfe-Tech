export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  who: string;
  painPoints: string[];
  outcomes: string[];
  deliverables: string[];
  timelineOptions: string[];
  tools: string[];
  complianceNotes?: string;
  pricingModels: string[];
  ctas: { primaryText: string; primaryHref: string };
  icon: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}

export const services: Service[] = [
  {
    slug: "ai-ml-genai",
    title: "AI/ML & GenAI",
    subtitle: "Transform data into intelligent solutions",
    who: "Organizations seeking to leverage artificial intelligence for automation, insights, and customer engagement",
    painPoints: [
      "Manual processes consuming valuable time and resources",
      "Difficulty extracting insights from large datasets",
      "Need for personalized customer experiences at scale",
      "Lack of AI expertise in-house",
    ],
    outcomes: [
      "Automated workflows reducing manual effort by 60%+",
      "AI-powered chatbots and assistants",
      "Predictive analytics for better decision-making",
      "Custom ML models tailored to your data",
    ],
    deliverables: [
      "AI strategy and roadmap document",
      "Custom trained ML models",
      "API integrations for AI services",
      "Training documentation and workshops",
    ],
    timelineOptions: ["2 weeks", "4 weeks", "8 weeks", "12 weeks"],
    tools: ["OpenAI", "Meshy AI", "Spline", "Tripo", "TensorFlow", "PyTorch"],
    complianceNotes: "All AI implementations follow responsible AI principles with data privacy safeguards",
    pricingModels: ["Fixed-scope", "T&M", "Pilot"],
    ctas: { primaryText: "Start AI Project", primaryHref: "/scope?service=ai-ml-genai" },
    icon: "Brain",
    tags: ["AI/ML", "GenAI", "Automation"],
    image: "/images/services/ai-ml.jpg",
    imageAlt: "African American developer working with AI and machine learning technology",
  },
  {
    slug: "spatial-ar",
    title: "Spatial/AR Experiences",
    subtitle: "Immersive experiences that captivate and convert",
    who: "Brands and organizations looking to create memorable, interactive experiences for customers and training",
    painPoints: [
      "Low engagement with traditional marketing content",
      "Difficulty showcasing products before purchase",
      "Training programs lacking hands-on experience",
      "Need to stand out in crowded markets",
    ],
    outcomes: [
      "Interactive AR product visualizations",
      "WebAR experiences accessible via any browser",
      "Immersive training simulations",
      "Increased customer engagement and conversions",
    ],
    deliverables: [
      "AR experience design and prototypes",
      "WebAR deployment ready for mobile/desktop",
      "3D asset library optimized for AR",
      "Analytics dashboard for engagement tracking",
    ],
    timelineOptions: ["4 weeks", "8 weeks", "12 weeks"],
    tools: ["8th Wall", "WebXR", "Three.js", "Blender", "Unity"],
    pricingModels: ["Fixed-scope", "T&M", "Pilot"],
    ctas: { primaryText: "Create AR Experience", primaryHref: "/scope?service=spatial-ar" },
    icon: "Glasses",
    tags: ["Spatial", "AR", "WebXR"],
    image: "/images/services/spatial-ar.jpg",
    imageAlt: "African American professional experiencing virtual reality technology",
  },
  {
    slug: "3d-printing-prototyping",
    title: "3D Printing & Rapid Prototyping",
    subtitle: "From concept to physical product in days",
    who: "Product developers, inventors, and businesses needing physical prototypes and small-batch manufacturing",
    painPoints: [
      "Long lead times for traditional manufacturing",
      "High costs for prototype iterations",
      "Difficulty visualizing designs before production",
      "Limited access to prototyping equipment",
    ],
    outcomes: [
      "Functional prototypes within days, not months",
      "Cost-effective design iteration",
      "Small-batch production capability",
      "Physical products for testing and demos",
    ],
    deliverables: [
      "3D model design and optimization",
      "Printed prototypes in various materials",
      "Technical specifications document",
      "Manufacturing-ready CAD files",
    ],
    timelineOptions: ["1 week", "2 weeks", "4 weeks"],
    tools: ["Blender", "CAD Software", "FLSUN", "SLA/FDM Printers"],
    pricingModels: ["Fixed-scope", "T&M"],
    ctas: { primaryText: "Start Prototyping", primaryHref: "/scope?service=3d-printing-prototyping" },
    icon: "Printer",
    tags: ["3D Printing", "Prototyping", "Manufacturing"],
    image: "/images/services/3d-printing.jpg",
    imageAlt: "African American engineer working with 3D printing and manufacturing equipment",
  },
  {
    slug: "iot-gps-tracking",
    title: "IoT & GPS Tracking",
    subtitle: "Connected solutions for real-world visibility",
    who: "Logistics companies, fleet managers, asset-heavy organizations, and smart city initiatives",
    painPoints: [
      "Lack of real-time visibility into assets and vehicles",
      "Manual tracking processes prone to errors",
      "Difficulty managing distributed operations",
      "No centralized dashboard for monitoring",
    ],
    outcomes: [
      "Real-time GPS tracking and geofencing",
      "IoT sensor integration for environmental monitoring",
      "Automated alerts and notifications",
      "Centralized dashboard for all connected devices",
    ],
    deliverables: [
      "Custom IoT hardware setup and configuration",
      "Cloud-connected dashboard application",
      "Mobile app for on-the-go monitoring",
      "API documentation for integrations",
    ],
    timelineOptions: ["4 weeks", "8 weeks", "12 weeks"],
    tools: ["ESP32", "GPS Modules", "AWS IoT", "Amplify", "AppSync", "DynamoDB"],
    complianceNotes: "All IoT implementations follow security best practices with encrypted data transmission",
    pricingModels: ["Fixed-scope", "T&M", "Pilot"],
    ctas: { primaryText: "Build IoT Solution", primaryHref: "/scope?service=iot-gps-tracking" },
    icon: "MapPin",
    tags: ["IoT", "GPS", "Tracking"],
    image: "/images/services/iot-gps.jpg",
    imageAlt: "African American professional using connected smart devices and IoT technology",
  },
  {
    slug: "ecommerce-shopify",
    title: "E-commerce & Shopify",
    subtitle: "Launch and scale your online storefront",
    who: "Entrepreneurs, small businesses, and brands ready to sell online or expand their digital presence",
    painPoints: [
      "Complex store setup and configuration",
      "Integration challenges with fulfillment providers",
      "Poor mobile shopping experience",
      "Difficulty managing inventory across channels",
    ],
    outcomes: [
      "Fully functional Shopify storefront",
      "Print-on-demand integration for custom products",
      "Optimized checkout for higher conversions",
      "Multi-channel selling capability",
    ],
    deliverables: [
      "Custom Shopify theme design",
      "Product catalog setup and optimization",
      "Payment and shipping configuration",
      "POD integration with Printful/Printify",
    ],
    timelineOptions: ["2 weeks", "4 weeks", "8 weeks"],
    tools: ["Shopify", "Printful", "Printify", "Stripe", "ShipStation"],
    pricingModels: ["Fixed-scope", "T&M"],
    ctas: { primaryText: "Launch Store", primaryHref: "/scope?service=ecommerce-shopify" },
    icon: "ShoppingCart",
    tags: ["E-commerce", "Shopify", "POD"],
    image: "/images/services/ecommerce.jpg",
    imageAlt: "African American entrepreneur running their e-commerce business",
  },
  {
    slug: "branding-visual-identity",
    title: "Branding & Visual Identity",
    subtitle: "Build a brand that resonates and endures",
    who: "Startups, rebranding initiatives, and organizations needing cohesive visual identity",
    painPoints: [
      "Inconsistent brand presentation across channels",
      "Outdated visual identity not reflecting current values",
      "Lack of brand guidelines for team alignment",
      "Difficulty standing out in competitive markets",
    ],
    outcomes: [
      "Distinctive logo and visual identity system",
      "Comprehensive brand guidelines",
      "Marketing collateral templates",
      "Consistent brand experience across touchpoints",
    ],
    deliverables: [
      "Logo design with variations",
      "Color palette and typography system",
      "Brand guidelines document",
      "Social media and marketing templates",
    ],
    timelineOptions: ["2 weeks", "4 weeks", "6 weeks"],
    tools: ["Figma", "Adobe Creative Suite", "Canva"],
    pricingModels: ["Fixed-scope", "T&M"],
    ctas: { primaryText: "Build Your Brand", primaryHref: "/scope?service=branding-visual-identity" },
    icon: "Palette",
    tags: ["Branding", "Design", "Identity"],
    image: "/images/services/branding.jpg",
    imageAlt: "African American creative designer developing brand identity and graphics",
  },
  {
    slug: "training-workshops",
    title: "Training & Workshops",
    subtitle: "Upskill your team on emerging technologies",
    who: "Organizations seeking to build internal capabilities in AI, AR, IoT, and other emerging tech",
    painPoints: [
      "Skills gap in emerging technologies",
      "Difficulty keeping pace with tech evolution",
      "Need for hands-on, practical training",
      "Generic training not tailored to industry needs",
    ],
    outcomes: [
      "Team proficiency in target technologies",
      "Hands-on experience with real projects",
      "Certification and skill documentation",
      "Internal capability to maintain and extend solutions",
    ],
    deliverables: [
      "Custom curriculum design",
      "Live workshop sessions",
      "Hands-on lab exercises",
      "Reference materials and resources",
    ],
    timelineOptions: ["1 week", "2 weeks", "8 weeks (EETT program)"],
    tools: ["Custom Labs", "Cloud Sandboxes", "LMS Platforms"],
    pricingModels: ["Fixed-scope", "T&M"],
    ctas: { primaryText: "Schedule Training", primaryHref: "/scope?service=training-workshops" },
    icon: "GraduationCap",
    tags: ["Training", "Workshops", "Education"],
    image: "/images/services/training.jpg",
    imageAlt: "African American instructor leading a technology training workshop",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceTags = [
  "AI/ML",
  "GenAI",
  "Spatial",
  "AR",
  "WebXR",
  "3D Printing",
  "Prototyping",
  "IoT",
  "GPS",
  "E-commerce",
  "Shopify",
  "Branding",
  "Training",
];
