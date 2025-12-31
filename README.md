# Skylyfe Tech

A production-ready marketing and lead generation web application for Skylyfe Technologies LLC.

## Overview

This platform showcases emerging technology services including AI/ML, Spatial/AR, 3D printing, IoT/GPS, e-commerce, branding, and training. It features a sophisticated AI-powered Statement of Work (SOW) generator that creates professional project scopes with PDF export and email notification capabilities.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (New York style)
- **Wouter** - Lightweight React router
- **TanStack Query** - Server state management
- **React Hook Form** + Zod - Form handling and validation

### Backend
- **Node.js** with Express
- **TypeScript** (ES modules)
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database
- **OpenAI API** - SOW generation with structured JSON output
- **Puppeteer** - PDF generation from HTML
- **Resend** - Email notifications

### Authentication
- **Replit Auth** - User authentication (Google, GitHub, Apple, email/password)

## Project Structure

```
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── content/        # Static content files
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utility functions
├── server/                 # Backend Express server
│   ├── routes.ts           # API endpoints
│   ├── sow.ts              # SOW generation logic
│   ├── pdf.ts              # PDF generation
│   ├── email.ts            # Email notifications
│   └── storage.ts          # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Drizzle schema definitions
└── attached_assets/        # Static assets and images
```

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Environment Variables
The following environment variables are required:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `AI_INTEGRATIONS_OPENAI_API_KEY` - OpenAI API key (via Replit integration)
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - OpenAI API base URL

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run database migrations:
   ```bash
   npm run db:push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`.

## Accessing in VS Code

### Option 1: Replit Desktop App
1. Download and install [Replit Desktop](https://replit.com/desktop)
2. Open your Replit project
3. Click "Open in VS Code" from the workspace menu

### Option 2: SSH Access
1. In your Replit project, go to Settings
2. Enable "SSH" under the Developer Tools section
3. Copy the SSH command provided
4. In VS Code, install the "Remote - SSH" extension
5. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
6. Select "Remote-SSH: Connect to Host"
7. Paste the SSH connection string

### Option 3: Clone Repository
1. Export your project from Replit to GitHub
2. Clone the repository locally:
   ```bash
   git clone <your-repo-url>
   cd skylyfe-tech
   ```
3. Open in VS Code:
   ```bash
   code .
   ```
4. Install dependencies and set up environment variables as described above

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar) or similar TypeScript support
- GitLens

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Submit contact form |
| `/api/sow` | POST | Generate SOW (authenticated) |
| `/api/sow/pdf` | POST | Generate PDF from SOW (authenticated) |
| `/api/sow/email` | POST | Send SOW via email (authenticated) |

## Security Features

- HTML sanitization to prevent XSS attacks
- CSRF protection on session cookies
- Rate limiting by user account and IP
- Input validation with Zod schemas
- Secure session management with PostgreSQL-backed sessions

## Testing

Run tests with:
```bash
npx jest --config jest.config.mjs --no-cache
```

## License

Proprietary - Skylyfe Technologies LLC
