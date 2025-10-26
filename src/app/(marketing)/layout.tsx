import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Github, Twitter, Menu } from "lucide-react";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                            NL
                        </div>
                        <span className="font-bold text-xl">Next Launch</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60 scroll-smooth">
                            Features
                        </Link>
                        <Link href="#tech-stack" className="transition-colors hover:text-foreground/80 text-foreground/60 scroll-smooth">
                            Tech Stack
                        </Link>
                        <Link href="#examples" className="transition-colors hover:text-foreground/80 text-foreground/60 scroll-smooth">
                            Examples
                        </Link>
                        <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60 scroll-smooth">
                            Pricing
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
                            <Link href="https://github.com/your-username/next-launch-ts" target="_blank">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <Button className="hidden sm:inline-flex" asChild>
                            <Link href="#get-started">Get Started</Link>
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col space-y-4">
                                    <Link href="#features" className="text-lg font-medium hover:text-primary transition-colors">
                                        Features
                                    </Link>
                                    <Link href="#tech-stack" className="text-lg font-medium hover:text-primary transition-colors">
                                        Tech Stack
                                    </Link>
                                    <Link href="#examples" className="text-lg font-medium hover:text-primary transition-colors">
                                        Examples
                                    </Link>
                                    <Link href="#pricing" className="text-lg font-medium hover:text-primary transition-colors">
                                        Pricing
                                    </Link>
                                    <div className="pt-4 space-y-2">
                                        <Button className="w-full" asChild>
                                            <Link href="#get-started">Get Started</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href="https://github.com/your-username/next-launch-ts" target="_blank">
                                                <Github className="mr-2 h-4 w-4" />
                                                GitHub
                                            </Link>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/50">
                <div className="container mx-auto max-w-screen-2xl px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
                                    NL
                                </div>
                                <span className="font-bold">Next Launch</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                The production-ready SaaS starter that gets you from idea to launch in days, not months.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Product</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                                <li><Link href="#tech-stack" className="hover:text-foreground transition-colors">Tech Stack</Link></li>
                                <li><Link href="#examples" className="hover:text-foreground transition-colors">Examples</Link></li>
                                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Resources</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                                <li><Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link></li>
                                <li><Link href="/support" className="hover:text-foreground transition-colors">Support</Link></li>
                                <li><Link href="/changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Connect</h3>
                            <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href="https://github.com/your-username/next-launch-ts" target="_blank">
                                        <Github className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href="https://twitter.com/nextlaunch" target="_blank">
                                        <Twitter className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                            © 2024 Next Launch. All rights reserved.
                        </p>
                        <div className="flex space-x-4 text-xs text-muted-foreground mt-4 sm:mt-0">
                            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
