# Radhe Boys PG Management System

## Overview

This is a full-stack web application for managing a boys' PG (Paying Guest) accommodation business in Ahmedabad. The system combines a public-facing marketing website with an admin dashboard for managing residents, inquiries, payments, and room availability. Built with modern web technologies, it provides a comprehensive solution for PG management.

## System Architecture

The application follows a monorepo structure with a clear separation between client-side and server-side code:

- **Frontend**: React with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS for responsive design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

## Key Components

### Frontend Architecture
- **Public Website**: Marketing pages showcasing PG facilities, rooms, pricing, and contact forms
- **Admin Dashboard**: Protected interface for managing residents, payments, inquiries, and room status
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Extensive use of shadcn/ui components for consistent UI

### Backend Architecture
- **RESTful API**: Express.js server providing endpoints for all business operations
- **Authentication**: JWT-based authentication for admin access
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **File Organization**: Clean separation of routes, storage, and database logic

### Data Models
- **Users**: Admin authentication system
- **Residents**: Current PG residents with room assignments and personal details
- **Inquiries**: Prospective resident inquiries from the contact form
- **Payments**: Payment tracking with due dates and status management
- **Room Status**: Real-time room availability tracking by room type

## Data Flow

1. **Public Inquiries**: Visitors submit inquiries through the contact form, stored for admin review
2. **Admin Authentication**: JWT tokens secure admin dashboard access
3. **Resident Management**: Admins can add, edit, and manage resident information
4. **Payment Tracking**: System tracks payment due dates, amounts, and payment status
5. **Room Management**: Automatic room availability updates based on resident occupancy

## External Dependencies

### Core Framework Dependencies
- React 18 with TypeScript for type-safe UI development
- Express.js for server-side API development
- Vite for fast development and optimized builds

### Database & ORM
- PostgreSQL as the primary database (configured for Neon serverless)
- Drizzle ORM for type-safe database operations and migrations
- Connection pooling with @neondatabase/serverless

### UI & Styling
- Tailwind CSS for responsive styling
- shadcn/ui component library for consistent UI components
- Radix UI primitives for accessible component foundations
- Lucide React for consistent iconography

### State Management & Data Fetching
- TanStack Query for server state management and caching
- React Hook Form with Zod validation for form handling

### Authentication & Security
- bcrypt for password hashing
- jsonwebtoken for JWT token management
- Express session handling

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` starts both frontend and backend in development mode
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production**: `npm run start` serves the built application
- **Database**: PostgreSQL module configured in .replit for database provisioning
- **Environment**: Node.js 20 runtime with web server capabilities

### Build Configuration
- Frontend builds to `dist/public` for static asset serving
- Backend bundles to `dist/index.js` as ESM module
- Vite handles static asset optimization and code splitting
- Hot module replacement enabled for development

### Database Management
- Drizzle migrations stored in `./migrations`
- Database schema defined in `shared/schema.ts`
- Push-based deployment with `npm run db:push`

## Changelog

```
Changelog:
- June 21, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Admin credentials: Username: Radhe, Password: Radhe06
Prefer smooth animations and user-friendly interface design
Location link: https://maps.app.goo.gl/z1KPt35Fzs9VYszA7
```