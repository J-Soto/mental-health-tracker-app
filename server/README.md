# Mental Health Tracker - Backend API

Express-based REST API with real-time WebSocket support and Google OAuth authentication.

## Tech Stack

- **Node.js** with TypeScript
- **Express** (web framework)
- **Prisma ORM** (database management)
- **SQLite** (database)
- **Passport.js** + Google OAuth 2.0 (authentication)
- **JWT** (session tokens)
- **Socket.io** (real-time updates)
- **Zod** (validation)

## Project Structure

```
src/
├── config/
│   ├── passport.ts           # Google OAuth strategy configuration
│   ├── prisma.ts             # Prisma client singleton
│   └── socket.ts             # Socket.io configuration with auth
├── controllers/
│   ├── auth.controller.ts    # Authentication handlers
│   └── log.controller.ts     # Log CRUD handlers
├── dtos/
│   └── log.dto.ts            # Zod validation schemas for logs
├── middleware/
│   ├── isAuth.ts             # JWT verification middleware
│   └── validate.ts           # Zod validation middleware
├── routes/
│   ├── auth.routes.ts        # Authentication endpoints
│   └── log.routes.ts         # Log management endpoints
├── services/
│   ├── auth.service.ts       # JWT generation and verification
│   └── log.service.ts        # Business logic for logs
├── types/
│   └── express.d.ts          # TypeScript definitions for Express
├── app.ts                    # Express app configuration
└── server.ts                 # HTTP + WebSocket server startup

prisma/
├── schema.prisma             # Database schema
├── seed.ts                   # Test data generator
└── migrations/               # Database migration history
```

## Installation

```bash
npm install
```

## Configuration

Create `.env` file (or copy from `.env.example`):

```env
DATABASE_URL="YOUR_DATABASE_URL"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

JWT_SECRET="your-super-secure-random-string"

SERVER_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URI: `http://localhost:3000/api/auth/google/callback`
7. Copy Client ID and Client Secret to `.env`

## Database Setup

Initialize database and create schema:

```bash
npx prisma migrate dev --name init
```

When prompted "We need to reset the SQLite database", accept by pressing **y**. This will:

- Create the SQLite database at prisma/dev.db
- Generate migration files from schema.prisma
- Apply the migration to your database

The database schema includes:

- **User:**: id, googleId, email, displayName, createdAt, updatedAt
- **DailyLog:** id, date, mood, anxiety, stress, sleep, sleepQuality, socialInteractions, physicalActivity, sleepDisturbances, symptoms, createdAt, userId  

## Development

```bash
npm run dev
```

Starts server with hot-reload at http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Generate Test Data

```bash
npm run seed
```

This creates:

