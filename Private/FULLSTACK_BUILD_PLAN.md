# Fullstack Build Plan - Billing Dashboard

## Overview

Transform the current frontend-only Next.js dashboard into a complete fullstack application with backend API, database, and authentication.

---

## 1. Architecture

### Tech Stack

**Frontend**: Next.js 16.1.6 (existing)
**Backend**: Node.js + Express.js
**Database**: PostgreSQL (recommended) or MongoDB
**Authentication**: JWT + NextAuth.js
**ORM**: Prisma (for PostgreSQL) or Mongoose (for MongoDB)
**API Documentation**: OpenAPI/Swagger
**Containerization**: Docker + Docker Compose

### Directory Structure

```
project-root/
├── apps/
│   ├── web/                    # Next.js frontend (existing)
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── public/
│   │
│   └── api/                    # Node.js backend (new)
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── models/
│       │   ├── middleware/
│       │   ├── utils/
│       │   └── config/
│       ├── tests/
│       ├── Dockerfile
│       └── .env.example
│
├── packages/                   # Shared code (new)
│   ├── db/                     # Database schemas, migrations
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 2. Database Layer

### Data Models

#### Users

```
- id (PK)
- email (unique)
- passwordHash
- firstName
- lastName
- avatar
- role (admin, manager, user)
- createdAt
- updatedAt
```

#### Subscriptions

```
- id (PK)
- userId (FK)
- plan (basic, pro, enterprise)
- status (active, canceled, expired)
- startDate
- endDate
- billingCycle (monthly, annual)
- price
- createdAt
- updatedAt
```

#### Invoices

```
- id (PK)
- userId (FK)
- subscriptionId (FK)
- amount
- status (draft, sent, paid, overdue, canceled)
- issuedDate
- dueDate
- paidDate
- invoiceNumber
- items (JSON array)
- createdAt
- updatedAt
```

#### Customers

```
- id (PK)
- userId (FK)
- companyName
- email
- phone
- address
- city
- state
- zipCode
- country
- createdAt
- updatedAt
```

#### Activities

```
- id (PK)
- userId (FK)
- action (login, invoice_paid, subscription_created, etc.)
- description
- resourceType (subscription, invoice, customer)
- resourceId
- ipAddress
- userAgent
- createdAt
```

#### AuditLogs

```
- id (PK)
- userId (FK)
- action
- tableName
- recordId
- changes (JSON)
- timestamp
```

### Migrations

- Use Prisma or TypeORM for schema management
- Version control all migrations
- Implement seeding for development data

---

## 3. Backend API Endpoints

### Authentication Routes

```
POST   /api/v1/auth/register          - User registration
POST   /api/v1/auth/login             - User login
POST   /api/v1/auth/logout            - User logout
POST   /api/v1/auth/refresh           - Refresh JWT token
POST   /api/v1/auth/forgot-password   - Request password reset
POST   /api/v1/auth/reset-password    - Reset password
GET    /api/v1/auth/me                - Get current user
```

### User Routes

```
GET    /api/v1/users/:id              - Get user details
PUT    /api/v1/users/:id              - Update user profile
DELETE /api/v1/users/:id              - Delete user (soft delete)
GET    /api/v1/users                  - List users (admin)
```

### Subscription Routes

```
GET    /api/v1/subscriptions          - List user's subscriptions
GET    /api/v1/subscriptions/:id      - Get subscription details
POST   /api/v1/subscriptions          - Create subscription
PUT    /api/v1/subscriptions/:id      - Update subscription
DELETE /api/v1/subscriptions/:id      - Cancel subscription
POST   /api/v1/subscriptions/:id/upgrade - Upgrade plan
```

### Invoice Routes

```
GET    /api/v1/invoices               - List invoices
GET    /api/v1/invoices/:id           - Get invoice details
GET    /api/v1/invoices/:id/download  - Download invoice (PDF)
POST   /api/v1/invoices               - Create invoice
PUT    /api/v1/invoices/:id           - Update invoice
DELETE /api/v1/invoices/:id           - Delete invoice (soft)
POST   /api/v1/invoices/:id/mark-paid - Mark invoice as paid
POST   /api/v1/invoices/:id/send      - Send invoice email
```

### Customer Routes

```
GET    /api/v1/customers              - List customers
GET    /api/v1/customers/:id          - Get customer details
POST   /api/v1/customers              - Create customer
PUT    /api/v1/customers/:id          - Update customer
DELETE /api/v1/customers/:id          - Delete customer
```

### Dashboard Analytics Routes

```
GET    /api/v1/dashboard/stats        - Get stat cards data
GET    /api/v1/dashboard/revenue      - Revenue chart data
GET    /api/v1/dashboard/subscriptions - Subscription chart data
GET    /api/v1/dashboard/churn        - Churn rate data
GET    /api/v1/dashboard/usage        - Usage metrics
GET    /api/v1/dashboard/top-customers - Top customers list
GET    /api/v1/dashboard/activity     - Activity feed
```

### Payment Routes (if integrating Stripe/payment processor)

```
POST   /api/v1/payments/create-intent - Create payment intent
POST   /api/v1/payments/webhook       - Payment webhook handler
GET    /api/v1/payments/history       - Payment history
```

---

## 4. Authentication & Authorization

### JWT Implementation

- Access Token: 15 minutes
- Refresh Token: 7 days
- Tokens stored in HTTP-only cookies
- CSRF protection enabled

### Middleware

```typescript
- authMiddleware(): Verify JWT, attach user to request
- roleMiddleware(): Check user role (admin, manager, user)
- rateLimiting(): Prevent abuse
- errorHandler(): Centralized error handling
- requestLogger(): Log all requests
- corsHandler(): CORS configuration
```

### Role-Based Access Control (RBAC)

```
- admin: Full system access
- manager: Can manage users, view reports
- user: Can only view own data
```

---

## 5. Frontend Integration

### API Client Setup

```typescript
// Create API client with:
- Base URL configuration
- Interceptors for JWT refresh
- Error handling
- Request/response typing
- Automatic retry logic
```

### Hooks to Create

```typescript
- useAuth(): Login/logout/user management
- useFetch(): Generic data fetching with caching
- useSubscriptions(): Subscription data
- useInvoices(): Invoice data
- useDashboard(): Dashboard analytics data
- useCustomers(): Customer management
```

### Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=<secret>
NEXTAUTH_URL=http://localhost:3000
```

