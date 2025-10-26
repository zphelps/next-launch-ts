import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, ExternalLink, Copy } from "lucide-react";

export function CTASection() {
    return (
        <section id="get-started" className="container mx-auto max-w-screen-2xl px-4 py-20 sm:py-32">
            <div className="text-center space-y-8 sm:space-y-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    Ready to launch your SaaS?
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join thousands of developers who have shipped faster with Next Launch.
                    Start building your next big idea today.
                </p>

                {/* Quick start commands */}
                <div className="bg-muted/30 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
                    <div className="text-left">
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-xs sm:text-sm text-muted-foreground">Get started in 3 commands:</div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                onClick={() => {
                                    const commands = `git clone https://github.com/your-username/next-launch-ts.git
npm install
npm run dev`;
                                    navigator.clipboard.writeText(commands);
                                }}
                            >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                            </Button>
                        </div>
                        <div className="bg-background border border-border rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-1 overflow-x-auto">
                            <div><span className="text-muted-foreground">$</span> git clone https://github.com/your-username/next-launch-ts.git</div>
                            <div><span className="text-muted-foreground">$</span> npm install</div>
                            <div><span className="text-muted-foreground">$</span> npm run dev</div>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <Button size="lg" asChild className="w-full sm:w-auto">
                        <Link href="https://github.com/your-username/next-launch-ts" target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            Clone Repository
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                        <Link href="/docs" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Read Documentation
                        </Link>
                    </Button>
                </div>

                {/* Additional info */}
                <div className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-xs sm:text-sm text-muted-foreground">
                        <div>✨ No setup required</div>
                        <div className="hidden sm:block">•</div>
                        <div>🚀 Deploy in minutes</div>
                        <div className="hidden sm:block">•</div>
                        <div>💝 Free forever</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
