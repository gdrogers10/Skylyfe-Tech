# Skylyfe Tech

## Overview

Skylyfe Tech is a production-ready marketing and lead generation web application for Skylyfe Technologies LLC. The platform showcases emerging technology services (AI/ML, Spatial/AR, 3D printing, IoT/GPS, e-commerce) and includes a sophisticated SOW (Statement of Work) generator that uses OpenAI to create professional project scopes with PDF export capabilities.

The application is designed as a conversion-focused B2B tech website with clear service presentations, case studies, and a multi-step scoping wizard that guides potential clients through project definition.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom build script
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a page-based structure under `client/src/pages/` with shared components in `client/src/components/`. Content is managed through TypeScript files in `client/src/content/` rather than a CMS, keeping the site fast and version-controlled.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ES modules)
- **API Pattern**: RESTful endpoints under `/api/`
- **PDF Generation**: Puppeteer (headless Chromium) for server-side HTML to PDF rendering

Key backend features:
- Contact form submission with optional webhook forwarding
- SOW generation using OpenAI's structured JSON output
- PDF export of generated SOWs

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Current Storage**: In-memory storage (`MemStorage` class) with database schema ready for PostgreSQL
- **Migrations**: Drizzle Kit configured for PostgreSQL migrations

Database tables include: users, contacts, conversations, and messages (for chat functionality).

### AI Integration
- **Provider**: OpenAI via Replit AI Integrations
- **Primary Use**: SOW document generation with structured JSON schema output
- **Model**: gpt-4o-mini (with upgrade path to gpt-4o)
- **Additional Capabilities**: Image generation and chat functionality available through integration modules

### Build and Deployment
- **Development**: `tsx` for TypeScript execution with Vite dev server
- **Production Build**: Custom esbuild script bundles server, Vite builds client
- **Output**: Server bundle at `dist/index.cjs`, client assets at `dist/public/`
- **Target Platform**: Replit (uses Replit-specific Vite plugins and environment detection)

## External Dependencies

### Third-Party Services
- **OpenAI API**: SOW generation, chat completions, and image generation (via Replit AI Integrations)
- **Puppeteer/Chromium**: PDF generation from HTML templates
- **Optional Webhook**: Contact form submissions can forward to external webhook URL

### Database
- **PostgreSQL**: Production database (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and schema management

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API key (via Replit integration)
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API base URL (via Replit integration)
- `CONTACT_WEBHOOK_URL` (optional): Webhook endpoint for contact form submissions
- `PUPPETEER_EXECUTABLE_PATH`: Path to Chromium executable for PDF generation

### Key NPM Packages
- **UI**: Radix UI primitives, Lucide icons, class-variance-authority
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Data**: @tanstack/react-query, drizzle-orm, drizzle-zod
- **Server**: express, puppeteer-core, openai
- **Utilities**: date-fns, clsx, tailwind-merge
- **Testing**: jest, @swc/jest, @testing-library/react, @testing-library/jest-dom, supertest

## Testing

### Test Framework
- **Jest** with @swc/jest for TypeScript compilation
- Separate test environments for client (jsdom) and server (node)
- Run all tests: `npx jest --config jest.config.mjs --no-cache`

### Test Coverage
- **Backend API Tests** (4 tests): Contact form submission, SOW endpoint authentication
- **Frontend Component Tests** (3 tests): BottomNav rendering, auth hook state

### Configuration Notes
- `transformIgnorePatterns` configured for ESM modules (wouter, regexparam)
- `modulePathIgnorePatterns` excludes `.cache/` to avoid haste module collisions
- File mock for static assets, identity-obj-proxy for CSS modules