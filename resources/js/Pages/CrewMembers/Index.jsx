import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Plus, UserRound, Users, CalendarCheck, Timer } from 'lucide-react';
import StatCard from '../../Components/StatCard';
import EmptyState from '../../Components/EmptyState';

export default function Index({ crewMembers, totalCrew, totalAttendances, totalOvertime }) {
    return (
        <AuthenticatedLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-slate-900">Kru & Timesheet</h1>
                    <p className="text-sm text-slate-500">Absensi shift dan rekap lembur</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/attendances/create" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Catat Absensi
                    </Link>
                    <Link href="/crew-members/create" className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
                        <Plus size={16} /> Tambah Kru
                    </Link>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
                <StatCard label="Total Kru" value={totalCrew} accent="bg-brand-600" bg="bg-brand-50" icon={Users} />
                <StatCard label="Total Absensi" value={totalAttendances} accent="bg-emerald-500" bg="bg-emerald-50" icon={CalendarCheck} />
                <StatCard label="Total Lembur" value={`${totalOvertime} jam`} accent="bg-amber-500" bg="bg-amber-50" icon={Timer} />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                {crewMembers.length === 0 ? (
                    <EmptyState text="Belum ada data kru." />
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Nama</th>
                                <th className="px-5 py-3">Posisi</th>
                                <th className="px-5 py-3">Jumlah Absensi</th>
                                <th className="px-5 py-3">Total Lembur</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {crewMembers.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50">
                                                <UserRound size={13} className="text-brand-600" />
                                            </span>
                                            <span className="font-medium text-slate-800">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-600">{c.position}</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">{c.attendances_count}</td>
                                    <td className="px-5 py-3.5 font-data text-slate-700">{c.total_overtime} jam</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}