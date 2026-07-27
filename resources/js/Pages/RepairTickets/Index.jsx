import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Wrench } from 'lucide-react';

const statusStyles = {
    open: 'bg-red-50 text-red-600',
    in_progress: 'bg-amber-50 text-amber-600',
    resolved: 'bg-emerald-50 text-emerald-600',
};

export default function Index({ tickets }) {
    function updateStatus(id, status) {
        router.put(`/repair-tickets/${id}`, { status });
    }

    return (
        <AuthenticatedLayout>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-slate-900">Tiket Perbaikan</h1>
                <p className="text-sm text-slate-500">Tindak lanjut kerusakan alat dari laporan lapangan</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-5 py-3">Unit</th>
                            <th className="px-5 py-3">Kendala</th>
                            <th className="px-5 py-3">Status</th>
                            <th className="px-5 py-3">Ubah Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {tickets.map((t) => (
                            <tr key={t.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-2 font-medium text-slate-800">
                                        <Wrench size={15} className="text-slate-400" />
                                        {t.rig_unit?.code}
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-slate-600">{t.issue_description}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[t.status]}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <select
                                        value={t.status}
                                        onChange={(e) => updateStatus(t.id, e.target.value)}
                                        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 focus:border-brand-500 focus:outline-none"
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}