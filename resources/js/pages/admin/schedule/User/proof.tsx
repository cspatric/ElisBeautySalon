import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Props {
    schedule: {
        id: number;
        scheduled_date: string;
        scheduled_time: string;
        client_name: string;
        client_phone?: string;
        client_observation?: string;
        status: 'pending' | 'confirmed' | 'finalized' | 'cancelled';
        service: {
            name: string;
            price: string;
        };
        employee: {
            name: string;
            photo: string | null;
        };
    };
}

export default function ScheduleProof({ schedule }: Props) {
    const formattedDate = new Date(schedule.scheduled_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
    });

    const pdfRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!pdfRef.current) return;
        const canvas = await html2canvas(pdfRef.current);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`agendamento-${schedule.id}.pdf`);
    };

    return (
        <div>
            <Head title="Comprovante de Agendamento" />
            <div ref={pdfRef} className="flex flex-col gap-6 px-5 py-10 lg:px-20">
                {/* Header */}
                <div className="rounded-xl bg-black px-6 py-10 text-white">
                    <h2 className="text-2xl font-bold">Horario marcado, {schedule.client_name}</h2>
                    <p className="text-sm">
                        {schedule.status === 'confirmed'
                            ? 'Horário confirmado com sucesso.'
                            : schedule.status === 'pending'
                              ? 'Aguardando a confirmação do horario.'
                              : schedule.status === 'finalized'
                                ? 'Atendimento finalizado.'
                                : schedule.status === 'cancelled'
                                  ? 'Este agendamento foi cancelado.'
                                  : ''}
                    </p>
                </div>

                {/* Profissional e Agendamento */}
                <div className="flex items-start gap-6 sm:flex-row">
                    <div className="flex flex-col items-center">
                        <img
                            src={schedule.employee.photo || 'https://via.placeholder.com/100'}
                            alt={schedule.employee.name}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                        <p className="mt-2 text-center text-sm font-medium">{schedule.employee.name}</p>
                        <p className="text-xs text-gray-500">Makeup</p>
                    </div>

                    <div className="w-full flex-1 rounded-xl border bg-gray-50 p-4 shadow-sm">
                        <div className="mb-2 flex justify-between border-b pb-2 text-sm font-semibold">
                            <span>Agendamento</span>
                            <span className="text-gray-400">#{schedule.id.toString().padStart(3, '0')}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-700">
                            <p>
                                <span className="font-medium">Serviço:</span> {schedule.service.name}
                            </p>
                            <p>
                                <span className="font-medium">Data:</span> {formattedDate}
                            </p>
                            <p>
                                <span className="font-medium">Horário:</span> {schedule.scheduled_time}
                            </p>
                            <p>
                                <span className="font-medium">Valor:</span> R${schedule.service.price}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Telefone */}
                <div>
                    <input type="text" value={schedule.client_phone || ''} disabled className="w-full rounded-lg border bg-gray-100 px-4 py-2" />
                </div>

                {/* Observações */}
                <div>
                    <label className="mb-1 block text-sm text-gray-600">Observações</label>
                    <textarea
                        value={schedule.client_observation || ''}
                        disabled
                        rows={3}
                        className="w-full rounded-lg border bg-gray-100 px-4 py-2"
                    />
                </div>
            </div>

            {/* Botão de comprovante */}
            <div className="px-5 lg:px-20">
                <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full rounded-lg bg-gray-300 py-2 text-sm text-black hover:bg-gray-400"
                >
                    Baixar Comprovante
                </button>
            </div>
        </div>
    );
}
