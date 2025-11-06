# Mental Health Tracker - Frontend

React-based frontend application with real-time updates, interactive data visualization, and modular architecture.

## Tech Stack

- React 18.2 with TypeScript
- Vite (build tool and dev server)
- TailwindCSS (styling)
- React Query (server state management)
- Chart.js + react-chartjs-2 (data visualization)
- Socket.io Client (real-time updates)
- React Hook Form + Zod (form validation)
- Axios (HTTP client)
- date-fns (date formatting and manipulation)

## Architecture

### Modular Component Design

The frontend follows a component-driven architecture with clear separation of concerns:

- **Domain-specific folders:** Components organized by feature (`chart/`, `forms/`, `logs/`)
- **Shared utilities:** Centralized constants, hooks, and utility functions
- **Type safety:** Full TypeScript coverage with Zod validation
- **Single Responsibility:** Components kept focused and under 100 lines

### Why Modular Architecture?

- **Maintainability:** Smaller, focused components are easier to understand and modify
- **Reusability:** Extracted components can be used across the application
- **Testability:** Isolated components are simpler to unit test
- **Scalability:** Clear boundaries make it easier to add new features

## Project Structure

```
src/
├── components/
│   ├── chart/                       # Chart visualization components
│   │   ├── ChartContainer.tsx       # Main chart orchestrator
│   │   ├── TimeFilterSelector.tsx   # Time period selector
│   │   ├── MetricSelector.tsx       # Multi-select metric dropdown
│   │   ├── MetricChart.tsx          # Chart.js wrapper
│   │   ├── ChartInfoTip.tsx         # Contextual help tooltip
│   │   └── EmptyChartState.tsx      # Empty state message
│   ├── forms/                       # Form components
│   │   ├── DailyLogForm.tsx         # Main form orchestrator
│   │   ├── DateSelector.tsx         # Date input component
│   │   ├── MentalMetricsSection.tsx # Mood, anxiety, stress inputs
│   │   ├── PhysicalMetricsSection.tsx # Sleep, physical, social inputs
│   │   ├── NotesSection.tsx         # Text area inputs
│   │   └── FormSubmitButton.tsx     # Submit button with loading state
│   ├── logs/                        # Log display components
│   │   ├── LogList.tsx              # Paginated log list
│   │   ├── LogItem.tsx              # Individual log card
│   │   ├── LogListControls.tsx      # Page size and sort controls
│   │   ├── PaginationControls.tsx   # Page navigation
│   │   ├── LogMetricBadges.tsx      # Metric badges display
│   │   ├── LogDetailsSection.tsx    # Detailed log information
│   │   └── DeleteLogButton.tsx      # Delete with confirmation
│   ├── ui/                          # Reusable UI components
│   │   └── ScaleInput.tsx           # 1-5 scale selector
│   ├── DashboardPage.tsx            # Main dashboard layout
│   └── LoginPage.tsx                # Google OAuth login page
├── constants/                       # Centralized configuration
│   ├── chartMetrics.ts              # Chart metric definitions
│   ├── timeFilters.ts               # Time period filters
│   ├── formMaps.ts                  # Form dropdown mappings
│   └── logItemMaps.ts               # Color mapping for scales
├── context/
│   ├── AuthContext.tsx              # Authentication state
│   └── SocketContext.tsx            # WebSocket connection
├── hooks/                           # Custom React hooks
│   ├── useAuth.ts                   # Authentication hook
│   ├── useLogs.ts                   # Logs CRUD operations
│   ├── useSocket.ts                 # WebSocket events
│   ├── useChartData.ts              # Chart data processing
│   └── usePagination.ts             # Pagination logic
├── services/
│   └── api.ts                       # Axios instance
├── utils/                           # Utility functions
│   ├── chartConfig.ts               # Chart.js configuration
│   └── dateFormatters.ts            # Date formatting utilities
├── App.tsx                          # Root component
├── main.tsx                         # Application entry
└── index.css                        # Global styles
```

