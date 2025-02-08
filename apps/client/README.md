# TaskMastery Client

## Description
Angular-based frontend application for TaskMastery, providing a modern and responsive user interface for task management and productivity tools.

## Local Development Setup

### Prerequisites
- Node.js (v18 or later)
- yarn (v1.22 or later)
- Backend API running locally (see root README)

### Installation and Setup

1. Install dependencies:
```bash
yarn
```

2. Configure environment:
- Default configuration should work for local development
- Environment files located in:
  - `src/environments/environment.ts` - Development settings
  - `src/environments/environment.prod.ts` - Production settings

Key configuration parameters:
- `API_BASE_PATH` - Backend API URL (default: http://localhost:3000)
- `GOOGLE_CLIENT_ID` - Must match API's Google OAuth client ID

### Development Server

```bash
# Start development server
yarn start
```

The application will be available at http://localhost:4200

### Running Tests
```bash
# Unit tests with watch mode
yarn test:watch

# Generate coverage report
yarn test:cov
```

## Features
- Progressive Web App (PWA) support
- Responsive Material Design UI
- OAuth2 Authentication
- Real-time updates
- Offline support

## Project Structure
- `/src`
  - `/app` - Application components and modules
    - `/+state` - State management
    - `/auth` - Authentication components
    - `/dashboard` - Dashboard features
    - `/dialog` - Reusable dialogs
  - `/styles` - Global styles and themes
  - `/assets` - Static assets

## Progressive Web App
The application includes PWA features:
- Offline functionality
- Push notifications
- Install prompts
- Auto-updates

Configure PWA features in `ngsw-config.json`

## Building for Production

For production build and deployment instructions, refer to the root project's deployment documentation.
