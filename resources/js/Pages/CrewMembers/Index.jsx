import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ crewMembers }) {
    return (
        <AuthenticatedLayout>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Kru & Timesheet</h1>
                <div className="flex gap-2">
                    <Link
                        href="/attendances/create"
                        className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        Catat Absensi
                    </Link>
                    <Link
                        href="/crew-members/create"
                        className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                    >
                        + Tambah Kru
                    </Link>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Posisi</th>
                            <th className="px-4 py-3">Jumlah Absensi</th>
                            <th className="px-4 py-3">Total Lembur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewMembers.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="px-4 py-3">{c.name}</td>
                                <td className="px-4 py-3">{c.position}</td>
                                <td className="px-4 py-3">{c.attendances_count}</td>
                                <td className="px-4 py-3">{c.total_overtime} jam</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}