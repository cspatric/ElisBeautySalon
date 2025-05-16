import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

type Product = {
    id: number;
    name: string;
    price: number;
    active: boolean;
    photo: string[]; // Base64 ou URL
};

interface Props {
    products: Product[];
    totalServices: number;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Produtos', href: '/product' }];

export default function Index({ products }: Props) {
    const total = products.length;
    const active = products.filter((p) => p.active).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produtos" />
            <div className="flex flex-col gap-6 p-6">
                {/* Cards superiores */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Total Produtos</p>
                        <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Produtos Ativos</p>
                        <p className="text-2xl font-bold">{active}</p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                        <p className="text-sm text-gray-500">Produtos Inativos</p>
                        <p className="text-2xl font-bold">{total - active}</p>
                    </div>
                </div>

                {/* Botão adicionar */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.visit(route('product.create'))}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Adicionar Produtos
                    </Button>
                </div>

                {/* Lista de produtos */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Produtos</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <div key={product.id} className="rounded-xl bg-white p-3">
                                <div className="aspect-video overflow-hidden rounded-lg border border-gray-200">
                                    <img
                                        src={product.photo?.[0] || 'https://via.placeholder.com/300x150'}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-600">R${Number(product.price).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
