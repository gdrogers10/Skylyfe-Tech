export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const faq: FaqItem[] = [
  {
    category: "Procurement",
    question: "How does your pricing work?",
    answer: "We offer three pricing models: Fixed-scope for well-defined projects with clear deliverables, Time & Materials (T&M) for exploratory or evolving projects, and Pilot programs for testing concepts before full commitment. Each model is designed to match your project needs and risk tolerance.",
  },
  {
    category: "Procurement",
    question: "Can you work with government or enterprise procurement processes?",
    answer: "Yes, we're experienced with various procurement frameworks including RFPs, RFQs, and vendor registration processes. We're registered as a small business and can provide all necessary documentation for vendor onboarding.",
  },
  {
    category: "Procurement",
    question: "Do you offer retainer arrangements?",
    answer: "Yes, for ongoing support and maintenance needs, we offer monthly retainer packages that provide priority access, dedicated hours, and preferential rates compared to project-based engagements.",
  },
  {
    category: "IP & Ownership",
    question: "Who owns the intellectual property created during a project?",
    answer: "By default, all custom work created specifically for your project transfers to you upon final payment. We clearly document IP ownership in our Statement of Work. Any pre-existing frameworks or libraries we use remain our property but are licensed to you perpetually.",
  },
  {
    category: "IP & Ownership",
    question: "Can we use open-source components in our solution?",
    answer: "Absolutely. We leverage open-source technologies where appropriate, always ensuring license compliance. We document all third-party components and their licenses in our deliverables.",
  },
  {
    category: "Data & Security",
    question: "How do you handle sensitive data?",
    answer: "We follow industry best practices for data security including encryption at rest and in transit, access controls, and secure development practices. For projects involving PII or regulated data, we can implement additional safeguards and sign BAAs or NDAs as needed.",
  },
  {
    category: "Data & Security",
    question: "Are your solutions compliant with privacy regulations?",
    answer: "We design solutions with privacy by default, supporting compliance with GDPR, CCPA, and other relevant regulations. For healthcare projects, we can implement HIPAA-compliant architectures.",
  },
  {
    category: "Accessibility",
    question: "Do you build accessible applications?",
    answer: "Yes, we follow WCAG 2.1 AA standards as our baseline for all web applications. This includes proper semantic HTML, keyboard navigation, screen reader compatibility, and sufficient color contrast.",
  },
  {
    category: "Timeline & Delivery",
    question: "What is a typical project timeline?",
    answer: "Timelines vary by project scope: Pilots typically run 2-4 weeks, standard projects 4-8 weeks, and comprehensive implementations 8-12 weeks. We provide detailed timeline estimates in every Statement of Work.",
  },
  {
    category: "Timeline & Delivery",
    question: "How do you handle project changes?",
    answer: "We use an agile approach with regular check-ins. Minor adjustments are accommodated within scope, while significant changes are documented as change orders with updated timelines and costs.",
  },
  {
    category: "Payment",
    question: "What are your payment terms?",
    answer: "For fixed-scope projects, we typically structure payments as 50% upfront to initiate and 50% upon completion. For larger projects, we can arrange milestone-based payments. T&M engagements are billed monthly in arrears.",
  },
  {
    category: "Payment",
    question: "Do you accept credit cards?",
    answer: "Yes, we accept credit cards, ACH transfers, and wire transfers. For government clients, we can accommodate NET 30 terms.",
  },
];

export const faqCategories = [
  "Procurement",
  "IP & Ownership",
  "Data & Security",
  "Accessibility",
  "Timeline & Delivery",
  "Payment",
];
