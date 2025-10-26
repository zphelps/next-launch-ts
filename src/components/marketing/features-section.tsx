import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Lock,
    Database,
    Palette,
    Code2,
    Zap,
    Shield,
    Smartphone,
    Globe,
    Users
} from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "Complete Authentication",
        description: "Login, signup, password reset, and session management with Supabase Auth. Social logins supported."
    },
    {
        icon: Database,
        title: "Database & Real-time",
        description: "PostgreSQL database with real-time subscriptions, Row Level Security, and automatic migrations."
    },
    {
        icon: Palette,
        title: "Beautiful UI Components",
        description: "Modern, accessible components built with Radix UI and Tailwind CSS. Dark mode included."
    },
    {
        icon: Code2,
        title: "Type Safety",
        description: "End-to-end TypeScript with strict mode, Zod validation, and auto-generated database types."
    },
    {
        icon: Zap,
        title: "Performance Optimized",
        description: "React Query caching, optimistic updates, Next.js optimizations, and automatic code splitting."
    },
    {
        icon: Shield,
        title: "Production Ready",
        description: "Analytics, SEO optimization, error handling, testing, and comprehensive security measures."
    },
    {
        icon: Smartphone,
        title: "Mobile First",
        description: "Responsive design that works perfectly on all devices. Progressive Web App capabilities."
    },
    {
        icon: Globe,
        title: "SEO Optimized",
        description: "Dynamic metadata, sitemaps, structured data, and performance optimizations for search engines."
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Multi-user support with role-based permissions, team management, and collaborative features."
    }
];

export function FeaturesSection() {
    return (
        <section id="features" className="container mx-auto max-w-screen-2xl px-4 py-20 sm:py-32">
            <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                    Everything you need to launch
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Skip months of setup and configuration. Focus on building your unique features while we handle the foundation.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                        <Card key={feature.title} className="h-full">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-muted rounded-md flex-shrink-0">
                                        <IconComponent className="h-4 w-4 text-foreground" />
                                    </div>
                                    <CardTitle className="text-base sm:text-lg">{feature.title}</CardTitle>
                                </div>
                                <CardDescription className="text-sm sm:text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
