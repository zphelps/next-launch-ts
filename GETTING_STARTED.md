# Getting Started with Next Launch TS

A comprehensive guide for setting up a new SaaS project using the Next Launch TS starter template.

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (free tier available)
- A Vercel account (optional, for deployment)

---

## Step 1: Clone and Setup Repository

```bash
# Clone the repository
git clone https://github.com/your-username/next-launch-ts.git your-project-name
cd your-project-name

# Remove existing git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit from Next Launch TS starter"

# Install dependencies
npm install
```

---

## Step 2: Environment Configuration

### Create Environment File

```bash
cp .env.example .env.local
```

### Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned
3. Navigate to Settings > API to get your credentials

### Configure `.env.local`

```bash
# Required - Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Required - Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional - Customize for your app
NEXT_PUBLIC_SITE_NAME="Your App Name"
NEXT_PUBLIC_SITE_DESCRIPTION="Your app description"
```

> **Important**: Never commit your `.env.local` file. It's already in `.gitignore`.

---

## Step 3: Database Setup

### Apply Initial Migrations

1. **Go to your Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Run the migration files** from `src/supabase/migrations/` in chronological order:
   - `20240320000000_create_users_table.sql`
   - `20240320000001_create_todos_table.sql`

### Verify Database Setup

- **Check tables**: Go to Database > Tables
- **Verify RLS**: Ensure Row Level Security is enabled on all tables
- **Test policies**: Confirm RLS policies are created

---

## Step 4: Test the Application

```bash
# Start development server
npm run dev
```

