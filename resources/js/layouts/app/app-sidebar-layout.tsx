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
            <AppContent className='w-full border-l bg-[#F1F1F1]'>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className='overflow-y-auto'>
                {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
