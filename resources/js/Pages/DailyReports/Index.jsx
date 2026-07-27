import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { ClipboardList, Plus, AlertCircle, FileText, Gauge, TriangleAlert } from 'lucide-react';
import StatCard from '../../Components/StatCard';
import EmptyState from '../../Components/EmptyState';

export default function Index({ reports, totalReports, avgEfficiency, issuesCount }) {
    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-slate-900">Laporan Harian</h1>
                    <p className="text-sm text-slate-500">Input operasional harian per unit rig</p>
                </div>
                <Link href="/daily-reports/create" className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                    <Plus size={16} /> Laporan Baru
                </Link>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
                <StatCard label="Total Laporan" value={totalReports} accent="bg-brand-600" bg="bg-brand-50" icon={FileText} />
                <StatCard label="Rata² Efisiensi" value={`${avgEfficiency} L/m`} accent="bg-emerald-500" bg="bg-emerald-50" icon={Gauge} />
                <StatCard label="Laporan Bermasalah" value={issuesCount} accent="bg-amber-500" bg="bg-amber-50" icon={TriangleAlert} />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {reports.length === 0 ? (
                    <EmptyState text="Belum ada laporan harian." />
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Tanggal</th>
                                <th className="px-5 py-3">Unit</th>
                                <th className="px-5 py-3">Mandor</th>
                                <th className="px-5 py-3">Kedalaman</th>
                                <th className="px-5 py-3">Solar</th>
                                <th className="px-5 py-3">Efisiensi</th>
                                <th className="px-5 py-3">Kendala</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {reports.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5 font-data text-slate-700">{r.report_date}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50">
                                                <ClipboardList size={13} className="text-brand-600" />
                                            </span>
                                            <span className="font-medium text-slate-800">{r.rig_unit?.code}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-600">{r.user?.name}</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">{r.depth_meters} m</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">{r.fuel_liters} L</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">
                                        {r.depth_meters > 0 ? (r.fuel_liters / r.depth_meters).toFixed(2) : '-'} L/m
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {r.equipment_issue ? (
                                            <span className="flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                                                <AlertCircle size={12} /> {r.equipment_issue}
                                            </span>
                                        ) : (
                                            <span className="text-slate-300">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}