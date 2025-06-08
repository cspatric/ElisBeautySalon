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
        title: 'Funcionários',
        href: '/employee',
    },
];

export default function Index({ employees }: Props) {
    const activeEmployees = employees.filter((employee) => employee.active).length;
    const inactiveEmployees = employees.filter((employee) => !employee.active).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funcionários" />

            <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Funcionários</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gerencie todos os profissionais da sua equipe</p>
                    </div>

                    <Button
                        onClick={() => router.visit(route('employee.create'))}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-white transition-colors hover:bg-red-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Adicionar Profissional
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Funcionários</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{employees.length}</p>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Funcionários Ativos</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeEmployees}</p>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Funcionários Inativos</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{inactiveEmployees}</p>
                            </div>
                            <div className="rounded-lg bg-red-100 p-3 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee List */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Lista de Profissionais</h2>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {employees.length === 0 ? (
                            <div className="p-6 text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum funcionário cadastrado</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Adicione seu primeiro profissional clicando no botão acima.
                                </p>
                                <div className="mt-6">
                                    <Button
                                        onClick={() => router.visit(route('employee.create'))}
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 -ml-1 h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Adicionar Profissional
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            employees.map((employee) => (
                                <div key={employee.id} className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={
                                                    employee.photo ||
                                                    'https://ui-avatars.com/api/?name=' + encodeURIComponent(employee.name) + '&background=random'
                                                }
                                                alt={employee.name}
                                                className="h-12 w-12 rounded-full bg-gray-200 object-cover dark:bg-gray-600"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-base font-medium text-gray-800 dark:text-white">{employee.name}</p>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            employee.active
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                                                        }`}
                                                    >
                                                        {employee.active ? 'Ativo' : 'Inativo'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{employee.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                className="text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                                                onClick={() => router.visit(route('employee.edit', { id: employee.id }))}
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