---

## 6. DevOps & Deployment

### Development Setup

```bash
# Docker Compose services
- PostgreSQL database
- API server
- Next.js dev server
- Redis (optional, for caching/sessions)
```

### Production Deployment

**Option 1: Vercel + managed services**

- Deploy Next.js to Vercel
- API on Railway, Render, or AWS
- PostgreSQL on Supabase or AWS RDS

**Option 2: Docker + Cloud Provider**

- Build images for API and web
- Deploy to AWS ECS, Google Cloud Run, or DigitalOcean

**Option 3: Monorepo deployment**

- Deploy both as single unit
- Cost-effective for smaller teams

### CI/CD Pipeline

```
- GitHub Actions / GitLab CI
- Run tests on PR
- Build Docker images
- Deploy to staging on merge to dev
- Deploy to production on tag
```

### Monitoring & Logging

```
- Application logs: Winston or Pino
- Error tracking: Sentry
- Performance monitoring: DataDog or New Relic
- Database monitoring: Built-in + Prisma insights
```

---

## 7. Security Checklist

- [ ] HTTPS only in production
- [ ] CORS properly configured
- [ ] Rate limiting on all endpoints
- [ ] Input validation & sanitization
- [ ] SQL injection prevention (ORM)
- [ ] XSS protection
- [ ] CSRF tokens for mutations
- [ ] Secure password hashing (bcrypt)
- [ ] JWT secret management
- [ ] Environment variables never committed
- [ ] Soft deletes for audit trails
- [ ] Request logging for debugging
- [ ] API versioning (/api/v1/)
- [ ] Helmet.js for security headers

---

## 8. Testing Strategy

### Backend Testing

```
- Unit Tests: Jest (Services, utilities)
- Integration Tests: Jest + Supertest (API endpoints)
- E2E Tests: Cypress/Playwright (Full workflows)
- Database: Test database isolation
```

