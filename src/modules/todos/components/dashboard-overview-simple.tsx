'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/loading-spinner';
import {
    CheckSquare,
    Clock,
    AlertCircle,
    Calendar,
    Plus,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

export function DashboardOverview() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    // For now, let's use mock data to test the UI
    const stats = {
        total: 5,
        completed: 2,
        pending: 3,
        overdue: 1,
        due_today: 1,
        due_this_week: 2,
        by_priority: {
            low: 1,
            medium: 2,
            high: 1,
            urgent: 1,
        },
        by_category: {
            Work: 3,
            Personal: 2,
        },
    };

    const recentTodos = [
        {
            id: '1',
            title: 'Complete project documentation',
            description: 'Write comprehensive docs for the new feature',
            completed: false,
            priority: 'high' as const,
            category: 'Work',
            due_date: new Date().toISOString(),
            user_id: 'user-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: '2',
            title: 'Review pull requests',
            description: 'Check and approve pending PRs',
            completed: true,
            priority: 'medium' as const,
            category: 'Work',
            due_date: null,
            user_id: 'user-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    ];

    const statCards = [
        {
            title: 'Total Todos',
            value: stats?.total || 0,
            icon: CheckSquare,
            description: 'All todos created',
            color: 'text-blue-600',
        },
        {
            title: 'Completed',
            value: stats?.completed || 0,
            icon: CheckSquare,
            description: 'Tasks finished',
            color: 'text-green-600',
        },
        {
            title: 'Pending',
            value: stats?.pending || 0,
            icon: Clock,
            description: 'Tasks remaining',
            color: 'text-yellow-600',
        },
        {
            title: 'Overdue',
            value: stats?.overdue || 0,
            icon: AlertCircle,
            description: 'Past due date',
            color: 'text-red-600',
        },
    ];

    const completionRate = stats?.total ? Math.round((stats.completed / stats.total) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Progress Overview */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Progress Overview
                        </CardTitle>
                        <CardDescription>
                            Your productivity at a glance
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Completion Rate</span>
                                <span className="font-medium">{completionRate}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${completionRate}%` }}
                                />
                            </div>
                        </div>

                        {stats && (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-muted-foreground">Due Today</div>
                                    <div className="font-medium">{stats.due_today}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground">This Week</div>
                                    <div className="font-medium">{stats.due_this_week}</div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Priority Breakdown
                        </CardTitle>
                        <CardDescription>
                            Tasks by priority level
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats && (
                            <div className="space-y-3">
                                {Object.entries(stats.by_priority).map(([priority, count]) => (
                                    <div key={priority} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={
                                                    priority === 'urgent' ? 'destructive' :
                                                        priority === 'high' ? 'default' :
                                                            priority === 'medium' ? 'secondary' : 'outline'
                                                }
                                                className="capitalize"
                                            >
                                                {priority}
                                            </Badge>
                                        </div>
                                        <span className="font-medium">{count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Todos */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Todos</CardTitle>
                            <CardDescription>
                                Your latest tasks and updates
                            </CardDescription>
                        </div>
                        <Button onClick={() => setShowCreateDialog(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Todo
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentTodos && recentTodos.length > 0 ? (
                        <div className="space-y-3">
                            {recentTodos.map((todo) => (
                                <div key={todo.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        className="rounded"
                                        readOnly
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium truncate ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                {todo.title}
                                            </span>
                                            <Badge
                                                variant={
                                                    todo.priority === 'urgent' ? 'destructive' :
                                                        todo.priority === 'high' ? 'default' :
                                                            todo.priority === 'medium' ? 'secondary' : 'outline'
                                                }
                                                className="text-xs capitalize"
                                            >
                                                {todo.priority}
                                            </Badge>
                                        </div>
                                        {todo.category && (
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {todo.category}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No todos yet</h3>
                            <p className="text-muted-foreground mb-4">
                                Get started by creating your first todo
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Todo
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Note: Create Todo Dialog would go here when implemented */}
            {showCreateDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-lg font-semibold mb-4">Create Todo (Coming Soon)</h2>
                        <p className="text-muted-foreground mb-4">
                            This dialog will be connected to the backend once the database is set up.
                        </p>
                        <Button onClick={() => setShowCreateDialog(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
