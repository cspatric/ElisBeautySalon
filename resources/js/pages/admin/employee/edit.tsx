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

            <div className="flex flex-col gap-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Editar Profissional</h2>

                <form onSubmit={handleSubmit} className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Nome:</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Email:</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Senha (opcional):</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Confirmar Senha:</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Telefone:</label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Foto:</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="rounded-lg border border-gray-300 px-4 py-2" />
                        {data.photo && <img src={data.photo} alt="Pré-visualização" className="mt-2 h-20 w-20 rounded-full border object-cover" />}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Status:</label>
                        <select
                            value={data.active ? '1' : '0'}
                            onChange={(e) => setData('active', e.target.value === '1')}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        >
                            <option value="1">Ativo</option>
                            <option value="0">Desativado</option>
                        </select>
                    </div>
                </form>

                <div className="flex max-w-4xl justify-end">
                    <Button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
