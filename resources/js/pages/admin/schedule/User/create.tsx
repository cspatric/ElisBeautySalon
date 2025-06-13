import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Employee = {
    id: number;
    name: string;
    photo: string | null;
};

type Service = {
    id: number;
    name: string;
    price: number;
    photo: { url: string } | null;
};

interface Props {
    employees: Employee[];
    services: Service[];
}

export default function UserScheduleCreate({ employees, services }: Props) {
    const { data, setData, post, processing } = useForm({
        service_id: '',
        employee_id: '',
        scheduled_date: '',
        scheduled_time: '',
        client_name: '',
        client_phone: '',
        client_observation: '',
        status: 'pending',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [step, setStep] = useState<'home' | 'resumo' | 'profissional' | 'dados_cliente'>('home');

    const selectedService = services.find((s) => s.id === Number(data.service_id));
    const selectedEmployee = employees.find((e) => e.id === Number(data.employee_id));

    const filteredServices = services.filter((service) => service.active && service.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredEmployees = employees.filter((emp) => emp.active && emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <Head title="Agendamento" />
            <div className="flex flex-col gap-6 bg-white">
                {/* Cabeçalho com saudação e busca */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-12 lg:px-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-2">
                            <h2 className="text-3xl font-bold text-gray-900">Olá, seja bem-vindo!</h2>
                            <p className="text-lg text-gray-600">O que vamos fazer hoje?</p>
                        </div>

                        <div className="relative mt-6 max-w-2xl">
                            <input
                                type="text"
                                placeholder="Busque por serviços, profissionais..."
                                className="w-full rounded-xl border border-gray-300 px-5 py-3 pl-12 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <svg className="absolute top-3 left-3 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="min-h-screen bg-white py-8 text-gray-800">
                    {step === 'home' && (
                        <div className="container mx-auto px-4">
                            {/* Seção de Serviços */}
                            <section className="mb-12">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Nossos Serviços</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className={`group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md ${data.service_id === service.id.toString() ? 'ring-2 ring-blue-500' : ''}`}
                                            onClick={() => {
                                                setData('service_id', service.id.toString());
                                                setStep('resumo');
                                            }}
                                        >
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    src={service.photo?.url || '/placeholder-service.jpg'}
                                                    alt={service.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-4">
                                                <h3 className="font-semibold text-white drop-shadow-md">
                                                    {service.name.length > 20
                                                        ? service.name.slice(0, 20).includes(' ')
                                                            ? service.name.slice(0, service.name.slice(0, 20).lastIndexOf(' ')) + '...'
                                                            : service.name.slice(0, 17) + '...'
                                                        : service.name}
                                                </h3>

                                                <p className="text-sm text-blue-100 drop-shadow-md">R$ {Number(service.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Seção de Profissionais */}
                            <section>
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Nossos Profissionais</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {filteredEmployees.map((employee) => (
                                        <div
                                            key={employee.id}
                                            className={`flex flex-col items-center rounded-xl border border-gray-200 p-4 transition-all ${data.employee_id === employee.id.toString() ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
                                            onClick={() => setData('employee_id', employee.id.toString())}
                                        >
                                            <div className="relative mb-3 h-20 w-20">
                                                <img
                                                    src={employee.photo || '/placeholder-avatar.jpg'}
                                                    alt={employee.name}
                                                    className="h-full w-full rounded-full border-2 border-white object-cover shadow-sm"
                                                />
                                                {data.employee_id === employee.id.toString() && (
                                                    <div className="absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-white bg-blue-500" />
                                                )}
                                            </div>
                                            <h3 className="font-medium text-gray-900">
                                                {employee.name.length > 20
                                                    ? employee.name.slice(0, employee.name.slice(0, 20).lastIndexOf(' ')) + '...'
                                                    : employee.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">Especialista</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {step === 'resumo' && selectedService && (
                        <div className="container mx-auto max-w-3xl px-4">
                            <div className="mb-8">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">Agendamento</h2>
                                <p className="text-gray-600">Preencha os detalhes do seu agendamento</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block font-medium text-gray-700">Data do Serviço</label>
                                    <input
                                        type="date"
                                        value={data.scheduled_date}
                                        onChange={(e) => setData('scheduled_date', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium text-gray-700">Horário Disponível</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['10:30', '11:30', '13:30', '14:30'].map((time) => (
                                            <button
                                                key={time}
                                                type="button"
                                                className={`rounded-full border px-5 py-2 transition-all ${data.scheduled_time === time ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => setData('scheduled_time', time)}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedService.name}</h3>
                                        <p className="text-gray-500">Duração média: 2 horas e meia</p>
                                    </div>

                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Data</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_date || '--'}</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_time || '--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Profissional</p>
                                            <p className="font-medium text-gray-900">{selectedEmployee?.name || 'Não selecionado'}</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep('profissional')}
                                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'profissional' && (
                        <div className="container mx-auto max-w-3xl px-4">
                            <div className="mb-8">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">Selecione seu Profissional</h2>
                                <p className="text-gray-600">Escolha o profissional que irá realizar seu serviço</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                        {employees.map((employee) => (
                                            <div
                                                key={employee.id}
                                                onClick={() => setData('employee_id', employee.id.toString())}
                                                className={`flex cursor-pointer flex-col items-center rounded-xl border p-4 transition-all ${Number(data.employee_id) === employee.id ? 'bg-blue-50 ring-2 ring-blue-500' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                                            >
                                                <img
                                                    src={employee.photo || '/placeholder-avatar.jpg'}
                                                    className="mb-3 h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm"
                                                    alt={employee.name}
                                                />
                                                <h3 className="font-medium text-gray-900">
                                                    {employee.name.length > 20
                                                        ? employee.name.slice(0, employee.name.slice(0, 20).lastIndexOf(' ')) + '...'
                                                        : employee.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">Maquiadora</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block font-medium text-gray-700">Observações</label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                        placeholder="Alguma observação importante para o profissional?"
                                        onChange={(e) => setData('client_observation', e.target.value)}
                                    />
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedService?.name}</h3>
                                        <p className="text-gray-500">Duração média: 2 horas e meia</p>
                                    </div>

                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Data</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_date || '--'}</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_time || '--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Profissional</p>
                                            <p className="font-medium text-gray-900">{selectedEmployee?.name || 'Não selecionado'}</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep('dados_cliente')}
                                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'dados_cliente' && (
                        <div className="container mx-auto max-w-3xl px-4">
                            <div className="mb-8">
                                <h2 className="mb-2 text-2xl font-bold text-gray-900">Seus Dados</h2>
                                <p className="text-gray-600">Preencha seus dados para finalizar o agendamento</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">Nome Completo</label>
                                        <input
                                            type="text"
                                            value={data.client_name || ''}
                                            onChange={(e) => setData('client_name', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">Telefone</label>
                                        <input
                                            type="tel"
                                            value={data.client_phone || ''}
                                            onChange={(e) => setData('client_phone', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            placeholder="(00) 00000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                                    <div className="mb-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedService?.name}</h3>
                                        <p className="text-gray-500">Duração média: 2 horas e meia</p>
                                    </div>

                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Data</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_date || '--'}</p>
                                            <p className="font-medium text-gray-900">{data.scheduled_time || '--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Profissional</p>
                                            <p className="font-medium text-gray-900">{selectedEmployee?.name || 'Não selecionado'}</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => post(route('schedule.store'))}
                                        disabled={processing}
                                        className={`w-full rounded-lg py-3 font-medium text-white transition ${processing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {processing ? 'Processando...' : 'Confirmar Agendamento'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
