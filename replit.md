# Univaciti

## Overview

Univaciti is a next-generation learning platform landing page application. The project is a full-stack TypeScript application featuring a React frontend with a modern UI component library and an Express backend. Currently, it serves as a pre-launch landing page with waitlist functionality, allowing users to sign up for early access to the platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- Pages located in `client/src/pages/`
  - Landing page: `landing.tsx`
  - Programme pages: `programmes/tesa.tsx`, `programmes/stem.tsx`, `programmes/nest.tsx`
  - Certification pages: `certifications/cloud-engineering.tsx`, `certifications/data-analytics.tsx`, `certifications/software-java.tsx`, `certifications/quality-assurance.tsx`, `certifications/software-react.tsx`, `certifications/solutions-architecture.tsx`, `certifications/ai-ml.tsx`
- Reusable UI components in `client/src/components/ui/`
- Shared programme components in `client/src/components/programme-shared.tsx`:
  - CalendarTimetable: Calendar-style timetable showing cohort schedules (like Teams/Google Calendar)
  - CoursesContent: Detailed course modules, skills, and tools for each specialization
  - StructureContent: Programme structure with timeline and phases
  - WorldMapBackground: SVG world map watermark background
  - Cloud provider icons: AWS (SiAmazon), GCP (SiGooglecloud), Huawei (SiHuawei)
- Custom hooks in `client/src/hooks/`
- Utility functions in `client/src/lib/`

### Programme Page Structure
Each programme page (TESA, STEM, NEST) features:
- Tabbed sidebar navigation: Home, Courses, Structure, Time-Table, Internship, Fees, Funding
- Programme and specialization dropdowns for quick navigation
- Calendar-style timetable displaying cohort schedules with color-coded dates
- World map watermark background (opacity 0.03-0.05)
- Rich content including icons from lucide-react

### Routes
- `/` - Landing page with hero, programmes, certifications
- `/programmes/tesa` - TESA programme details
- `/programmes/stem` - STEM programme details
- `/programmes/nest` - NEST programme details
- `/certifications/cloud-engineering` - Cloud Engineering certification
- `/certifications/data-analytics` - Data Analytics certification
- `/certifications/software-java` - Java Software Engineering certification
- `/certifications/quality-assurance` - Quality Assurance certification
- `/certifications/software-react` - React Software Engineering certification
- `/certifications/solutions-architecture` - Solutions Architecture certification
- `/certifications/ai-ml` - AI & Machine Learning certification

### Design System
- Primary blue color (matching logo): `#1E9AD6`
- Lighter blue for buttons: `#3AAFE6`
- Logo: `attached_assets/logo_1769031259580.png` (transparent PNG, bright blue)
- Uses react-icons/si for brand icons (cloud platforms, companies)
- Custom SVG icons for programmes and certifications where brand icons unavailable

### Additional Routes
- `/recruitment` - Recruiter registration page
- `/certify` - Certification exam information
- `/community` - Community and alumni network

Path aliases are configured:
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets/*` → `./attached_assets/*`

### Backend Architecture
- **Framework**: Express 5 with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Development**: Vite dev server integration for HMR

Server files are organized in `server/`:
- `index.ts` - Application entry point and middleware setup
- `routes.ts` - API route definitions
- `storage.ts` - Data access layer (currently in-memory)
- `vite.ts` - Vite development server integration
- `static.ts` - Static file serving for production

### Data Storage
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect
- **Current Storage**: In-memory storage implementation (`MemStorage` class)
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)

The application is configured for PostgreSQL via Drizzle but currently uses in-memory storage. The database schema includes:
- `users` table - Basic user authentication
- `waitlistEntries` - Email waitlist for pre-launch signups (in-memory only currently)

### Build System
- **Development**: `npm run dev` - Runs tsx with Vite HMR
- **Production Build**: `npm run build` - Builds frontend with Vite, bundles server with esbuild
- **Database Migrations**: `npm run db:push` - Drizzle Kit push to database

The build script bundles specific dependencies to reduce cold start times in production.

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Store**: connect-pg-simple for session persistence (available but not currently used)

### UI Framework
- **Radix UI**: Full suite of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: For component variant management
- **Lucide React**: Icon library

### API & Data Fetching
- **TanStack React Query**: Server state management and caching
- **Zod**: Schema validation (shared between frontend/backend via drizzle-zod)

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Server bundling for production
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment