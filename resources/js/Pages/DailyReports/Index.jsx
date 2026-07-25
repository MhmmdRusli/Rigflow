import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ reports }) {
    return (
        <AuthenticatedLayout>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Laporan Harian</h1>
                <Link
                    href="/daily-reports/create"
                    className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                    + Laporan Baru
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Tanggal</th>
                            <th className="px-4 py-3">Unit</th>
                            <th className="px-4 py-3">Mandor</th>
                            <th className="px-4 py-3">Kedalaman</th>
                            <th className="px-4 py-3">Solar</th>
                            <th className="px-4 py-3">Efisiensi</th>
                            <th className="px-4 py-3">Kendala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id} className="border-t">
                                <td className="px-4 py-3">{r.report_date}</td>
                                <td className="px-4 py-3">{r.rig_unit?.code}</td>
                                <td className="px-4 py-3">{r.user?.name}</td>
                                <td className="px-4 py-3">{r.depth_meters} m</td>
                                <td className="px-4 py-3">{r.fuel_liters} L</td>
                                <td className="px-4 py-3">
                                    {r.depth_meters > 0
                                        ? (r.fuel_liters / r.depth_meters).toFixed(2)
                                        : '-'} L/m
                                </td>
                                <td className="px-4 py-3">
                                    {r.equipment_issue ? (
                                        <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-700">
                                            {r.equipment_issue}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}