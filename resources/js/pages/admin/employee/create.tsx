import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

type Schedule = {
    id: number;
    scheduled_date: string;
    scheduled_time: string;
    service_id: number;
    employee_id: number;
};

type Service = {
    id: number;
    name: string;
    description: string;
    photo: { url: string } | null;
    price: string;
};

type Employee = {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
};

type User = {
    id: number;
    name: string;
    email: string;
};

interface Props {
    user: User;
    schedule: Schedule[];
    services: Service[];
    employees: Employee[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Funcionários', href: '/employee' },
    { title: 'Cadastrar', href: '/employee/create' },
];

// ...imports mantidos

export default function Create({ services }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        photo: '',
        services: [] as number[],
        workschedule: [],
        active: true,
        pagepermissions: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employee.store'));
    };

    const toggleService = (serviceId: number) => {
        const current = Array.isArray(data.services) ? data.services : [];
        setData('services', current.includes(serviceId) ? current.filter((id) => id !== serviceId) : [...current, serviceId]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Profissionais" />

            <div className="mx-auto flex max-w-6xl flex-col gap-8 p-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Cadastro de Profissionais</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Preencha os dados do novo profissional</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Coluna 1 */}
                        <div className="space-y-6">
                            <InputField
                                label="Nome"
                                required
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                            />
                            <InputField
                                label="Email"
                                required
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                            />
                            <InputField
                                label="Telefone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
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
                            <InputField
                                label="Senha"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputField
                                label="Confirmar Senha"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setData('photo', reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 file:cursor-pointer dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {data.photo && (
                                    <img
                                        src={data.photo}
                                        alt="Pré-visualização"
                                        className="mt-2 h-24 w-24 rounded-full border object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Lista de Serviços */}
                    <div className="mt-6 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Serviços</label>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {services.map((service) => (
                                <label key={service.id} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={data.services.includes(service.id)}
                                        onChange={() => toggleService(service.id)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-white">{service.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500">R$ {service.price}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
                        <Button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? 'Salvando...' : 'Adicionar Profissional'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

// Componente reutilizável
function InputField({
    label,
    type,
    value,
    onChange,
    required = false,
    error,
}: {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

