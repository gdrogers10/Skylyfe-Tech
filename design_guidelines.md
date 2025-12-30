# Skylyfe Tech Design Guidelines

## Design Approach
**Material Design-inspired System** with enterprise credibility and conversion focus. Drawing from Linear's clarity, Stripe's restraint, and Notion's information hierarchy for a professional B2B tech services experience.

## Core Design Principles
1. **Credibility First**: Clean, professional layouts that build trust with enterprise clients
2. **Conversion-Optimized**: Clear visual hierarchy guiding users toward scoping and contact actions
3. **Information Clarity**: Dense technical content presented with breathing room and scannable structure

## Typography System
- **Primary Font**: Inter (Google Fonts)
- **Hierarchy**:
  - Hero H1: text-5xl md:text-6xl font-bold tracking-tight
  - Page H1: text-4xl md:text-5xl font-bold
  - Section H2: text-3xl md:text-4xl font-semibold
  - Card Titles: text-xl font-semibold
  - Body: text-base leading-relaxed
  - Small/Meta: text-sm text-slate-400

## Layout & Spacing System
**Tailwind Units**: Consistently use 4, 6, 8, 12, 16, 20, 24, 32 for spacing
- Section Padding: py-20 md:py-32
- Container: max-w-7xl mx-auto px-6
- Card Padding: p-8
- Element Gaps: gap-8 md:gap-12
- Grid Spacing: space-y-12 md:space-y-16

## Component Library

### Navigation
Sticky header (bg-slate-900/95 backdrop-blur), logo left, centered nav links, "Scope Your Project" CTA right (bg-blue-600), visible focus rings (ring-2 ring-blue-500)

### Hero (Home)
Full-width section with dark gradient background (slate-900 to slate-800), centered content max-w-4xl, large heading + subtitle + dual CTA layout (primary blue-600, secondary outline), KPI band immediately below with 4-column grid of metrics (large numbers + context)

### Service Cards
Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), rounded-2xl cards with slate-800 background, hover:scale-105 transition, icon or badge top, title + description + tag pills, "Learn More" link bottom-right

### SOW Generator Multi-Step Form
Left sidebar progress tracker (steps 1-8), right main content area with current step, generous form spacing (space-y-6), clear field labels above inputs, input fields with slate-700 bg and slate-500 borders, blue-600 focus states, sticky "Continue" button bottom-right

### Case Study Cards (/work)
Asymmetric grid (masonry-style), each card: project title, tools used as badges, before/after metrics in contrasting boxes, outcomes list with checkmarks, subtle shadow on hover

### Footer
Dark slate-900 background, 4-column layout: brand/tagline, Quick Links, Services, Contact info, social icons placeholders, bottom bar with copyright and legal links

## Images

### Hero Section
Large, impactful background image showing technology/innovation (abstract circuits, AR visualization, or collaborative workspace), subtle dark overlay (bg-slate-900/70) for text contrast, buttons with backdrop-blur-md bg-blue-600/90 treatment

### Service Detail Pages
Header images showing relevant technology (AI models, AR experiences, 3D prints, IoT devices), width-constrained to max-w-4xl, rounded corners

### Case Studies
Grid of project screenshots/photos showcasing deliverables, 2:3 aspect ratio cards with rounded corners and subtle shadows

## Visual Treatment
- **Surfaces**: slate-800 for cards, slate-700 for inputs, slate-50 for light surfaces
- **Borders**: slate-600 for subtle divisions, slate-500 for interactive elements
- **Shadows**: soft drop shadows on cards (shadow-xl), subtle elevation on hover
- **Corners**: rounded-2xl for cards, rounded-lg for buttons/inputs, rounded-full for badges
- **Accent**: blue-600 for CTAs, links, and interactive states; blue-500 for focus rings

## Page-Specific Layouts

### Home
Hero with background image → KPI band (4-column metrics) → Featured Services grid (3-col) → Partner logos strip → Testimonials (2-col) → Final CTA section with centered content

### Services Hub
Page header with title/subtitle → Filter tags → Service cards grid (3-col) → CTA section

### Service Detail
Hero with service-specific image → 2-column: left (outcomes, deliverables) / right (sidebar with pricing models, tools used) → Timeline accordion → "Scope This Project" CTA

### SOW Generator
Split layout: 30% left sidebar (sticky progress), 70% main content, white/light backgrounds for form clarity, preview panel slides in on final step

### Work/Case Studies
Masonry grid of case cards, filter by service type, each card expands to show full details on click

### Contact
2-column: left (form), right (contact info, office hours placeholder, map placeholder)

## Accessibility Implementation
- Focus visible on all interactive elements (ring-2 ring-blue-500)
- Skip-to-content link
- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on icon buttons
- Sufficient contrast ratios (WCAG AA): white text on slate-900, slate-900 text on slate-50
- Form labels associated with inputs
- Error states with text + icons

## Interactions & States
- Buttons: hover:bg-blue-700 active:bg-blue-800
- Cards: hover:shadow-2xl transition-all duration-200
- Links: underline-offset-4 hover:text-blue-400
- Form inputs: focus:ring-2 focus:ring-blue-500 focus:border-blue-500
- Minimal animations: subtle scale on hover, smooth transitions (duration-200)

This creates a credible, conversion-focused B2B experience with clear information hierarchy and professional polish.