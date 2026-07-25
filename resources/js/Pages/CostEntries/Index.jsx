import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function Index({ project, entries, breakdown, totalSpent }) {
    const percentUsed = ((totalSpent / project.budget) * 100).toFixed(1);
    const overBudget = totalSpent > project.budget;

    return (
        <AuthenticatedLayout>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Biaya vs Anggaran</h1>
                <Link
                    href="/cost-entries/create"
                    className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                    + Tambah Biaya
                </Link>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Anggaran</p>
                    <p className="mt-1 text-lg font-semibold">{formatRupiah(project.budget)}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Realisasi Biaya</p>
                    <p className="mt-1 text-lg font-semibold">{formatRupiah(totalSpent)}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className={`mt-1 text-lg font-semibold ${overBudget ? 'text-red-600' : 'text-green-600'}`}>
                        {percentUsed}% {overBudget ? '(Melebihi Anggaran)' : 'Terpakai'}
                    </p>
                </div>
            </div>

            <div className="mb-6 rounded-lg border bg-white p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">Rincian per Kategori</p>
                {Object.entries(breakdown).map(([category, amount]) => (
                    <div key={category} className="flex items-center justify-between border-t py-2 text-sm">
                        <span className="capitalize text-gray-600">{category}</span>
                        <span className="font-medium">{formatRupiah(amount)}</span>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-lg border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Kategori</th>
                            <th className="px-4 py-3">Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((e) => (
                            <tr key={e.id} className="border-t">
                                <td className="px-4 py-3">{e.entry_date}</td>
                                <td className="px-4 py-3 capitalize">{e.category}</td>
                                <td className="px-4 py-3">{formatRupiah(e.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}