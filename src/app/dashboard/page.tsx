'use client';
import { DashboardOverview } from '@/modules/todos/components/dashboard-overview-simple';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here&apos;s an overview of your todos and categories.
                </p>
            </div>

            <DashboardOverview />
        </div>
    );
}