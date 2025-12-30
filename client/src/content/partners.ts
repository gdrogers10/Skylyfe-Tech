export interface Partner {
  name: string;
  logo?: string;
  category: string;
}

export const partners: Partner[] = [
  { name: "AWS", category: "Cloud" },
  { name: "OpenAI", category: "AI" },
  { name: "Shopify", category: "E-commerce" },
  { name: "8th Wall", category: "AR" },
  { name: "Printful", category: "Fulfillment" },
  { name: "Unity", category: "Gaming" },
];

export const testimonials = [
  {
    quote: "Skylyfe Tech transformed our vision into a working AR prototype in just four weeks. Their expertise in spatial computing is exceptional.",
    author: "Sarah Chen",
    role: "Product Director",
    company: "RetailTech Inc",
  },
  {
    quote: "The AI-powered analytics dashboard they built has fundamentally changed how we understand our student outcomes. Highly recommended.",
    author: "Michael Torres",
    role: "Education Director",
    company: "Community Learning Center",
  },
  {
    quote: "From concept to deployed IoT solution in under two months. The team's technical depth and communication throughout was outstanding.",
    author: "James Park",
    role: "Operations Manager",
    company: "LogiFlow Solutions",
  },
];
