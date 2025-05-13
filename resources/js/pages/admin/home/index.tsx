import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
};

type Schedule = {
    id: number;
    scheduled_date: string;
    scheduled_time: string;
    // ...
};

type Service = {
    id: number;
    name: string;
    price: number;
    // ...
};

interface Props {
    user: User;
    schedule: Schedule[];
    service: Service[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/home',
    },
];

export default function Home(props: Props) {
    const { user, schedule, service } = props;

    console.log(user, schedule, service);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div className="flex flex-col gap-4">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                    <h1 className="text-2xl">Seja Bem-vindo, {user.name}!</h1>
                </div>
                <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full gap-6">
                        <div className="flex h-48 w-1/3 flex-col justify-between rounded-xl bg-white p-6">
                            <div className="flex flex-col gap-3">
                                <h1>Total Faturado</h1>
                                <h1 className="text-3xl font-extrabold">R$5453,90</h1>
                            </div>
                            <p>1.4% Vendas no mês</p>
                        </div>

                        <div className="flex h-48 w-1/3 flex-col justify-between rounded-xl bg-white p-6">
                            <div className="flex flex-col gap-3">
                                <h1>Total Atendimentos</h1>
                                <h1 className="text-3xl font-extrabold">453</h1>
                            </div>
                            <p>1.4% Vendas no mês</p>
                        </div>

                        <div className="flex h-48 w-1/3 flex-col justify-between rounded-xl bg-white p-6">
                            <div className="flex flex-col gap-3">
                                <h1>Total Vendas</h1>
                                <h1 className="text-3xl font-extrabold">R$5453,90</h1>
                            </div>
                            <p>1.4% Vendas no mês</p>
                        </div>
                    </div>

                    <div className="flex w-full gap-6">
                        <div className="flex h-48 w-2/3 flex-col justify-between rounded-xl bg-white p-6"></div>
                        <div className="flex h-48 w-1/3 flex-col justify-between rounded-xl bg-white p-6"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
