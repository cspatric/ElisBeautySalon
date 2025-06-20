import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Produtos', href: '/product' },
    { title: 'Cadastrar', href: '#' },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        photo: [] as string[],
        price: '',
        active: true,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileReaders: Promise<string>[] = Array.from(files).map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders).then((base64List) => {
            setData('photo', base64List);
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('product.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastrar Produto" />

            <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Cadastrar Produto</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Preencha as informações do novo produto</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nome */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Preço */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor (R$)</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                value={data.active ? '1' : '0'}
                                onChange={(e) => setData('active', e.target.value === '1')}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="1">Ativo</option>
                                <option value="0">Desativado</option>
                            </select>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descrição</label>
                        <textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    {/* Fotos */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fotos</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        {data.photo.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {data.photo.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Foto ${idx + 1}`}
                                        className="h-24 w-full rounded-lg border border-gray-300 object-cover dark:border-gray-600"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Botão de salvar */}
                    <div className="flex justify-end border-t border-gray-200 pt-4 dark:border-gray-700">
                        <Button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-white shadow-sm hover:bg-blue-700"
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
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Salvando...
                                </span>
                            ) : (
                                'Adicionar Produto'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
