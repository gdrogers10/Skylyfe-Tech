export interface Metric {
  label: string;
  value: string;
  change?: string;
  context?: string;
}

export const kpis: Metric[] = [
  {
    label: "Quiz Accuracy Improvement",
    value: "85.7%",
    change: "+26.2 pts",
    context: "From 59.5% baseline",
  },
  {
    label: "Students Achieving Mastery",
    value: "9",
    context: "Unique students scoring 75%+",
  },
  {
    label: "Training Modules Analyzed",
    value: "3",
    context: "Comprehensive quiz analysis",
  },
  {
    label: "Total Learning Attempts",
    value: "27",
    context: "Engaged learning sessions",
  },
];

export const caseStudies = [
  {
    id: "ai-quiz-analytics",
    title: "AI-Powered Learning Analytics",
    client: "Educational Institution",
    services: ["AI/ML & GenAI", "Training"],
    challenge: "Needed to understand student performance patterns and identify knowledge gaps across multiple training modules.",
    solution: "Implemented AI-driven analytics to analyze quiz responses, identify weak areas, and generate personalized learning recommendations.",
    tools: ["OpenAI", "Python", "Dashboard"],
    metrics: [
      { label: "Accuracy Improvement", value: "+26.2 pts" },
      { label: "Students at Mastery", value: "9 students" },
      { label: "Modules Analyzed", value: "3 quizzes" },
    ],
    outcomes: [
      "Identified specific knowledge gaps per student",
      "Automated progress tracking and reporting",
      "Personalized learning path recommendations",
    ],
  },
  {
    id: "ar-product-visualization",
    title: "AR Product Visualization Platform",
    client: "Retail Brand",
    services: ["Spatial/AR"],
    challenge: "Customers couldn't visualize products in their space before purchase, leading to high return rates.",
    solution: "Built WebAR experience allowing customers to place 3D product models in their environment via smartphone.",
    tools: ["8th Wall", "Three.js", "Blender"],
    metrics: [
      { label: "Return Rate Reduction", value: "-35%" },
      { label: "Session Duration", value: "+2.5 min" },
      { label: "Conversion Increase", value: "+22%" },
    ],
    outcomes: [
      "Browser-based AR with no app download",
      "Interactive product customization",
      "Analytics on user engagement",
    ],
  },
  {
    id: "iot-fleet-tracking",
    title: "IoT Fleet Management System",
    client: "Logistics Company",
    services: ["IoT & GPS Tracking"],
    challenge: "No real-time visibility into vehicle locations, leading to inefficient routing and missed deliveries.",
    solution: "Deployed GPS tracking devices with cloud-connected dashboard for real-time fleet monitoring and geofencing alerts.",
    tools: ["ESP32", "GPS", "AWS IoT", "DynamoDB"],
    metrics: [
      { label: "Route Efficiency", value: "+18%" },
      { label: "On-time Deliveries", value: "94%" },
      { label: "Fuel Savings", value: "$12K/month" },
    ],
    outcomes: [
      "Real-time vehicle tracking dashboard",
      "Automated geofencing alerts",
      "Historical route analysis",
    ],
  },
];
