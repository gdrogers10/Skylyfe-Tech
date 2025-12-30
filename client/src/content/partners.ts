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
    quote: "Skylyfe Tech brought our AR video game and interactive books to life. Their creativity and technical skills exceeded our expectations.",
    author: "Twyla Prindle",
    role: "Founder",
    company: "Kash Kids Inc",
  },
  {
    quote: "They built our funeral subscription service website with care and professionalism. The platform has transformed how we serve our customers.",
    author: "James Fralin",
    role: "Owner",
    company: "PrePlan Online",
  },
  {
    quote: "Our childcare website is beautiful and easy to use. Skylyfe Tech understood our vision and delivered beyond what we imagined.",
    author: "Tamia Sibley",
    role: "Director",
    company: "Destiny Prep Academy",
  },
  {
    quote: "The professional website they created perfectly represents my brand. Outstanding work from start to finish.",
    author: "Travarius Tutt",
    role: "Founder",
    company: "Mr Occupy Everything",
  },
];
