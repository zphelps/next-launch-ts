import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const techStack = [
    { name: "Next.js 15", description: "React framework with App Router", category: "Framework" },
    { name: "TypeScript", description: "Type-safe JavaScript", category: "Language" },
    { name: "Supabase", description: "PostgreSQL + Auth + Real-time", category: "Backend" },
    { name: "React Query", description: "Data fetching & caching", category: "State" },
    { name: "shadcn/ui", description: "Beautiful UI components", category: "UI" },
    { name: "Tailwind CSS", description: "Utility-first styling", category: "Styling" },
    { name: "Zod", description: "Schema validation", category: "Validation" },
    { name: "Jest", description: "Testing framework", category: "Testing" },
    { name: "Vercel", description: "Deployment & hosting", category: "Deploy" },
    { name: "ESLint", description: "Code linting & formatting", category: "Quality" },
    { name: "Framer Motion", description: "Animation library", category: "Animation" },
    { name: "React Hook Form", description: "Form management", category: "Forms" }
];

export function TechStackSection() {
    return (
        <section id="tech-stack" className="bg-muted/10 py-20 sm:py-32">
            <div className="container mx-auto max-w-screen-2xl px-4">
                <div className="text-center mb-16 sm:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
                        Built with modern technologies
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Carefully selected tools that work seamlessly together for maximum developer productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {techStack.map((tech) => (
                        <Card key={tech.name} className="text-center h-full">
                            <CardHeader className="pb-4">
                                <Badge variant="secondary" className="w-fit mx-auto mb-2 text-xs">
                                    {tech.category}
                                </Badge>
                                <CardTitle className="text-base sm:text-lg">{tech.name}</CardTitle>
                                <CardDescription className="text-sm">{tech.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
