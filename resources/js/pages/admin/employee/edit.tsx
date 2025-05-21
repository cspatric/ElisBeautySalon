import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
    active: boolean;
    services: number[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workschedule: any[];
    pagepermissions: string[];
}

interface Props {
    employee: Employee;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Funcionários', href: '/employee' },
    { title: 'Editar', href: '#' },
];

export default function EditEmployee({ employee }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone || '',
        photo: employee.photo || '',
        password: '',
        password_confirmation: '',
        services: employee.services || [],
        workschedule: employee.workschedule || [],
        active: employee.active,
        pagepermissions: employee.pagepermissions || [],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setData('photo', reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('employee.update', { id: employee.id }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Profissional" />

            <div className="mx-auto flex max-w-6xl flex-col gap-8 p-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Editar Profissional</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Atualize as informações do profissional</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Coluna 1 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nome <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="Nome completo"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="email@exemplo.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                <select
                                    value={data.active ? '1' : '0'}
                                    onChange={(e) => setData('active', e.target.value === '1')}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="1">Ativo</option>
                                    <option value="0">Desativado</option>
                                </select>
                            </div>
                        </div>

                        {/* Coluna 2 */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha (opcional)</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Senha</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                        <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6 text-center">
                                            <svg
                                                className="h-8 w-8 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                ></path>
                                            </svg>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                                            </p>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                    {data.photo && (
                                        <div className="relative">
                                            <img
                                                src={data.photo}
                                                alt="Pré-visualização"
                                                className="h-32 w-32 rounded-lg border border-gray-200 object-cover dark:border-gray-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setData('photo', '')}
                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
                        <Button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="h-4 w-4 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Salvando...
                                </span>
                            ) : (
                                'Salvar Alterações'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
