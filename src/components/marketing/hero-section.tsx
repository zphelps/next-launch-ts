import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Github, Star } from "lucide-react";

export function HeroSection() {
    return (
        <section className="container mx-auto max-w-screen-2xl px-4 py-20 sm:py-32 text-center">
            <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
                <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5">
                    🚀 Production Ready
                </Badge>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
                    Ship your SaaS in{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        days, not months
                    </span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Next Launch is a production-ready SaaS starter built with Next.js 15, React Query, Supabase, and shadcn/ui.
                    Everything you need to launch a scalable application with enterprise-grade features.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button size="lg" asChild className="w-full sm:w-auto min-w-[160px]">
                        <Link href="#get-started">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto min-w-[160px]">
                        <Link href="https://github.com/your-username/next-launch-ts" target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            View on GitHub
                        </Link>
                    </Button>
                </div>

                <div className="pt-6 sm:pt-8">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Trusted by developers worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-8 opacity-60">
                        <div className="text-base sm:text-lg lg:text-2xl font-bold">Next.js</div>
                        <div className="text-base sm:text-lg lg:text-2xl font-bold">TypeScript</div>
                        <div className="text-base sm:text-lg lg:text-2xl font-bold">Supabase</div>
                        <div className="text-base sm:text-lg lg:text-2xl font-bold">Tailwind</div>
                    </div>
                </div>

                {/* GitHub Stats */}
                <div className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Open Source</span>
                        </div>
                        <div className="hidden sm:block">•</div>
                        <div>MIT License</div>
                        <div className="hidden sm:block">•</div>
                        <div>Active Community</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
