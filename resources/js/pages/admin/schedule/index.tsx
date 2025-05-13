import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { FormEvent, ReactNode, useState } from 'react';

type Schedule = {
    client_observation: string;
    client_phone: ReactNode;
    client_name: ReactNode;
    status: string;
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

interface Props {
    user: User;
    schedule: Schedule[];
    services: Service[];
    employees: Employee[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Agenda',
        href: '/schedule',
    },
];

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function Home(props: Props) {
    const { schedule, services, employees } = props;
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [status, setStatus] = useState<string>('pending');

    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [onlyMySchedules, setOnlyMySchedules] = useState(false);

    const filteredSchedule = schedule.filter((item) => {
        const itemDate = new Date(item.scheduled_date);
        const matchService = selectedService === null || item.service_id === selectedService;
        const matchStart = startDate === '' || itemDate >= new Date(startDate);
        const matchEnd = endDate === '' || itemDate <= new Date(endDate);
        const cliente = item.client_name?.toLowerCase() ?? '';
        const matchSearch = cliente.includes(search);
        const matchUser = !onlyMySchedules || item.employee_id === props.user.id;

        return matchService && matchStart && matchEnd && matchSearch && matchUser;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedSchedule) return;

        router.post(
            route('schedule.updateStatus', selectedSchedule.id),
            {
                status,
                _method: 'put',
            },
            {
                onSuccess: () => {
                    setSelectedSchedule(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* MÊSES */}
                {/* FILTROS */}
                <div className="flex w-full flex-col gap-4 rounded-xl bg-white px-6 py-6 shadow">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                        {/* Filtro por serviço */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-semibold text-gray-700">Serviço</label>
                            <select
                                value={selectedService ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedService(value === '' ? null : parseInt(value));
                                    setSelectedSchedule(null);
                                }}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Todos</option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Data de início */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-semibold text-gray-700">Data inicial</label>
                            <input
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Data de término */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-semibold text-gray-700">Data final</label>
                            <input
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Campo de busca */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-semibold text-gray-700">Buscar cliente</label>
                            <input
                                type="text"
                                placeholder="Digite o nome"
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Checkbox - apenas meus agendamentos */}
                        <div className="flex flex-col justify-end">
                            <label className="inline-flex items-center space-x-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    id="onlyMine"
                                    checked={onlyMySchedules}
                                    onChange={(e) => setOnlyMySchedules(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Somente meus</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* AGENDAMENTOS + FORM */}
                <div className="flex w-full gap-6">
                    {/* LISTAGEM DE AGENDAMENTOS */}
                    <div className="flex h-80 w-1/2 flex-col gap-5 overflow-y-auto rounded-xl bg-white p-5">
                        <h1 className="text-xl text-[#6E6E6E]">
                            {selectedMonth !== null ? `Agendamentos de ${months[selectedMonth]}` : 'Selecione um mês'}
                        </h1>
                        <div className="flex w-full flex-col gap-2">
                            {filteredSchedule.map((item) => {
                                const servico = services.find((s) => s.id === item.service_id);
                                const funcionario = employees.find((e) => e.id === item.employee_id);

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedSchedule(item);
                                            setStatus(item.status);
                                        }}
                                        className={`flex w-full cursor-pointer gap-5 rounded-lg p-3 ${
                                            selectedSchedule?.id === item.id ? 'bg-gray-200' : 'bg-gray-100'
                                        }`}
                                    >
                                        <div className="border-r border-white pr-5">
                                            <p className="text-sm">{item.scheduled_time}</p>
                                        </div>
                                        <div className="flex flex-col items-start justify-start gap-2">
                                            <div>
                                                <h1 className="text-xl">{servico?.name ?? 'Serviço não encontrado'}</h1>
                                                <p className="text-sm">{funcionario?.name ?? 'Funcionário não encontrado'}</p>
                                            </div>
                                            <p
                                                className={`w-auto rounded-sm px-2 py-1 text-xs font-bold ${
                                                    item.status === 'confirmed'
                                                        ? 'bg-green-500'
                                                        : item.status === 'cancelled'
                                                          ? 'bg-red-500'
                                                          : item.status === 'pending'
                                                            ? 'bg-orange-500'
                                                            : item.status === 'finalized'
                                                              ? 'bg-blue-500'
                                                              : 'bg-gray-300'
                                                }`}
                                            >
                                                {item.status === 'confirmed'
                                                    ? 'Confirmado'
                                                    : item.status === 'cancelled'
                                                      ? 'Cancelado'
                                                      : item.status === 'pending'
                                                        ? 'Pendente'
                                                        : item.status === 'finalized'
                                                          ? 'Finalizado'
                                                          : item.status}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredSchedule.length === 0 && selectedMonth !== null && (
                                <p className="text-sm text-gray-500">Nenhum agendamento para este mês.</p>
                            )}
                        </div>
                    </div>

                    {/* FORMULÁRIO DE STATUS */}
                    <div className="flex h-auto w-1/2 flex-col rounded-xl bg-white p-6">
                        {selectedSchedule ? (
                            <>
                                <h1 className="mb-4 text-2xl font-semibold text-gray-800">
                                    {services.find((s) => s.id === selectedSchedule.service_id)?.name || 'Serviço'}
                                </h1>

                                <div className="mb-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                                    <div>
                                        <p className="font-medium">Data</p>
                                        <p>{selectedSchedule.scheduled_date}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Horário</p>
                                        <p>{selectedSchedule.scheduled_time}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Cliente</p>
                                        <p>{selectedSchedule.client_name}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Telefone</p>
                                        <p>{selectedSchedule.client_phone}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Observações</p>
                                        <p className="text-gray-600 italic">{selectedSchedule.client_observation || 'Nenhuma'}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="status" className="text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value;
                                                setStatus(newStatus);
                                                router.post(
                                                    route('schedule.updateStatus', selectedSchedule.id),
                                                    {
                                                        status: newStatus,
                                                        _method: 'put',
                                                    },
                                                    {
                                                        onSuccess: () => {
                                                            // Você pode optar por manter o selectedSchedule ou resetar aqui
                                                        },
                                                    },
                                                );
                                            }}
                                            className="mt-1 w-32 rounded border border-gray-300 bg-white p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            required
                                        >
                                            <option value="pending">Pendente</option>
                                            <option value="confirmed">Confirmado</option>
                                            <option value="finalized">Finalizado</option>
                                            <option value="cancelled">Cancelado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="font-medium">Profissional</p>
                                        <p>{employees.find((e) => e.id === selectedSchedule.employee_id)?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Valor</p>
                                        <p>R$ {Number(services.find((s) => s.id === selectedSchedule.service_id)?.price || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-medium">Descrição do Serviço</p>
                                        <p className="text-gray-600">{services.find((s) => s.id === selectedSchedule.service_id)?.description}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">Selecione um agendamento para editar o status.</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
