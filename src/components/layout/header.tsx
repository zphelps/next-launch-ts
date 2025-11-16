'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useTodoStats } from '@/modules/todos/hooks/useTodos';
import {
    Bell,
    CheckSquare,
    AlertCircle
} from 'lucide-react';

export function Header() {
    const { data: stats } = useTodoStats();

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

            <div className="ml-auto flex items-center gap-4 px-4">
                {/* Quick stats */}
                {stats && (
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="text-muted-foreground">Completed:</span>
                            <Badge variant="secondary">{stats.completed}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span className="text-muted-foreground">Pending:</span>
                            <Badge variant="secondary">{stats.pending}</Badge>
                        </div>
                        {stats.overdue > 0 && (
                            <div className="flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <span className="text-muted-foreground">Overdue:</span>
                                <Badge variant="destructive">{stats.overdue}</Badge>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