### Frontend Testing

```
- Unit Tests: Jest + React Testing Library
- Component Tests: Vitest
- E2E Tests: Playwright/Cypress
```

### Test Coverage

- Target: 80%+ coverage
- Critical paths: 100%
- All API endpoints covered

---

## 9. Implementation Phases

### Phase 1: Backend Foundation (Week 1-2)

- [ ] Set up Express.js server
- [ ] Configure PostgreSQL & Prisma
- [ ] Create database models
- [ ] Implement authentication (JWT)
- [ ] Create base middleware
- [ ] Set up Docker environment

### Phase 2: Core APIs (Week 3-4)

- [ ] User management endpoints
- [ ] Subscription CRUD endpoints
- [ ] Invoice CRUD endpoints
- [ ] Customer CRUD endpoints
- [ ] Input validation with Zod
- [ ] Error handling

### Phase 3: Dashboard APIs (Week 5)

- [ ] Dashboard stats endpoint
- [ ] Analytics endpoints
- [ ] Activity feed endpoint
- [ ] Data aggregation queries
- [ ] Caching strategy

### Phase 4: Frontend Integration (Week 6-7)

- [ ] Set up API client
- [ ] Create custom hooks
- [ ] Integrate all components
- [ ] Error boundary handling
- [ ] Loading states

### Phase 5: Advanced Features (Week 8+)

- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Webhooks
- [ ] Advanced reporting

### Phase 6: Testing & Polish (Ongoing)

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Documentation

---

## 10. Development Workflow

### Local Development

```bash
# Clone and setup
git clone <repo>
cd project
npm install

# Start all services
docker-compose up -d

# Run migrations
npm run migrate

# Start development servers
npm run dev         # Starts both frontend and backend
```

### Git Workflow

```
main (production)
├── staging (pre-production)
└── dev (development)
    ├── feature/auth-system
    ├── feature/billing-api
    └── feature/analytics
```

### Code Quality

- ESLint for linting
- Prettier for formatting
- Pre-commit hooks (Husky)
- TypeScript strict mode
- Conventional commits

---

## 11. Performance Considerations

### Caching Strategy

- Database query caching (Redis)
- API response caching
- Client-side data caching
- CDN for static assets

### Database Optimization

- Indexes on FK columns
- Pagination for large datasets
- Query optimization
- Connection pooling

### API Performance

- Compression (gzip)
- Pagination with limits
- Field selection (GraphQL-like)
- Batch operations where applicable

---

## 12. Documentation

### API Documentation

- Swagger/OpenAPI spec
- Interactive API explorer
- Request/response examples

### Code Documentation

- JSDoc comments for functions
- README for each package
- Architecture decision records
- Setup guides

### Developer Guide

- Environment setup
- Database migrations
- Running tests
- Deployment process

---

## 13. Dependencies to Add

### Backend

```json
{
  "express": "^4.18.2",
  "prisma": "^6.0.0",
  "@prisma/client": "^6.0.0",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "zod": "^3.22.4",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-ratelimit": "^7.1.5",
  "morgan": "^1.10.0",
  "nodemailer": "^6.9.7",
  "stripe": "^14.0.0"  (optional)
}
```

### Frontend additions

```json
{
  "swr": "^2.2.4",
  "axios": "^1.6.2",
  "js-cookie": "^3.0.5"
}
```

---

## 14. Success Metrics

### Completion Criteria

- [ ] All API endpoints tested and working
- [ ] Frontend fully integrated with backend
- [ ] Authentication flow complete
- [ ] Dashboard displays real data from API
- [ ] Test coverage > 80%
- [ ] API documentation complete
- [ ] Docker setup working
- [ ] Ready for production deployment

### Performance Targets

- [ ] API response time < 200ms (p95)
- [ ] Frontend bundle size < 200KB (gzipped)
- [ ] Lighthouse score > 90
- [ ] Uptime > 99.5%

---

## Next Steps

1. **Review & Approve** this plan
2. **Create API folder** structure
3. **Initialize backend** repository
4. **Set up database** schema
5. **Begin Phase 1** implementation
