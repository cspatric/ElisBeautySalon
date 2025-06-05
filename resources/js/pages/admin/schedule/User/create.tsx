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

    const [step, setStep] = useState<'home' | 'resumo' | 'profissional' | 'dados_cliente'>('home');

    const selectedService = services.find((s) => s.id === Number(data.service_id));
    const selectedEmployee = employees.find((e) => e.id === Number(data.employee_id));

    return (
        <div>
            <Head title="Agendamento" />
            <div className="flex flex-col gap-6">
                {/* Saudação e busca */}
                <div className="bg-black px-5 py-14 text-white lg:px-20">
                    <h2 className="text-2xl font-bold">Olá, Elisangela</h2>
                    <p className="text-sm">O que você vai fazer hoje?</p>
                    <input type="text" placeholder="O que você quer fazer hoje?" className="mt-4 w-full rounded-lg border px-4 py-2 text-black" />
                </div>

                {/* Tabs fake */}
                <div className="flex gap-6 px-5 pt-4 text-lg font-semibold lg:px-20">
                    <span className="cursor-pointer border-b-2 border-black pb-1 text-black">Home</span>
                    <span className="hover:black cursor-pointer text-gray-500">Serviços</span>
                    <span className="hover:black cursor-pointer text-gray-500">Produtos</span>
                </div>

                {step === 'home' && (
                    <>
                        {/* Serviços Populares */}
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                            {services
                                .filter((service) => service.active)
                                .map((service) => (
                                    <label
                                        key={service.id}
                                        className={`relative cursor-pointer rounded-lg border p-2 ${data.service_id === service.id.toString() ? 'ring-2 ring-black' : ''}`}
                                        onClick={() => {
                                            setData('service_id', service.id.toString());
                                            setStep('resumo');
                                        }}
                                    >
                                        <img
                                            src={service.photo?.url || 'https://via.placeholder.com/150'}
                                            alt={service.name}
                                            className="h-24 w-full rounded-md object-cover"
                                        />
                                        <div className="mt-1">
                                            <p className="text-sm font-medium">{service.name}</p>
                                            <p className="text-xs text-gray-500">R${Number(service.price).toFixed(2)}</p>
                                        </div>
                                    </label>
                                ))}
                        </div>

                        {/* Seleção de funcionário */}
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                            {employees
                                .filter((emp) => emp.active)
                                .map((employee) => (
                                    <label
                                        key={employee.id}
                                        className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-center ${data.employee_id === employee.id.toString() ? 'ring-2 ring-black' : ''}`}
                                        onClick={() => setData('employee_id', employee.id.toString())}
                                    >
                                        <img
                                            src={employee.photo || 'https://via.placeholder.com/100'}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                        <p className="text-sm font-medium">{employee.name}</p>
                                    </label>
                                ))}
                        </div>
                    </>
                )}

                {step === 'resumo' && selectedService && (
                    <div className="flex flex-col gap-6 px-5 lg:px-20">
                        <h3 className="text-lg font-semibold text-gray-800">Escolha a data e o horário</h3>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-600">Data</label>
                            <input
                                type="date"
                                value={data.scheduled_date}
                                onChange={(e) => setData('scheduled_date', e.target.value)}
                                className="w-full rounded-lg border px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-600">Horário</label>
                            <div className="flex gap-3">
                                {['10:30', '11:30', '13:30', '14:30'].map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        className={`rounded-full px-4 py-2 text-sm ${data.scheduled_time === time ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
                                        onClick={() => setData('scheduled_time', time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl bg-gray-100 p-5">
                            <p className="text-center font-bold text-gray-800">{selectedService.name}</p>
                            <p className="mb-4 text-center text-xs text-gray-500">Duração média 2 horas e meia</p>
                            <div className="flex justify-between px-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold">Data</p>
                                    <p>{data.scheduled_date || '--'}</p>
                                    <p>{data.scheduled_time || '--'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Profissional</p>
                                    <p>{selectedEmployee?.name || '---'}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep('profissional')}
                                    className="w-full rounded-lg bg-black py-2 text-white hover:bg-black"
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'profissional' && (
                    <div className="flex flex-col gap-6 px-5 lg:px-20">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-800">Profissionais Disponíveis</h3>
                            <div className="flex flex-wrap gap-4">
                                {employees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        onClick={() => setData('employee_id', employee.id.toString())}
                                        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border px-4 py-3 text-center shadow-sm ${Number(data.employee_id) === employee.id ? 'ring-2 ring-black' : ''}`}
                                    >
                                        <img
                                            src={employee.photo || 'https://via.placeholder.com/100'}
                                            className="h-16 w-16 rounded-full object-cover"
                                            alt={employee.name}
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{employee.name}</p>
                                            <p className="text-xs text-gray-500">Makeup</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-gray-600">Observações</label>
                            <textarea
                                className="w-full rounded-lg border px-4 py-2"
                                rows={3}
                                placeholder="Alguma observação para o atendimento?"
                                onChange={(e) => setData('client_observation', e.target.value)}
                            />
                        </div>
                        <div className="rounded-xl bg-gray-100 p-5">
                            <p className="text-center font-bold text-gray-800">{selectedService?.name}</p>
                            <p className="mb-4 text-center text-xs text-gray-500">Duração média 2 horas e meia</p>
                            <div className="flex justify-between px-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold">Data</p>
                                    <p>{data.scheduled_date || '--'}</p>
                                    <p>{data.scheduled_time || '--'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Profissional</p>
                                    <p>{selectedEmployee?.name || '---'}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep('dados_cliente')}
                                    className="w-full rounded-lg bg-black py-2 text-white hover:bg-black"
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'dados_cliente' && (
                    <div className="flex flex-col gap-6 px-5 lg:px-20">
                        <div className="mt-4 flex flex-col gap-4">
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Seu nome:</label>
                                <input
                                    type="text"
                                    value={data.client_name || ''}
                                    onChange={(e) => setData('client_name', e.target.value)}
                                    className="w-full rounded-lg border px-4 py-2"
                                    placeholder="Digite seu nome"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm text-gray-600">Telefone:</label>
                                <input
                                    type="tel"
                                    value={data.client_phone || ''}
                                    onChange={(e) => setData('client_phone', e.target.value)}
                                    className="w-full rounded-lg border px-4 py-2"
                                    placeholder="(00) 00000-0000"
                                />
                            </div>
                        </div>
                        <div className="rounded-xl bg-gray-100 p-5">
                            <p className="text-center font-bold text-gray-800">{selectedService?.name}</p>
                            <p className="mb-4 text-center text-xs text-gray-500">Duração média 2 horas e meia</p>
                            <div className="flex justify-between px-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold">Data</p>
                                    <p>{data.scheduled_date || '--'}</p>
                                    <p>{data.scheduled_time || '--'}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Profissional</p>
                                    <p>{selectedEmployee?.name || '---'}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => post(route('schedule.store'))}
                                    disabled={processing}
                                    className="w-full rounded-lg bg-black py-2 text-white hover:bg-black"
                                >
                                    {processing ? 'Enviando...' : 'Próximo'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
