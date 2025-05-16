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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Serviços" />
            <div className="flex flex-col gap-6 p-6">
                {/* Cards superiores */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Total Serviços</p>
                        <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Serviços Ativos</p>
                        <p className="text-2xl font-bold">{active}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Serviços Inativos</p>
                        <p className="text-2xl font-bold">{total - active}</p>
                    </div>
                </div>

                {/* Botão adicionar */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.visit(route('service.create'))}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Adicionar Serviço
                    </Button>
                </div>

                {/* Lista de serviços */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Serviços</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {services.map((service) => (
                            <div key={service.id} className="rounded-xl bg-white p-3">
                                <div className="aspect-video overflow-hidden rounded-lg border border-gray-200">
                                    <img
                                        src={service.photo?.[0] || 'https://via.placeholder.com/300x150'}
                                        alt={service.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="font-medium text-gray-800">{service.name}</p>
                                    <p className="text-sm text-gray-600">R${Number(service.price).toFixed(2)}</p>
                                    <p className="text-xs text-gray-400">
                                        {Math.floor(service.duration / 60)}h {service.duration % 60}min
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
