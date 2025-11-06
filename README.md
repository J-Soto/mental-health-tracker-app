# Mental Health Tracker

A full-stack web application for tracking mental health metrics over time with real-time updates and data visualization.

## Features

- Google OAuth 2.0 authentication
- Daily mental health log tracking (mood, anxiety, stress, sleep, etc.)
- Interactive charts with multiple metrics and time filters
- Real-time updates via WebSocket
- Responsive design with mobile support
- Test data generation for development

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, TailwindCSS, React Query, Chart.js, Socket.io Client  
**Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite, Passport.js, Socket.io  
**Authentication:** Google OAuth 2.0 + JWT

## Project Structure

```
/
├── client/          # React frontend application
├── server/          # Express backend API
└── README.md        # This file
```

## Quick Start

### Prerequisites

- Node.js v20.x or higher
- npm
- Google OAuth 2.0 credentials (see `server/README.md`)

### Installation

**1. Clone the repository**

```bash
git clone <repository-url>
cd Health
```

**2. Setup Backend**

Follow setup instructions in [server/README.md](./server/README.md) for backend

**3. Setup Frontend (in a new terminal)**

Follow setup instructions in [client/README.md](./client/README.md) for frontend```

**4. Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

See the documentation below for detailed guides.

## Documentation

- [Backend Documentation](./server/README.md) - API setup, database, authentication
- [Frontend Documentation](./client/README.md) - UI components, architecture, features

## Development

The project uses a monorepo structure with independent frontend and backend applications. They communicate via REST API and WebSocket connections.

### Generate Test Data

```bash
cd server
npm run seed
```

This creates approximately 110 sample logs with realistic data patterns.
