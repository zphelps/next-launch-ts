# AGENTS.md

This document provides AI agents with essential context about this **[APPLICATION_NAME]** and its architectural patterns. This application is built with scalable, enterprise-grade features and follows modern development best practices.

## 🎯 Application Context

<!-- 
📝 UPDATE THIS SECTION: Replace with your specific application context
Describe your application's domain and business logic:
- The specific domain/industry of your application
- Core business logic and workflows
- Key user types and their roles
- Domain-specific terminology and concepts
- Business rules and constraints
- Integration requirements with external services

Example:
This is a project management SaaS for construction teams. Key concepts include:
- Projects with phases, tasks, and milestones
- Team roles: Project Manager, Contractor, Client
- Integration with scheduling and invoicing systems
- Compliance with industry safety standards
-->

> **Update this section** with your application's specific domain context, business logic, user types, and key workflows to help AI systems understand your business domain.

---

## Architecture Philosophy

This architecture emphasizes **scalability, maintainability, and developer experience** through:

### Modular Design
- **Feature-based organization**: Each feature is self-contained with its own components, logic, and types
- **Clear separation of concerns**: UI, business logic, and data access are separated into distinct layers
- **Reusability**: Shared components and utilities are centralized for easy reuse

### Type Safety
- **TypeScript strict mode**: Catch errors at compile time
- **End-to-end typing**: From database to UI, types flow through the application
- **Zod validation**: Runtime validation that generates TypeScript types

### Performance
- **React Query caching**: Intelligent data caching and background updates
- **Server-side rendering**: Next.js App Router for optimal performance
- **Optimistic updates**: Immediate UI feedback with background synchronization

---

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Database**: Supabase (PostgreSQL + Auth)
- **State Management**: TanStack React Query v5
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library

### Production Features
- **Analytics**: Vercel Analytics & Speed Insights
- **SEO**: Dynamic metadata generation and sitemaps
- **Environment Validation**: Zod-based environment variable validation
- **Error Handling**: React error boundaries

---

## Project Structure

```
/src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API route handlers
│   └── providers.tsx      # App-wide providers
├── components/            # Shared UI components
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
├── modules/              # Feature modules
│   ├── auth/             # Authentication system
│   ├── todos/            # Example feature module
│   └── users/            # User management
├── lib/                  # Utility functions
├── hooks/                # Shared custom hooks
├── supabase/             # Supabase client configuration
└── middleware.ts         # Route protection
```

---

## Module Architecture Pattern

Every module follows a consistent structure:

```
/src/modules/{feature}/
├── components/           # Feature-specific React components
├── hooks/               # Custom React Query hooks
├── services/            # Business logic and data access
├── types.ts             # TypeScript interfaces
└── validations.ts       # Zod validation schemas
```

---

## Key Patterns

### Data Fetching Pattern
**Flow**: Component → Custom Hook → Service → Supabase

```typescript
// 1. Define Types (types.ts)
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    user_id: string;
    created_at: string;
}

// 2. Create Service (services/todos.ts)
export class TodoService {
    async getTodos(userId: string): Promise<Todo[]> {
        const supabase = await createSupabaseClient();
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', userId);
        
        if (error) throw new Error(error.message);
        return data as Todo[];
    }
}

// 3. Create Hook (hooks/useTodos.ts)
export function useTodos() {
    const { user } = useAuth();
    
    return useQuery({
        queryKey: ['todos', user?.id],
        queryFn: () => todoService.getTodos(user!.id),
        enabled: !!user?.id,
    });
}

// 4. Use in Component
export function TodoList() {
    const { data: todos, isLoading } = useTodos();
    
    if (isLoading) return <div>Loading...</div>;
    
    return (
        <div className="space-y-4">
            {todos?.map(todo => (
                <TodoCard key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
```

### Form Validation Pattern

```typescript
// validations.ts
export const createTodoSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export type CreateTodoFormData = z.infer<typeof createTodoSchema>;

// Component with form
const form = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
});
```

### Authentication Pattern

```typescript
// Check authentication status
const { user, isAuthenticated } = useAuth();

if (!isAuthenticated) {
    return <div>Please log in</div>;
}
```

---

## Common Workflows

### Adding a New Feature Module

1. **Create module structure**:
   ```bash
   mkdir -p src/modules/my-feature/{components,hooks,services}
   ```

