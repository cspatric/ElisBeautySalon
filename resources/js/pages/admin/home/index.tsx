import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowUpRight, Calendar, Clock, DollarSign, Users } from 'lucide-react';

type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
};

type Schedule = {
    id: number;
    scheduled_date: string;
    scheduled_time: string;
    client_name: string;
    service_name: string;
};

type Service = {
    id: number;
    name: string;
    price: number;
    duration: string;
};

interface Props {
    user: User;
    schedule: Schedule[];
    services: Service[];
    stats?: {
        totalRevenue: number;
        totalAppointments: number;
        totalSales: number;
        growthRate: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/home',
    },
];

export default function Home({
    user,
    schedule = [],
    services = [],
    stats = {
        totalRevenue: 0,
        totalAppointments: 0,
        totalSales: 0,
        growthRate: 0,
    },
}: Props) {
    // Formatar valores monetários
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Olá, {user.name}!</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Aqui está o resumo das suas atividades</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Revenue Card */}
                    <div className="rounded-xl border bg-white p-6 transition-all dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Faturamento Total</h3>
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                            <div className="mt-2 flex items-center text-sm">
                                <span className={`flex items-center ${stats.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {stats.growthRate >= 0 ? <ArrowUpRight className="h-4 w-4" /> : null}
                                    {Math.abs(stats.growthRate)}% em relação ao mês anterior
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Appointments Card */}
                    <div className="rounded-xl border bg-white p-6 transition-all dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Atendimentos</h3>
                            <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold">{stats.totalAppointments}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {stats.totalAppointments > 0 ? `${stats.totalAppointments} agendamentos este mês` : 'Nenhum agendamento este mês'}
                            </p>
                        </div>
                    </div>

                    {/* Sales Card */}
                    <div className="rounded-xl border bg-white p-6 transition-all dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Vendas</h3>
                            <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold">{formatCurrency(stats.totalSales)}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {stats.totalSales > 0 && stats.totalAppointments > 0
                                    ? `${formatCurrency(stats.totalSales / stats.totalAppointments)} por atendimento`
                                    : 'Sem vendas registradas'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Upcoming Appointments */}
                    <div className="rounded-xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-semibold">Próximos Agendamentos</h3>
                        <div className="mt-4 space-y-4">
                            {schedule.slice(0, 3).map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <div>
                                        <p className="font-medium">{appointment.client_name}</p>
                                        <p className="text-sm text-gray-500">{appointment.service_name}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4" />
                                        <span>{appointment.scheduled_date}</span>
                                        <Clock className="h-4 w-4" />
                                        <span>{appointment.scheduled_time}</span>
                                    </div>
                                </div>
                            ))}
                            {schedule.length === 0 && <p className="text-center text-sm text-gray-500">Nenhum agendamento próximo</p>}
                        </div>
                    </div>

                    {/* Popular Services */}
                    <div className="rounded-xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="text-lg font-semibold">Serviços Populares</h3>
                        <div className="mt-4 space-y-4">
                            {services.slice(0, 3).map((service) => (
                                <div
                                    key={service.id}
                                    className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <div>
                                        <p className="font-medium">{service.name}</p>
                                        <p className="text-sm text-gray-500">Duração: {service.duration}</p>
                                    </div>
                                    <p className="font-semibold">{formatCurrency(service.price)}</p>
                                </div>
                            ))}
                            {services.length === 0 && <p className="text-center text-sm text-gray-500">Nenhum serviço cadastrado</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
