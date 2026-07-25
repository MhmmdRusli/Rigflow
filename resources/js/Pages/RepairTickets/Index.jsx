import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

const statusColors = {
    open: 'bg-red-100 text-red-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    resolved: 'bg-green-100 text-green-700',
};

export default function Index({ tickets }) {
    function updateStatus(id, status) {
        router.put(`/repair-tickets/${id}`, { status });
    }

    return (
        <AuthenticatedLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">Tiket Perbaikan</h1>

            <div className="overflow-hidden rounded-lg border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Unit</th>
                            <th className="px-4 py-3">Kendala</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Ubah Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((t) => (
                            <tr key={t.id} className="border-t">
                                <td className="px-4 py-3">{t.rig_unit?.code}</td>
                                <td className="px-4 py-3">{t.issue_description}</td>
                                <td className="px-4 py-3">
                                    <span className={`rounded px-2 py-1 text-xs ${statusColors[t.status]}`}>
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={t.status}
                                        onChange={(e) => updateStatus(t.id, e.target.value)}
                                        className="rounded border border-gray-300 px-2 py-1 text-xs"
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