2. **Define types** (`types.ts`)
3. **Create validation schemas** (`validations.ts`)
4. **Build service class** (`services/my-feature.ts`)
5. **Create React Query hooks** (`hooks/useMyFeature.ts`)
6. **Build components** (`components/`)
7. **Create pages** (`app/(dashboard)/my-feature/page.tsx`)
8. **Update navigation** (`components/layout/app-sidebar.tsx`)

### When to Create API Routes

**Most data operations should use direct Supabase calls via React Query hooks.** Only create API routes when you need:

**✅ Use API Routes For:**
- **Server-side operations** that shouldn't expose credentials to client
- **Webhook handlers** from external services (Stripe, SendGrid, etc.)
- **Complex server-side processing** that requires multiple database operations
- **Third-party API calls** that require secret keys
- **File uploads** to cloud storage with server-side validation
- **Scheduled jobs** or cron-like functionality

**❌ Avoid API Routes For:**
- **Simple CRUD operations** - use Supabase client directly
- **User authentication** - handled by Supabase Auth
- **Real-time subscriptions** - use Supabase realtime
- **Basic data fetching** - React Query + Supabase is more efficient

**Example: When to Use Each Approach**

```typescript
// ✅ Direct Supabase call (preferred for most cases)
export function useTodos() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['todos', user?.id],
    queryFn: async () => {
      const supabase = await createSupabaseClient();
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user!.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

// ✅ API route (when server-side processing needed)
// /app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();
  
  // Verify webhook signature with secret key
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  // Process payment and update database
  // This requires server-side access to Stripe secret
}
```

### Environment Variables

Required variables (`.env.local`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="[YOUR_APP_NAME]"
NEXT_PUBLIC_SITE_DESCRIPTION="[YOUR_APP_DESCRIPTION]"
```

---

## Database Migrations

### Migration Workflow
This project uses Supabase CLI for database migrations with a structured approach:

1. **Create Migration File**:
   ```bash
   # File naming: YYYYMMDDHHmmss_description.sql
   # Example: 20240320120000_create_products_table.sql
   ```

2. **Migration Structure**:
   ```sql
   -- Migration: Create products table
   -- Purpose: Add product management functionality
   -- Affected: products table, RLS policies
   
   create table public.products (
     id bigint generated always as identity primary key,
     name text not null,
     description text,
     price decimal(10,2) not null,
     user_id uuid references auth.users(id) not null,
     created_at timestamp with time zone default now(),
     updated_at timestamp with time zone default now()
   );
   
   -- Enable RLS
   alter table public.products enable row level security;
   
   -- RLS Policies
   create policy "Users can view their own products"
     on public.products for select
     to authenticated
     using (auth.uid() = user_id);
   
   create policy "Users can create their own products"
     on public.products for insert
     to authenticated
     with check (auth.uid() = user_id);
   ```

3. **Apply Migrations**:
   - Developer should apply through the SQL editor or migrations interface

### Migration Best Practices
- **Always enable RLS** on new tables
- **Create granular policies** (separate for select, insert, update, delete)
- **Use descriptive comments** explaining the purpose
- **Test migrations** in development before production

---

## CI/CD & Deployment

### Deployment Pipeline
- **Platform**: Vercel (optimized for Next.js)
- **Auto-deployment**: Connected to main branch
- **Environment**: Production variables managed in Vercel dashboard

### Database Deployment
- **Supabase**: Managed PostgreSQL with automatic backups
- **Migrations**: Applied via Supabase dashboard
- **Environment sync**: Separate dev/staging/prod projects

### Environment Management
```bash
# Development
NEXT_PUBLIC_SUPABASE_URL=your_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key

# Production (set in Vercel dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
```

---

## UI & Component Development

### Component Architecture Principles

**Extract Components Early:**
- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Extract common patterns into shared components
- **Composition over Inheritance**: Build complex UIs by combining simple components
- **Keep Files Small**: Aim for <200 lines per component file

**Component Extraction Guidelines:**
```typescript
// ❌ Bloated component (400+ lines)
export function UserDashboard() {
  // Profile section (50 lines)
  // Settings section (100 lines)  
  // Activity feed (150 lines)
  // Notifications (100 lines)
  return (/* massive JSX */);
}

// ✅ Extracted components
export function UserDashboard() {
  return (
    <div className="space-y-6">
      <UserProfile />
      <UserSettings />
      <ActivityFeed />
      <NotificationPanel />
    </div>
  );
}
```

**When to Extract:**
- **Repeated patterns** across multiple components
- **Complex logic** that can be isolated
- **Large components** (>200 lines)
- **Independent functionality** that could be reused

### Clean Code Principles

**Less Code = Less Tech Debt:**
- **Avoid premature abstraction** - extract only when you have 2+ use cases
- **Delete unused code** immediately - don't leave "just in case" code
- **Use built-in solutions** - leverage Next.js, React Query, and shadcn/ui features
- **Prefer composition** over complex prop drilling

**Code Quality Guidelines:**
```typescript
// ❌ Overengineered
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  // ... 15 more props
}

