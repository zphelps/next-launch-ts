import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const features = [
    "Complete source code",
    "All features included",
    "MIT License",
    "Community support",
    "Regular updates",
    "No vendor lock-in",
    "Production deployment guide",
    "Comprehensive documentation"
];

export function PricingSection() {
    return (
        <section id="pricing" className="bg-muted/20 py-16 sm:py-24">
            <div className="container mx-auto max-w-screen-2xl px-4">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get started for free. No hidden fees, no vendor lock-in. Build something amazing.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    <Card className="relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                        </div>
                        <CardHeader className="text-center pb-6 sm:pb-8 pt-10 sm:pt-12">
                            <CardTitle className="text-xl sm:text-2xl">Open Source</CardTitle>
                            <div className="text-3xl sm:text-4xl font-bold">$0</div>
                            <CardDescription className="text-sm sm:text-base">Forever free, forever yours</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-6">
                            <ul className="space-y-2 sm:space-y-3">
                                {features.map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                                        <span className="text-sm sm:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 sm:pt-6">
                                <Button className="w-full" size="lg" asChild>
                                    <Link href="#get-started">
                                        Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional value proposition */}
                <div className="text-center mt-8 sm:mt-12">
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                        Save weeks of development time and focus on what makes your product unique.
                        No subscriptions, no limitations.
                    </p>
                </div>
            </div>
        </section>
    );
}
