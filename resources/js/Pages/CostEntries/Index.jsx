import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Plus, Wallet } from 'lucide-react';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function Index({ project, entries, breakdown, totalSpent }) {
    const percentUsed = ((totalSpent / project.budget) * 100).toFixed(1);
    const overBudget = totalSpent > project.budget;

    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-slate-900">Biaya vs Anggaran</h1>
                    <p className="text-sm text-slate-500">{project.name}</p>
                </div>
                <Link
                    href="/cost-entries/create"
                    className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={16} /> Tambah Biaya
                </Link>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="absolute inset-y-0 left-0 w-1 bg-brand-600" />
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Anggaran</p>
                    <p className="font-data mt-2 text-xl font-semibold text-slate-900">{formatRupiah(project.budget)}</p>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="absolute inset-y-0 left-0 w-1 bg-brand-600" />
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Realisasi</p>
                    <p className="font-data mt-2 text-xl font-semibold text-slate-900">{formatRupiah(totalSpent)}</p>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className={`absolute inset-y-0 left-0 w-1 ${overBudget ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
                    <p className={`font-data mt-2 text-xl font-semibold ${overBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                        {percentUsed}%
                    </p>
                </div>
            </div>

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-sm font-medium text-slate-700">Rincian per Kategori</p>
                {Object.entries(breakdown).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between border-t border-slate-100 py-2.5 text-sm first:border-t-0">
                        <span className="capitalize text-slate-600">{category}</span>
                        <span className="font-data font-medium text-slate-800">{formatRupiah(amount)}</span>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3">Tanggal</th>
                            <th className="px-5 py-3">Kategori</th>
                            <th className="px-5 py-3">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {entries.map((e) => (
                            <tr key={e.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3.5 font-data text-slate-700">{e.entry_date}</td>
                                <td className="px-5 py-3.5 text-slate-600 capitalize">
                                    <div className="flex items-center gap-2">
                                        <Wallet size={15} className="text-slate-400" />
                                        {e.category}
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 font-data text-slate-800">{formatRupiah(e.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}