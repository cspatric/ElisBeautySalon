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
        active: true as boolean,
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

            <div className="flex flex-col gap-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Cadastro de Profissionais</h2>

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
                        <label className="mb-1 text-gray-600">Senha:</label>
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
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setData('photo', reader.result as string); // Base64 string
                                };
                                reader.readAsDataURL(file);
                            }}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
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

                    {/* Serviços com checkbox */}
                    <div className="col-span-2 flex flex-col">
                        <label className="mb-2 text-gray-600">Serviços:</label>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                            {services.map((service) => (
                                <label key={service.id} className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3">
                                    <input
                                        type="checkbox"
                                        checked={Array.isArray(data.services) && data.services.includes(service.id)}
                                        onChange={() => toggleService(service.id)}
                                        className="mt-1"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{service.name}</p>
                                        <p className="text-sm text-gray-500">{service.description}</p>
                                        <p className="text-sm text-gray-400">R$ {service.price}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </form>

                <div className="flex max-w-4xl justify-end">
                    <Button
                        type="submit"
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {processing ? 'Salvando...' : 'Adicionar Profissional'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