- 1 test user (uses your Google account if you've logged in)
- ~110 daily logs
- Realistic patterns: workweek vs weekend variation, seasonal trends, random fluctuations
- Mix of good days (mood 4-5) and bad days (mood 1-2)

## API Endpoints

### Authentication

**`GET /api/auth/google`**  
Redirects to Google OAuth consent screen

**`GET /api/auth/google/callback`**  
Google OAuth callback, sets `auth_token` cookie, redirects to `CLIENT_URL/dashboard`

**`GET /api/auth/me`**  
Returns current user info  
**Requires:** `auth_token` cookie  
**Response:** `{ id, email, displayName }`

**`POST /api/auth/logout`**  
Clears `auth_token` cookie  
**Response:** `{ message: "Logout successful" }`

### Flow

1. User clicks "Login with Google" on frontend
2. Frontend redirects to `GET /api/auth/google`
3. User completes Google OAuth consent
4. Google redirects to `GET /api/auth/google/callback`
5. Server verifies user with Google, creates/finds user in DB
6. Server generates JWT token with user data
7. Server sets `auth_token` httpOnly cookie
8. Server redirects to `CLIENT_URL/dashboard`
9. Frontend reads cookie automatically on subsequent requests

### JWT Structure

**Payload:**

```json
{
  "id": "user-cuid",
  "email": "user@example.com",
  "displayName": "User Name"
}
```

**Expiry:** 7 days

**Cookie:** httpOnly, secure (in production), maxAge 7 days

### Logs

**`GET /api/logs`**  
Get all logs for authenticated user, sorted by date descending  
**Requires:** `auth_token` cookie  
**Response:** Array of log objects

**`POST /api/logs`**  
Create new log entry  
**Requires:** `auth_token` cookie  
**Body:**
```json
{
  "date": "2024-01-15",  // optional, defaults to today
  "mood": 1-5,
  "anxiety": 1-5,
  "stress": 1-5,
  "sleepQuality": 1-5,
  "sleep": 0-24,  // decimal
  "socialInteractions": 0+,  // integer
  "physicalActivity": "string" | null,
  "sleepDisturbances": "string" | null,
  "symptoms": "string" | null
}
```
**Response:** Created log object + emits WebSocket event to user

**`DELETE /api/logs/:id`**  
Delete log by ID (only if owned by user)  
**Requires:** `auth_token` cookie  
**Response:** `{ message: "Log deleted successfully" }`

### Health Check

**`GET /api/health`**  
**Response:** `"Server is healthy!"`

## WebSocket Events

### Connection

Client must authenticate with JWT token:

```javascript
const socket = io('http://localhost:3000', {
  auth: { token: 'jwt-token-from-cookie' }
});
```

Server validates token and joins user to their personal room (`socket.join(userId)`).

### Events

**`refreshLogs`** (server → client)  
Emitted when user creates a new log  
Tells client to refetch logs from `GET /api/logs`

**`requestRefresh`** (client → server)  
Client can request a refresh (currently just echoes back `refreshLogs`)

## Middleware

### isAuth

Validates JWT token from `auth_token` cookie  
Attaches `req.user` object with `{ id, email, displayName }`  
Returns 401 if token missing or invalid

### validate(schema)

Validates request body against Zod schema  
Returns 400 with validation errors if invalid  
Used on `POST /api/logs`

## Available Scripts

```bash
npm run dev         # Start dev server with hot-reload
npm run build       # Compile TypeScript to dist/
npm start           # Run compiled code from dist/
npm run test        # Run Jest tests (not configured yet)
npm run seed        # Generate test data
```

## Database Management

Create migration after schema changes:

```bash
npx prisma migrate dev --name migration-name
```

Reset database (WARNING: deletes all data):

```bash
npx prisma migrate reset
```

Generate Prisma Client after schema changes:

```bash
npx prisma generate
```

View data in browser:

```bash
npx prisma studio
```

## Troubleshooting

### Google OAuth fails

Check:

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Authorized redirect URI in Google Console matches `SERVER_URL/api/auth/google/callback`
- `SERVER_URL` and `CLIENT_URL` in `.env` are correct

### WebSocket authentication fails

Check:

- Client is sending token in `auth` object during connection
- `JWT_SECRET` in `.env` matches what was used to generate token
- Token hasn't expired (7 day limit)

### Prisma Client errors

Run:

```bash
npx prisma generate
```

After pulling new schema changes or installing dependencies

### Port 3000 already in use

Change `PORT` in `.env` or kill the process:

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Cannot find module errors after git pull

Run:

```bash
npm install
npx prisma generate
```

## Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Use strong `JWT_SECRET` (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Keep Google OAuth credentials private

## Performance

- Connection pooling ready for PostgreSQL in production
- Prisma query optimization with selective field loading
- JWT stateless authentication reduces database lookups
- WebSocket rooms prevent broadcast to all users

## Known Limitations

- **Testing:** Unit and integration tests not yet implemented
- **Database:** SQLite not recommended for production (use PostgreSQL)
- **Rate Limiting:** No API rate limiting configured
- **Logging:** Basic console logging only (consider Winston/Pino for production)

These are documented for awareness and future enhancement.