// ✅ Simple and focused
interface CreateTodoButtonProps {
  onCreateTodo: () => void;
  isLoading?: boolean;
}
```

**Lean Development:**
- **Start simple** - add complexity only when needed
- **Use TypeScript** to catch errors early
- **Leverage existing patterns** from the codebase
- **Write tests** for complex business logic only

---

## Maintaining This Document

### AI Guidelines for Updating AGENTS.md

**When to Update:**
- New feature modules are added
- Architecture patterns change or evolve
- New technologies or dependencies are introduced
- Database schema changes significantly
- New development workflows are established

**What to Update:**
1. **Application Context** - Add new domain concepts, user types, or business rules
2. **Tech Stack** - Update versions, add new dependencies, remove unused ones
3. **Project Structure** - Reflect new directories or organizational changes
4. **Patterns** - Document new architectural patterns or modify existing ones
5. **Workflows** - Add new development processes or update existing ones

**How to Update:**
1. **Read the current state** of AGENTS.md before making changes
2. **Verify accuracy** by checking actual file structure and dependencies
3. **Keep it concise** - Add essential information, remove outdated content
4. **Use placeholders** - Maintain [APPLICATION_NAME] and similar placeholders
5. **Update examples** - Ensure code examples reflect current patterns
6. **Test references** - Verify all file paths and imports are correct

**Update Triggers:**
- After adding a new module: Update project structure and add pattern examples
- After changing database schema: Update migration examples and RLS patterns  
- After adding new dependencies: Update tech stack section
- After establishing new conventions: Update best practices and patterns

**Example Update Process:**
```typescript
// When adding a new feature module, update:
// 1. Project structure section
// 2. Add example following the established pattern
// 3. Update navigation workflow if needed
// 4. Add any new best practices discovered
```

---

## Best Practices

### 🏗️ Architecture
1. **Use the module pattern** - Keep features self-contained in `/src/modules`
2. **Follow the data flow** - Component → Hook → Service → Supabase
3. **Update application context** - Keep domain context current

### 💻 Development
4. **Mobile-first styling** - Start with mobile (320px+), enhance for desktop
5. **Type everything** - Leverage TypeScript strict mode and Zod validation
6. **Environment validation** - Use `src/lib/env.ts` for type-safe variables
7. **Invalidate queries** - Keep UI in sync after mutations

### 🎨 UI/UX
8. **Extract components early** - Keep files <200 lines, extract reusable patterns
9. **Use shadcn/ui components** - Pre-styled, accessible components
10. **Show user feedback** - Use toast notifications for actions
11. **Handle loading states** - Always show loading indicators

### 🔒 Security & Performance
12. **Protect routes** - Use middleware for authentication
13. **Enable RLS** - Row Level Security on all Supabase tables
14. **Optimize queries** - Use React Query caching and stale time

### 🛣️ API Design
15. **Prefer direct Supabase calls** - Use API routes only for server-side operations
16. **Use API routes for webhooks** - External service integrations and secret key operations
17. **Keep API routes focused** - Single responsibility, clear error handling

### 🧹 Code Quality
18. **Less code = less tech debt** - Start simple, add complexity only when needed
19. **Delete unused code** - Remove dead code immediately
20. **Avoid premature abstraction** - Extract only when you have 2+ use cases
21. **Leverage existing solutions** - Use built-in Next.js, React Query, and shadcn/ui features

---

**This is a living document.** Keep the "Application Context" section updated with your current business domain and logic.