# Next Launch TS - Production-Ready SaaS Starter

A modern, production-ready SaaS starter built with Next.js 15, React Query, Supabase, and shadcn/ui. This comprehensive starter includes everything you need to launch a scalable SaaS application with enterprise-grade features.

> 🚨 **Using this template?** Make sure to follow the [setup instructions](#-getting-started) carefully, especially the step to **remove the `.git` directory** after cloning. This prevents accidentally pushing your project's changes back to this template repository.

## 🚀 Features

### Core Application
- **Authentication**: Complete auth system with login, signup, password reset
- **Todo Management**: Full CRUD operations with categories, priorities, and due dates
- **Real-time Updates**: Live synchronization across devices using Supabase
- **Professional UI**: Modern, responsive design with dark mode support
- **Type Safety**: End-to-end TypeScript with strict mode
- **Performance**: Optimized with React Query caching and optimistic updates

### Production Features
- **Analytics**: Vercel Analytics and Speed Insights (automatic on Vercel)
- **SEO Optimization**: Dynamic metadata, Open Graph, Twitter Cards, and sitemaps
- **Environment Validation**: Zod-based environment variable validation
- **Error Handling**: React error boundaries with extensible error reporting

### Developer Experience
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **Documentation**: Extensive inline documentation and architecture guides
- **Type Safety**: Strict TypeScript with end-to-end type safety
- **Code Quality**: ESLint configuration and best practices

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: TanStack React Query v5
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation

### Production Tools
- **Analytics**: Vercel Analytics & Speed Insights (automatic on Vercel)
- **SEO**: Dynamic metadata generation and sitemaps
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (optimized configuration)

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone and Setup Your Project

```bash
# Clone the template
git clone https://github.com/zphelps/next-launch-ts.git your-project-name
cd your-project-name

# Install dependencies
npm install

# Disconnect from the template repository
git remote remove origin

# Create your own repository on GitHub, then add it as origin:
git remote add origin https://github.com/yourusername/your-project-name.git
git branch -M main
git push -u origin main
```

> ⚠️ **Important**: Always run `git remote remove origin` after cloning to disconnect from the template repository. This prevents accidentally pushing your project changes back to the template.

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy your project URL and anon key

### 3. Environment Setup

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# Required variables:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional - Customize SEO:
# NEXT_PUBLIC_SITE_NAME=Your App Name
# NEXT_PUBLIC_SITE_DESCRIPTION=Your app description
```

> 💡 **Tip**: Check `.env.example` for a complete list of available configuration options.

### 4. Database Setup

Run the database migrations in your Supabase SQL editor:

```sql
-- Copy and paste the contents from supabase/migrations/
-- Start with 20240320000000_create_users_table.sql
-- Then run 20240320000001_create_todos_table.sql
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🎯 Production Features

### Analytics & Monitoring
- **Vercel Analytics**: Automatic page views and performance tracking (works automatically on Vercel)
- **Speed Insights**: Core Web Vitals monitoring (works automatically on Vercel)

### SEO & Metadata
- **Dynamic SEO**: Flexible metadata generation for all pages
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization

### Environment Management
- **Zod Validation**: Runtime environment variable validation
- **Type Safety**: Fully typed environment configuration
- **Clear Documentation**: Comprehensive `.env.example` with all options

### Error Handling & Performance
- **Error Boundaries**: React error boundaries with extensible error reporting
- **Performance Optimization**: React Query caching and optimistic updates

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API route handlers
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── globals.css        # Global styles
├── components/            # Shared UI components
│   └── ui/               # shadcn/ui components
├── lib/                   # Core utilities
│   ├── env.ts            # Environment validation
│   └── seo.ts            # SEO utilities
├── modules/              # Feature modules
│   ├── auth/             # Authentication module
│   ├── todos/            # Todo management module
│   └── users/            # User management module
├── hooks/                # Shared custom hooks
└── middleware.ts         # Route protection
```

## 🏗️ Architecture

This project follows a **modular architecture** pattern where each feature is self-contained:

### Feature Module Structure
```
src/modules/{feature}/
├── components/           # Feature-specific React components
├── hooks/               # Custom React Query hooks
├── services/            # Business logic and data access
├── types.ts             # TypeScript interfaces
└── config.ts            # Module configuration
```

### Data Flow Pattern
**Component → Custom Hook → Service → Supabase**

This ensures clear separation of concerns and makes the codebase maintainable and testable.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

**Required variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `NEXT_PUBLIC_SITE_URL` - Your production domain

**Optional SEO customization:**
- `NEXT_PUBLIC_SITE_NAME` - Your app name
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Your app description

> 💡 **Tip**: Analytics work automatically when deployed to Vercel - no configuration needed!

## 📚 Key Concepts

### Authentication Flow
- JWT-based authentication with Supabase
- Protected routes using middleware
- Automatic token refresh
- Secure user session management

### State Management
- React Query for server state
- React Context for authentication state
- Optimistic updates for better UX

### Form Handling
- React Hook Form for performance
- Zod schemas for validation
- Type-safe form data

### Error Handling
- Global error boundaries for graceful error handling
- Toast notifications for user feedback
- Extensible error reporting (ready for Sentry, LogRocket, etc.)

### SEO & Metadata
- Use `generateSEO()` utility for consistent metadata
- Automatic sitemap generation for all routes
- Open Graph and Twitter Card optimization
- Dynamic metadata based on page content

### Analytics
- Vercel Analytics work automatically when deployed to Vercel
- Enable Web Analytics and Speed Insights in your Vercel dashboard
- No configuration or environment variables needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Configuration Examples

### Custom SEO for Pages

```typescript
import { generateMetadata, pageMetadata } from '@/lib/seo';

// Use predefined metadata for common pages
export const metadata = pageMetadata.login;

// Or create custom metadata for specific pages
export const metadata = generateMetadata({
  title: 'My Custom Page',
  description: 'This is a custom page with optimized SEO',
  image: '/custom-og-image.png',
});
```

### Environment Configuration

```typescript
import { env } from '@/lib/env';

// Access validated environment variables
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const siteName = env.NEXT_PUBLIC_SITE_NAME || 'Default Name';
```

### Error Boundary Usage

```typescript
import ErrorBoundary from '@/components/error-boundary';

export function MyApp() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [TanStack Query](https://tanstack.com/query) - Data fetching library
- [Vercel](https://vercel.com/) - Deployment and analytics platform