1. **Open** [http://localhost:3000](http://localhost:3000)
2. **Sign up** for a new account
3. **Test authentication** flow
4. **Create a todo** to verify database connection
5. **Check responsive design** on mobile

---

## Step 5: Customize Your Application

### Update Application Context

Edit `AGENTS.md` to describe your specific application:

```markdown
## 🎯 Application Context

This is a [YOUR DOMAIN] application for [YOUR TARGET USERS]. Key concepts include:
- [Your core business entities]
- [User types and roles: Admin, User, etc.]
- [Key workflows and processes]
- [Business rules and constraints]
- [Integration requirements]
```

### Update Site Configuration

Edit `src/lib/seo.ts`:

```typescript
export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME || 'Your App Name',
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Your app description',
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: '/og-image.png', // Add your own OG image
  twitterCreator: '@yourtwitterhandle',
  keywords: ['Your', 'App', 'Keywords'],
};
```

### Update Package Information

Edit `package.json`:

```json
{
  "name": "your-app-name",
  "version": "0.1.0",
  "description": "Your app description",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-app-name"
  }
}
```

---

## Step 6: Replace Example Module with Your Domain

### Plan Your Domain Module

Before coding, define:
- **Core business entity** (products, projects, posts, etc.)
- **Data structure** and relationships
- **User permissions** and access patterns
- **Key workflows** and user interactions

### Create Your Feature Module

```bash
# Create module structure
mkdir -p src/modules/your-feature/{components,hooks,services}

# Example: For an e-commerce app
mkdir -p src/modules/products/{components,hooks,services}
```

### Follow the Module Pattern

1. **Define types** (`src/modules/your-feature/types.ts`):
   ```typescript
   export interface Product {
     id: string;
     name: string;
     description: string;
     price: number;
     user_id: string;
     created_at: string;
     updated_at: string;
   }
   ```

2. **Create validation schemas** (`src/modules/your-feature/validations.ts`):
   ```typescript
   import { z } from 'zod';
   
   export const createProductSchema = z.object({
     name: z.string().min(1, 'Name is required').max(100),
     description: z.string().min(1, 'Description is required'),
     price: z.number().min(0, 'Price must be positive'),
   });
   
   export type CreateProductFormData = z.infer<typeof createProductSchema>;
   ```

3. **Build service class** (`src/modules/your-feature/services/your-feature.ts`)
4. **Create React Query hooks** (`src/modules/your-feature/hooks/useYourFeature.ts`)
5. **Build components** (`src/modules/your-feature/components/`)

### Create Database Tables

1. **Create migration file** following the naming convention:
   ```
   YYYYMMDDHHmmss_create_your_table.sql
   ```

2. **Define table structure**:
   ```sql
   -- Migration: Create products table
   -- Purpose: Add product management functionality
   
   create table public.products (
     id bigint generated always as identity primary key,
     name text not null,
     description text not null,
     price decimal(10,2) not null,
     user_id uuid references auth.users(id) not null,
     created_at timestamp with time zone default now(),
     updated_at timestamp with time zone default now()
   );
   
   -- Enable RLS
   alter table public.products enable row level security;
   
   -- Create policies
   create policy "Users can view their own products"
     on public.products for select
     to authenticated
     using (auth.uid() = user_id);
   
   create policy "Users can create their own products"
     on public.products for insert
     to authenticated
     with check (auth.uid() = user_id);
   ```

3. **Apply via Supabase dashboard**

### Update Navigation

Edit `src/components/layout/app-sidebar.tsx`:

```typescript
// Add your feature to the navigation
{
  title: "Products",
  url: "/products",
  icon: Package, // Import from lucide-react
}
```

### Create Pages

Create `src/app/(dashboard)/your-feature/page.tsx`:

```typescript
import { YourFeatureList } from '@/modules/your-feature/components/your-feature-list';

export default function YourFeaturePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Your Feature</h1>
      <YourFeatureList />
    </div>
  );
}
```

---

## Step 7: Optional Cleanup

### Remove Todo Module (if not needed)

```bash
# Remove todo module files
rm -rf src/modules/todos
rm -rf src/app/(dashboard)/todos
rm -rf src/app/(dashboard)/categories

# Update navigation in app-sidebar.tsx to remove todo links
```

### Clean Up Example Content

- Remove or replace example content in components
- Update placeholder text and images
- Customize color scheme in `tailwind.config.js` if needed

---

## Step 8: Deployment

### Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/your-app-name.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Set environment variables** in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   NEXT_PUBLIC_SITE_NAME=Your App Name
   NEXT_PUBLIC_SITE_DESCRIPTION=Your app description
   ```

### Production Database

1. **Create production Supabase project** (or use the same one with different tables)
2. **Apply same migrations** to production database
3. **Update production environment variables** in Vercel
4. **Test production deployment**

---

## Step 9: Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript (if available)

# Testing
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Recommended Development Flow

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Follow module pattern** for new features
3. **Write tests** for complex business logic
4. **Update AGENTS.md** with new patterns
5. **Create pull request** for code review
6. **Deploy via main branch**

---

## Step 10: Maintain Documentation

### Keep AGENTS.md Updated

As you develop your application:

- **Update application context** with new domain concepts
- **Document new patterns** and architectural decisions
- **Add new best practices** discovered during development
- **Update examples** to reflect your actual implementation

### Update README.md

Replace the starter README with:
- Your project description and goals
- Setup instructions specific to your domain
- API documentation (if applicable)
- Contributing guidelines for your team

---

## 🎯 Quick Start Checklist

- [ ] Clone repository and install dependencies
- [ ] Set up Supabase project and configure environment
- [ ] Apply database migrations
- [ ] Test authentication and basic functionality
- [ ] Update application context in AGENTS.md
- [ ] Customize site configuration and branding
- [ ] Plan and create your domain module
- [ ] Create database tables for your domain
- [ ] Update navigation and routes
- [ ] Remove unused todo module (optional)
- [ ] Deploy to Vercel
- [ ] Set up production database
- [ ] Update documentation

---

## 🆘 Troubleshooting

### Common Issues

**Environment validation errors**
- Check that all required variables are set in `.env.local`
- Ensure URLs are valid (include `https://`)
- Verify Supabase credentials are correct

**Database connection issues**
- Verify Supabase URL and anon key
- Check that your Supabase project is fully provisioned
- Ensure RLS policies allow your operations

**Build errors**
- Run `npm run lint` to check for TypeScript errors
- Check for missing imports or type errors
- Verify all environment variables are set

**Authentication not working**
- Ensure Supabase Auth is enabled in your project
- Check RLS policies on auth-related tables
- Verify redirect URLs in Supabase Auth settings

**Styling issues**
- Check Tailwind CSS classes are correct
- Verify shadcn/ui components are properly imported
- Ensure CSS is being processed correctly

### Getting Help

- **Documentation**: Check `AGENTS.md` for architectural guidance
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **shadcn/ui Docs**: [ui.shadcn.com](https://ui.shadcn.com)

---

## 🎉 You're Ready!

You now have a production-ready SaaS application foundation. The starter includes:

- ✅ **Authentication system** with Supabase Auth
- ✅ **Database setup** with RLS security
- ✅ **Modern UI** with shadcn/ui components
- ✅ **Type safety** with TypeScript and Zod
- ✅ **Testing setup** with Jest and React Testing Library
- ✅ **Deployment ready** for Vercel
- ✅ **SEO optimized** with metadata and sitemaps
- ✅ **Mobile responsive** design

Focus on building your unique business logic while the foundation handles the common SaaS requirements!
