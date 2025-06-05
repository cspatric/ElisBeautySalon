import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

type Service = {
    id: number;
    name: string;
    price: number;
    duration: number;
    active: boolean;
    photo: string[]; // base64 ou URL
};

interface Props {
    services: Service[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Serviços', href: '/service' }];

export default function Index({ services }: Props) {
    const total = services.length;
    const active = services.filter((s) => s.active).length;
    const inactive = total - active;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Serviços" />

            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
                {/* Cabeçalho */}
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Serviços</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie os serviços oferecidos no seu salão</p>
                    </div>
                    <Button
                        onClick={() => router.visit(route('service.create'))}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Adicionar Serviço
                    </Button>
                </div>

                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ativos</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{active}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Inativos</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{inactive}</p>
                    </div>
                </div>

                {/* Lista de serviços */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Lista de Serviços</h2>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {services.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 dark:text-gray-400">Nenhum serviço cadastrado.</div>
                        ) : (
                            services.map((service) => (
                                <div key={service.id} className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={service.photo?.[0] || 'https://via.placeholder.com/100'}
                                                alt={service.name}
                                                className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-600"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-base font-medium text-gray-800 dark:text-white">{service.name}</p>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            service.active
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                                                        }`}
                                                    >
                                                        {service.active ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    R$ {Number(service.price).toFixed(2)} • {Math.floor(service.duration / 60)}h{' '}
                                                    {service.duration % 60}min
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                onClick={() => router.visit(route('service.edit', { id: service.id }))}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2 h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Editar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
