import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CodeExamplesSection() {
    return (
        <section id="examples" className="container mx-auto max-w-screen-2xl px-4 py-16 sm:py-24">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                    See it in action
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Clean, maintainable code that follows best practices and scales with your application.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Type-safe API calls</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            End-to-end type safety from database to UI with React Query
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/30 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                            <div className="text-muted-foreground">{`// hooks/useTodos.ts`}</div>
                            <div className="mt-2">
                                <span className="text-blue-600">export function</span> <span className="text-purple-600">useTodos</span>() {"{"}
                            </div>
                            <div className="ml-2">
                                <span className="text-blue-600">const</span> {"{"} user {"}"} = <span className="text-purple-600">useAuth</span>();
                            </div>
                            <div className="ml-2 mt-1">
                                <span className="text-blue-600">return</span> <span className="text-purple-600">useQuery</span>({"{"}
                            </div>
                            <div className="ml-4">
                                <span className="text-green-600">queryKey</span>: [<span className="text-orange-600">&apos;todos&apos;</span>, user?.id],
                            </div>
                            <div className="ml-4">
                                <span className="text-green-600">queryFn</span>: () =&gt; <span className="text-purple-600">todoService</span>.<span className="text-blue-600">getTodos</span>(user!.id),
                            </div>
                            <div className="ml-4">
                                <span className="text-green-600">enabled</span>: !!user?.id,
                            </div>
                            <div className="ml-2">{"});"}</div>
                            <div>{"}"}</div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Modular architecture</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Feature-based organization for scalability and maintainability
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/30 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm">
                            <div className="text-muted-foreground">{`// Project structure`}</div>
                            <div className="mt-2 space-y-1">
                                <div>📁 modules/</div>
                                <div className="ml-2">📁 todos/</div>
                                <div className="ml-4">📁 components/</div>
                                <div className="ml-4">📁 hooks/</div>
                                <div className="ml-4">📁 services/</div>
                                <div className="ml-4">📄 types.ts</div>
                                <div className="ml-4">📄 validations.ts</div>
                                <div className="ml-2 mt-2">📁 auth/</div>
                                <div className="ml-4">📁 components/</div>
                                <div className="ml-4">📄 service.ts</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Database with Row Level Security</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Secure, scalable PostgreSQL with automatic type generation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/30 rounded-md p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
                            <div className="text-muted-foreground">{`-- RLS Policy Example`}</div>
                            <div className="mt-2">
                                <span className="text-blue-600">create policy</span> <span className="text-orange-600">&quot;Users can view their own todos&quot;</span>
                            </div>
                            <div className="ml-2">
                                <span className="text-blue-600">on</span> <span className="text-purple-600">public</span>.<span className="text-green-600">todos</span> <span className="text-blue-600">for select</span>
                            </div>
                            <div className="ml-2">
                                <span className="text-blue-600">to</span> <span className="text-purple-600">authenticated</span>
                            </div>
                            <div className="ml-2">
                                <span className="text-blue-600">using</span> (<span className="text-purple-600">auth</span>.<span className="text-green-600">uid</span>() = <span className="text-green-600">user_id</span>);
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
