import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Produtos', href: '/product' },
    { title: 'Cadastrar', href: '/product/create' },
];

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        photo: [] as string[], // Base64 de múltiplas imagens
        price: '',
        active: true as boolean,
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
            <Head title="Cadastro de Produtos" />

            <div className="flex flex-col gap-6 p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Cadastro de Produtos</h2>

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
                        <label className="mb-1 text-gray-600">Valor (R$):</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {errors.price && <span className="text-sm text-red-600">{errors.price}</span>}
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <label className="mb-1 text-gray-600">Descrição:</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                            rows={3}
                        />
                        {errors.description && <span className="text-sm text-red-600">{errors.description}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Fotos:</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {data.photo.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.photo.map((img, idx) => (
                                    <img key={idx} src={img} alt="Pré-visualização" className="h-16 w-16 rounded border object-cover" />
                                ))}
                            </div>
                        )}
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

                    <div className="col-span-2 flex justify-end">
                        <Button type="submit" className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700" disabled={processing}>
                            {processing ? 'Salvando...' : 'Adicionar Produto'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
