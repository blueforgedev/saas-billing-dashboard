# BillFlow — SaaS Billing Dashboard

A modern, feature-rich billing and subscription management dashboard built with **Next.js 16**, **React**, **TypeScript**, and **Shadcn UI components**.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Component Library](#component-library)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Dashboard Components

- **Overview Dashboard** - Real-time metrics, revenue tracking, and subscription analytics
- **Analytics** - Comprehensive revenue trends and performance metrics
- **Subscriptions** - Manage subscription plans and customer subscriptions
- **Invoices** - Invoice management with payment tracking
- **Customers** - Customer relationship management and details
- **Payments** - Payment processing and history
- **Revenue** - Detailed revenue analytics and forecasting
- **Notifications** - Activity feed and system notifications
- **Settings** - User profile and system configuration
- **Help** - Support and documentation

### UI Features

- 🌓 **Dark/Light Mode** - Full theme support with system preference detection
- 📱 **Responsive Design** - Mobile-first approach, works on all devices
- ♿ **Accessibility** - WCAG 2.1 AA compliant components
- 🎨 **Customizable** - Shadcn UI components fully customizable via CSS
- 📊 **Charts** - Interactive charts using Recharts
- 🔐 **Security** - JWT authentication integration ready
- ⚡ **Performance** - Optimized with Next.js App Router and Turbopack

---

## 🛠 Tech Stack

### Frontend Framework

- **Next.js 16.1.6** - React framework with App Router and Server Components
- **React 19** - UI library
- **TypeScript 5.3** - Type-safe development

### UI & Styling

- **TailwindCSS 3.x** - Utility-first CSS framework
- **Shadcn UI** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### Data & Charts

- **Recharts** - React charting library
- **date-fns** - Modern date utility library
- **Zod** - TypeScript-first schema validation

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code quality and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 📁 Project Structure

```
saas-ui-dashboard/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Root page (renders DashboardShell)
│   ├── layout.tsx                # Root layout with metadata
│   └── globals.css               # Global styles
├── components/
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── shell.tsx             # Main dashboard shell with routing
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── header.tsx            # Header with theme toggle
│   │   ├── stat-cards.tsx        # KPI stat cards
│   │   ├── revenue-chart.tsx     # Revenue trend chart
│   │   ├── subscription-chart.tsx # Subscription data visualization
│   │   ├── churn-chart.tsx       # Churn rate visualization
│   │   ├── invoices-table.tsx    # Invoice listing table
│   │   ├── top-customers.tsx     # Top customers list
│   │   ├── activity-feed.tsx     # Recent activity feed
│   │   └── usage-metrics.tsx     # Usage statistics
│   ├── pages/                    # Page-level components
│   │   ├── overview-page.tsx     # Dashboard overview
│   │   ├── analytics-page.tsx    # Analytics dashboard
│   │   ├── revenue-page.tsx      # Revenue details
│   │   ├── subscriptions-page.tsx # Subscription management
│   │   ├── invoices-page.tsx     # Invoice management
│   │   ├── payments-page.tsx     # Payment processing
│   │   ├── customers-page.tsx    # Customer management
│   │   ├── notifications-page.tsx # Notifications
│   │   ├── settings-page.tsx     # User settings
│   │   └── help-page.tsx         # Help & support
│   ├── ui/                       # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ...                   # 40+ UI components
│   ├── theme-provider.tsx        # Theme context provider
│   └── (other components)
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
├── lib/                          # Utility functions
│   └── utils.ts                  # Common utilities (cn, etc.)
├── styles/                       # Global styles
│   └── globals.css
├── public/                       # Static assets
├── components.json               # Shadcn UI configuration
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS/TailwindCSS config
├── tailwind.config.ts            # Tailwind configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **pnpm 8+** - Install with `npm install -g pnpm`
- **Git** - For version control

### Installation

1. **Clone the repository**

```bash
git clone <your-github-url>
cd saas-ui-dashboard
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Update `.env.local`**

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Authentication (if needed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

5. **Start the development server**

```bash
pnpm run dev
```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

```bash
# Development
pnpm run dev           # Start dev server (port 3000)
pnpm run build         # Build for production
pnpm run start         # Start production server
pnpm run lint          # Run ESLint

# Development utilities
pnpm run format        # Format code with Prettier
pnpm run type-check    # Run TypeScript type checking
```

---

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Frontend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Theme Configuration
NEXT_PUBLIC_THEME_DEFAULT=dark

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Authentication (Optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production
```

### Environment Variables Reference

| Variable                    | Type   | Description                | Default                 |
| --------------------------- | ------ | -------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL`       | String | Backend API endpoint       | `http://localhost:3001` |
| `NEXT_PUBLIC_THEME_DEFAULT` | String | Default theme (light/dark) | `dark`                  |
| `NEXT_PUBLIC_ANALYTICS_ID`  | String | Analytics tracking ID      | ``                      |
| `NEXTAUTH_URL`              | String | NextAuth callback URL      | `http://localhost:3000` |
| `NEXTAUTH_SECRET`           | String | Secret for NextAuth JWT    | ``                      |

---

## 🔌 API Integration

The frontend is designed to work with the Express.js backend API running on `http://localhost:3001`.

### API Endpoints Reference

#### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

#### Users

- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user profile
- `DELETE /api/v1/users/:id` - Delete user
- `GET /api/v1/users` - List all users (admin only)

#### (Coming Soon)

- Subscriptions API
- Invoices API
- Customers API
- Dashboard Analytics API

### Making API Calls

Example of calling the API from a component:

```typescript
import { useEffect, useState } from 'react';

export function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/123`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{data?.email}</div>;
}
```

---

## 🎨 Component Library

This project uses **Shadcn UI** - a collection of beautifully designed, accessible React components built on Radix UI primitives.

### Available Components

The project includes 40+ pre-built components:

- **Layout**: Card, Separator, Tabs, Drawer
- **Navigation**: Sidebar, Breadcrumb, Pagination, MenuBar, NavigationMenu
- **Forms**: Input, Label, Button, Checkbox, Radio, Select, Switch, Textarea
- **Data Display**: Table, Chart, Badge, Avatar, Timeline
- **Feedback**: Alert, Dialog, Toast, Popover, HoverCard
- **Search**: Command/Cmdk for command palette

### Using Components

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <Button variant="default">Click me</Button>
    </Card>
  );
}
```

### Customizing Components

All components can be customized via Tailwind CSS classes:

```tsx
<Button className="px-8 py-4 bg-blue-600 hover:bg-blue-700">
  Custom Button
</Button>
```

---

## 👨‍💻 Development Guidelines

### Code Style

- **TypeScript**: Use strict mode, avoid `any` type
- **Components**: Functional components with hooks
- **Naming**: camelCase for files/functions, PascalCase for components
- **Imports**: Use path aliases (`@/components`, `@/lib`, etc.)

### Component Structure

```typescript
import { ReactNode } from 'react';

interface MyComponentProps {
  title: string;
  children?: ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}
```

### Styling Best Practices

- Use TailwindCSS utility classes
- Create reusable component variants
- Use CSS modules for complex styling only
- Follow the spacing scale (4px base unit)

### Git Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to branch**

   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request** on GitHub

---

## 🚢 Deployment

### Build for Production

```bash
pnpm run build
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Click "Deploy"

### Deploy to Other Platforms

#### Docker

```bash
docker build -f Dockerfile.web -t saas-dashboard .
docker run -p 3000:3000 saas-dashboard
```

#### Self-hosted

```bash
pnpm run build
pnpm run start
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Shadcn UI](https://ui.shadcn.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Support

For support, please open an issue on GitHub or contact the development team.

---

## 🔗 Links

- **GitHub**: [Your GitHub URL]
- **Live Demo**: [Your Demo URL]
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **Documentation**: See [FULLSTACK_BUILD_PLAN.md](FULLSTACK_BUILD_PLAN.md)

---

**Last Updated**: March 4, 2026

Made with ❤️ by the BillFlow Team
