import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

export default function Dashboard({
    project, totalSpent, budgetUsedPercent, lowStockItems,
    openTicketsCount, recentReports, avgEfficiency,
}) {
    const overBudget = budgetUsedPercent > 100;

    return (
        <AuthenticatedLayout>
            <h1 className="mb-1 text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="mb-6 text-sm text-gray-500">{project.name}</p>

            {/* Kartu ringkasan angka */}
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Realisasi Biaya</p>
                    <p className="mt-1 text-xl font-semibold">{formatRupiah(totalSpent)}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Anggaran Terpakai</p>
                    <p className={`mt-1 text-xl font-semibold ${overBudget ? 'text-red-600' : 'text-gray-800'}`}>
                        {budgetUsedPercent}%
                    </p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Tiket Perbaikan Terbuka</p>
                    <p className="mt-1 text-xl font-semibold">{openTicketsCount}</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                    <p className="text-xs text-gray-500">Rata-rata Efisiensi Solar</p>
                    <p className="mt-1 text-xl font-semibold">{avgEfficiency} L/m</p>
                </div>
            </div>

            {/* Progress bar anggaran */}
            <div className="mb-6 rounded-lg border bg-white p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Anggaran vs Realisasi</span>
                    <span className="font-medium">{formatRupiah(totalSpent)} / {formatRupiah(project.budget)}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className={`h-full rounded-full ${overBudget ? 'bg-red-500' : 'bg-gray-900'}`}
                        style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Low stock alert */}
                <div className="rounded-lg border bg-white p-4">
                    <p className="mb-3 text-sm font-medium text-gray-700">⚠️ Stok Rendah</p>
                    {lowStockItems.length === 0 ? (
                        <p className="text-sm text-gray-400">Semua stok aman.</p>
                    ) : (
                        <ul className="space-y-2">
                            {lowStockItems.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name}</span>
                                    <span className="text-red-600">{item.quantity} {item.unit}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link href="/inventory" className="mt-3 inline-block text-sm text-gray-600 underline">
                        Lihat semua inventaris →
                    </Link>
                </div>

                {/* Recent daily reports */}
                <div className="rounded-lg border bg-white p-4">
                    <p className="mb-3 text-sm font-medium text-gray-700">📋 Laporan Harian Terbaru</p>
                    {recentReports.length === 0 ? (
                        <p className="text-sm text-gray-400">Belum ada laporan.</p>
                    ) : (
                        <ul className="space-y-2">
                            {recentReports.map((r) => (
                                <li key={r.id} className="flex justify-between text-sm">
                                    <span>{r.rig_unit?.code} — {r.report_date}</span>
                                    <span className="text-gray-500">{r.depth_meters} m</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link href="/daily-reports" className="mt-3 inline-block text-sm text-gray-600 underline">
                        Lihat semua laporan →
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}