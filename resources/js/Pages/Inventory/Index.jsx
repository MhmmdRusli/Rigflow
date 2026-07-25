import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ items }) {
    function handleDelete(id) {
        if (confirm('Hapus item ini?')) {
            router.delete(`/inventory/${id}`);
        }
    }

    return (
        <AuthenticatedLayout>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Inventaris</h1>
                <Link
                    href="/inventory/create"
                    className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                    + Tambah Item
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Proyek</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Stok</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            const isLow = item.quantity <= item.low_stock_threshold;
                            return (
                                <tr key={item.id} className="border-t">
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">{item.project?.name}</td>
                                    <td className="px-4 py-3">{item.category}</td>
                                    <td className="px-4 py-3">{item.quantity} {item.unit}</td>
                                    <td className="px-4 py-3">
                                        {isLow ? (
                                            <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-700">
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                                                Aman
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}