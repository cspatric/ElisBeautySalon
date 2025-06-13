import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent className="w-full border-l border-gray-200 bg-[#F1F1F1] dark:border-gray-700 dark:bg-gray-900">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="overflow-y-auto px-6 py-3 text-gray-800 dark:text-gray-100">{children}</div>
            </AppContent>
        </AppShell>
    );
}
