import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { AlertTriangle, ClipboardList, Wrench, Gauge, Wallet, Inbox } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0, notation: 'compact' }).format(num);
}

function StatCard({ label, value, accent, bg, icon: Icon }) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
            <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
                    <Icon size={18} className={accent.replace('bg-', 'text-')} strokeWidth={2} />
                </div>
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="font-data mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}

function EmptyState({ text }) {
    return (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Inbox size={22} className="text-slate-300" />
            <p className="text-sm text-slate-400">{text}</p>
        </div>
    );
}

export default function Dashboard({
    project, totalSpent, budgetUsedPercent, lowStockItems,
    openTicketsCount, recentReports, avgEfficiency, breakdown,
}) {
    const overBudget = budgetUsedPercent > 100;
    const gaugeData = [{ name: 'used', value: Math.min(budgetUsedPercent, 100), fill: overBudget ? '#EF4444' : '#2563EB' }];
    const chartColors = { fuel: '#2563EB', payroll: '#60A5FA', sparepart: '#F59E0B', sparepatrs: '#F59E0B' };

    return (
        <AuthenticatedLayout>
            <h1 className="font-display text-2xl font-semibold text-slate-900">Dashboard</h1>
            <p className="mb-6 text-sm text-slate-500">{project.name}</p>

            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Realisasi Biaya" value={formatRupiah(totalSpent)} accent="bg-brand-600" bg="bg-brand-50" icon={Wallet} />
                <StatCard label="Anggaran Terpakai" value={`${budgetUsedPercent}%`} accent={overBudget ? 'bg-red-500' : 'bg-brand-600'} bg={overBudget ? 'bg-red-50' : 'bg-brand-50'} icon={Gauge} />
                <StatCard label="Tiket Terbuka" value={openTicketsCount} accent="bg-amber-500" bg="bg-amber-50" icon={Wrench} />
                <StatCard label="Rata² Efisiensi" value={`${avgEfficiency} L/m`} accent="bg-emerald-500" bg="bg-emerald-50" icon={ClipboardList} />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Radial gauge anggaran */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="mb-1 text-sm font-medium text-slate-700">Anggaran vs Realisasi</p>
                    <p className="mb-2 text-xs text-slate-400">{formatRupiah(totalSpent)} dari {formatRupiah(project.budget)}</p>
                    <div className="relative mx-auto h-40 w-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="70%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: '#F1F5F9' }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`font-data text-2xl font-semibold ${overBudget ? 'text-red-600' : 'text-slate-900'}`}>
                                {budgetUsedPercent}%
                            </span>
                            <span className="text-xs text-slate-400">terpakai</span>
                        </div>
                    </div>
                </div>

                {/* Bar chart breakdown biaya */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                    <p className="mb-4 text-sm font-medium text-slate-700">Rincian Biaya per Kategori</p>
                    {breakdown.length === 0 ? (
                        <EmptyState text="Belum ada data biaya." />
                    ) : (
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={breakdown} layout="vertical" margin={{ left: 8, right: 24 }}>
                                <CartesianGrid horizontal={false} stroke="#F1F5F9" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="category" width={80} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                                <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={22}>
                                    {breakdown.map((entry, i) => (
                                        <Bar key={i} fill={chartColors[entry.category] ?? '#2563EB'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                        <p className="text-sm font-medium text-slate-700">Stok Rendah</p>
                    </div>
                    {lowStockItems.length === 0 ? (
                        <EmptyState text="Semua stok aman." />
                    ) : (
                        <ul className="space-y-3">
                            {lowStockItems.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 text-sm">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                    <span className="flex-1 text-slate-700">{item.name}</span>
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
                        <EmptyState text="Belum ada laporan." />
                    ) : (
                        <ul className="space-y-3">
                            {recentReports.map((r) => (
                                <li key={r.id} className="flex items-center gap-3 text-sm">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                                    <span className="flex-1 text-slate-700">{r.rig_unit?.code} — {r.report_date}</span>
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