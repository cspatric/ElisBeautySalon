import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { CalendarCheck, ContactRound, House, ShoppingBasket, SquareChartGantt } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: '/admin/home',
        icon: House,
    },
    {
        title: 'Agenda',
        href: '/admin/schedule',
        icon: CalendarCheck,
    },
    {
        title: 'Funcionarios',
        href: '/admin/employee',
        icon: ContactRound,
    },
    {
        title: 'Serviços',
        href: '/admin/service',
        icon: SquareChartGantt,
    },
    {
        title: 'Produtos',
        href: '/admin/product',
        icon: ShoppingBasket,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/home" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
