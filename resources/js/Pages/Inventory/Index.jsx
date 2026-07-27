import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { Package, Plus, Trash2 } from 'lucide-react';

export default function Index({ items }) {
    function handleDelete(id) {
        if (confirm('Hapus item ini?')) {
            router.delete(`/inventory/${id}`);
        }
    }

    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-slate-900">Inventaris</h1>
                    <p className="text-sm text-slate-500">Stok sparepart & bahan bakar gudang lapangan</p>
                </div>
                <Link
                    href="/inventory/create"
                    className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Item
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3">Nama</th>
                            <th className="px-5 py-3">Proyek</th>
                            <th className="px-5 py-3">Kategori</th>
                            <th className="px-5 py-3">Stok</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item) => {
                            const isLow = item.quantity <= item.low_stock_threshold;
                            return (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5 font-medium text-slate-800">
                                        <div className="flex items-center gap-2">
                                            <Package size={15} className="text-slate-400" />
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-600">{item.project?.name}</td>
                                    <td className="px-5 py-3.5 text-slate-600 capitalize">{item.category}</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">{item.quantity} {item.unit}</td>
                                    <td className="px-5 py-3.5">
                                        {isLow ? (
                                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                                Aman
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-slate-400 hover:text-red-600"
                                        >
                                            <Trash2 size={15} />
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