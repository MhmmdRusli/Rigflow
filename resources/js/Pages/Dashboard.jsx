import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { AlertTriangle, ClipboardList, Wrench, Gauge, Wallet } from 'lucide-react';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
}

function StatCard({ label, value, accent, icon: Icon }) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="font-data mt-2 text-2xl font-semibold text-slate-900">{value}</p>
                </div>
                <Icon size={18} className="text-slate-400" strokeWidth={2} />
            </div>
        </div>
    );
}

export default function Dashboard({
    project, totalSpent, budgetUsedPercent, lowStockItems,
    openTicketsCount, recentReports, avgEfficiency,
}) {
    const overBudget = budgetUsedPercent > 100;

    return (
        <AuthenticatedLayout>
            <h1 className="font-display text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="mb-6 text-sm text-slate-500">{project.name}</p>

            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                    label="Realisasi Biaya"
                    value={formatRupiah(totalSpent)}
                    accent="bg-brand-600"
                    icon={Wallet}
                />
                <StatCard
                    label="Anggaran Terpakai"
                    value={`${budgetUsedPercent}%`}
                    accent={overBudget ? 'bg-red-500' : 'bg-brand-600'}
                    icon={Gauge}
                />
                <StatCard
                    label="Tiket Terbuka"
                    value={openTicketsCount}
                    accent="bg-amber-500"
                    icon={Wrench}
                />
                <StatCard
                    label="Rata² Efisiensi"
                    value={`${avgEfficiency} L/m`}
                    accent="bg-brand-600"
                    icon={ClipboardList}
                />
            </div>

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Anggaran vs Realisasi</span>
                    <span className="font-data font-medium text-slate-900">
                        {formatRupiah(totalSpent)} / {formatRupiah(project.budget)}
                    </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full ${overBudget ? 'bg-red-500' : 'bg-brand-600'}`}
                        style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                        <p className="text-sm font-medium text-slate-700">Stok Rendah</p>
                    </div>
                    {lowStockItems.length === 0 ? (
                        <p className="text-sm text-slate-400">Semua stok aman.</p>
                    ) : (
                        <ul className="space-y-2.5">
                            {lowStockItems.map((item) => (
                                <li key={item.id} className="flex justify-between text-sm">
                                    <span className="text-slate-700">{item.name}</span>
                                    <span className="font-data text-red-600">{item.quantity} {item.unit}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link href="/inventory" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
                        Lihat semua inventaris →
                    </Link>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <ClipboardList size={16} className="text-brand-600" />
                        <p className="text-sm font-medium text-slate-700">Laporan Harian Terbaru</p>
                    </div>
                    {recentReports.length === 0 ? (
                        <p className="text-sm text-slate-400">Belum ada laporan.</p>
                    ) : (
                        <ul className="space-y-2.5">
                            {recentReports.map((r) => (
                                <li key={r.id} className="flex justify-between text-sm">
                                    <span className="text-slate-700">{r.rig_unit?.code} — {r.report_date}</span>
                                    <span className="font-data text-slate-500">{r.depth_meters} m</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Link href="/daily-reports" className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline">
                        Lihat semua laporan →
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}