## Installation

```bash
npm install
```

## Configuration

The frontend connects to the backend API at `http://localhost:3000` by default. To change this, edit `src/services/api.ts`:

```typescript
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});
```

## Development

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173` with Hot Module Replacement (HMR).

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder. TypeScript compilation is verified before build.

## Preview Production Build

```bash
npm run preview
```

## Features

### Authentication

- Google OAuth 2.0 flow with automatic redirect
- JWT token stored in `httpOnly` cookie
- Automatic session restoration on page reload
- Protected routes with loading states

### Dashboard

- Welcome header with user information
- Interactive chart with 6 trackable metrics
- Log creation form with real-time validation
- Paginated log list with real-time updates

### Charts

**Available Metrics:**

- **Level metrics (1-5):** Mood, Anxiety, Stress, Sleep Quality
- **Count metrics:** Social Interactions
- **Hours metrics:** Sleep Hours

**Features:**

- Multi-select up to 3 metrics simultaneously
- Time filters: 24h (hourly), 7d, 14d, 30d, 90d, 1y, all time
- Dual Y-axes: Left (1-5 scale), Right (Hours/Count with dynamic labels)
- Color-coded lines with legend
- Smart date formatting
- Interactive hover tooltips
- Empty state messages

### Forms

- Zod schema validation with React Hook Form
- **Scale inputs (1-5):** Color-coded interactive buttons
  - 1 (Red) → 2 (Orange) → 3 (Yellow) → 4 (Lime) → 5 (Green)
- **Sleep hours:** Number input (0-24) with decimal support
- **Social interactions:** Integer count (0+)
- **Optional fields:** Physical activity, sleep disturbances, symptoms
- **Date selector:** Defaults to today

### Pagination

- Smart ellipsis algorithm for large datasets
- Configurable page size (3, 5, 10, 15, 20 items)
- Sort toggle (newest/oldest first)
- Item counter display
- Mobile-responsive design

### Real-time Updates

- WebSocket connection with authentication
- Automatic reconnection on disconnect
- Instant UI updates when logs are created/deleted
- User-specific rooms (no data leakage)

## API Integration

The frontend consumes the following REST endpoints:

```
GET  /api/auth/me              # Get current user
POST /api/auth/logout          # Logout user
GET  /api/logs                 # Get all user logs
POST /api/logs                 # Create new log
DELETE /api/logs/:id           # Delete log
```

### WebSocket Events

- `newLog`: Triggered when a new log is created
- `logDeleted`: Triggered when a log is deleted
- `refreshLogs`: Signals client to refetch data

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Environment

No `.env` file needed for client. Backend URL is configured in `src/services/api.ts`.

For production deployment, update the `baseURL` to your production API endpoint.

## Troubleshooting

### Login redirect doesn't work

- Check that backend is running on `http://localhost:3000`
- Verify Google OAuth credentials in `.env`
- Ensure authorized redirect URI includes `http://localhost:3000/api/auth/google/callback`

### Charts not showing data

- Ensure you have created logs
- Check browser console for errors
- Verify `GET /api/logs` returns data

### WebSocket not connecting

- Check browser console for connection errors
- Ensure `auth_token` cookie is present (DevTools > Application > Cookies)
- Verify backend WebSocket server is running

### Page shows "Loading..." forever

- Open DevTools Network tab
- Check if `GET /api/auth/me` is failing
- Try logging out and logging in again

## Browser Support

- Modern browsers with ES6+ support
- WebSocket support required
- Tested on Chrome, Firefox, Edge

## Performance

- React Query caching reduces redundant API calls
- Memoization for expensive calculations
- Optimistic updates for better UX
- Code splitting ready for future routes

## Known Limitations

- **Testing:** Unit and integration tests not yet implemented
- **Accessibility:** ARIA labels could be improved for screen readers
- **CI/CD:** No automated deployment pipeline configured

These are documented for awareness and future enhancement.
