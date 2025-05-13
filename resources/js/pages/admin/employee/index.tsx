import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
};

type Employee = {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
    active: boolean;
};

interface Props {
    user: User;
    employees: Employee[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Funcionarios',
        href: '/employee',
    },
];

export default function Index({ employees }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funcionários" />
            <div className="flex flex-col gap-6 p-6">
                {/* Cards superiores */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Total Funcionários</p>
                        <p className="text-2xl font-bold">{employees.length}</p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Funcionários Ativos</p>
                        <p className="text-2xl font-bold">{employees.filter((employee) => employee.active).length}</p>
                    </div>

                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Funcionários Desativados</p>
                        <p className="text-2xl font-bold">{employees.filter((employee) => !employee.active).length}</p>
                    </div>
                </div>

                {/* Botão adicionar */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.visit(route('employee.create'))}
                        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Adicionar Profissional
                    </Button>
                </div>

                {/* Lista de profissionais */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Profissionais</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {employees.map((employee) => (
                            <div key={employee.id} className="flex items-center gap-4 rounded-xl bg-white p-4">
                                <img
                                    src={employee.photo || 'https://via.placeholder.com/48'}
                                    alt={employee.name}
                                    className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                                />
                                <div>
                                    <p className="text-base font-medium text-gray-800">{employee.name}</p>
                                    <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">Funcionário</span>
                                    <p className="text-sm text-gray-500">{employee.phone}</p>
                                    <p className="text-sm text-gray-500">{employee.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
