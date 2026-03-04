# Billing Dashboard API

Backend API for the Billing Dashboard application built with Express.js, TypeScript, and PostgreSQL.

## Features

- ✓ User Authentication (JWT)
- ✓ Subscription Management
- ✓ Invoice Management
- ✓ Customer Management
- ✓ Dashboard Analytics
- ✓ Audit Logging
- ✓ Type-Safe Database (Prisma ORM)

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

## Setup Database

```bash
# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

## Development

```bash
# Start development server
npm run dev

# Server will run on http://localhost:3001
# Health check: http://localhost:3001/health
```

## Building

```bash
# Compile TypeScript
npm run build

# Start production server
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

```bash
# Run ESLint
npm run lint

# Format code
npm run format
```

## Database Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npm run db:reset

# Push schema to database
npm run db:push
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `GET /api/v1/auth/me` - Get current user

### Users

- `GET /api/v1/users/:id` - Get user details
- `PUT /api/v1/users/:id` - Update user profile
- `DELETE /api/v1/users/:id` - Delete user
- `GET /api/v1/users` - List users (admin only)

### Subscriptions

- `GET /api/v1/subscriptions` - List subscriptions
- `GET /api/v1/subscriptions/:id` - Get subscription details
- `POST /api/v1/subscriptions` - Create subscription
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Cancel subscription

### Invoices

- `GET /api/v1/invoices` - List invoices
- `GET /api/v1/invoices/:id` - Get invoice details
- `POST /api/v1/invoices` - Create invoice
- `PUT /api/v1/invoices/:id` - Update invoice
- `DELETE /api/v1/invoices/:id` - Delete invoice

### Dashboard

- `GET /api/v1/dashboard/stats` - Get dashboard stats
- `GET /api/v1/dashboard/revenue` - Get revenue chart data
- `GET /api/v1/dashboard/subscriptions` - Get subscription data

## Project Structure

```
src/
├── index.ts              # Entry point
├── app.ts                # Express app configuration
├── routes/               # API routes
├── controllers/          # Route handlers
├── services/             # Business logic
├── middleware/           # Express middleware
├── utils/                # Utility functions
└── config/               # Configuration files
```

## Environment Variables

See `.env.example` for all available variables.

Key variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRY` - JWT token expiration time
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `CORS_ORIGIN` - Allowed CORS origin

## Error Handling

The API uses centralized error handling. All errors are returned in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "details": {} // Only in development
}
```

## Logging

Requests are logged using Morgan. Errors are logged to console with detailed information in development mode.

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t billing-api .

# Run container
docker run -p 3001:3001 --env-file .env billing-api
```

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests and linting
4. Commit with conventional commits
5. Submit pull request

## License

MIT
