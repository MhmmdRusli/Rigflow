import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ rigUnits }) {
    const { data, setData, post, processing, errors } = useForm({
        rig_unit_id: '',
        report_date: '',
        hourmeter_start: '',
        hourmeter_end: '',
        fuel_liters: '',
        depth_meters: '',
        equipment_issue: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/daily-reports');
    }

    return (
        <AuthenticatedLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">Laporan Harian Baru</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4 rounded-lg border bg-white p-6">
                <div>
                    <label className="mb-1 block text-sm font-medium">Unit Rig</label>
                    <select
                        value={data.rig_unit_id}
                        onChange={(e) => setData('rig_unit_id', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Pilih unit</option>
                        {rigUnits.map((r) => (
                            <option key={r.id} value={r.id}>{r.code}</option>
                        ))}
                    </select>
                    {errors.rig_unit_id && <p className="mt-1 text-sm text-red-600">{errors.rig_unit_id}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Tanggal</label>
                    <input
                        type="date"
                        value={data.report_date}
                        onChange={(e) => setData('report_date', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Hourmeter Awal</label>
                        <input
                            type="number" step="0.01"
                            value={data.hourmeter_start}
                            onChange={(e) => setData('hourmeter_start', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Hourmeter Akhir</label>
                        <input
                            type="number" step="0.01"
                            value={data.hourmeter_end}
                            onChange={(e) => setData('hourmeter_end', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                        {errors.hourmeter_end && <p className="mt-1 text-sm text-red-600">{errors.hourmeter_end}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Konsumsi Solar (L)</label>
                        <input
                            type="number" step="0.01"
                            value={data.fuel_liters}
                            onChange={(e) => setData('fuel_liters', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Kedalaman (m)</label>
                        <input
                            type="number" step="0.01"
                            value={data.depth_meters}
                            onChange={(e) => setData('depth_meters', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Kendala Alat (opsional)</label>
                    <textarea
                        value={data.equipment_issue}
                        onChange={(e) => setData('equipment_issue', e.target.value)}
                        placeholder="Kosongkan kalau tidak ada kerusakan"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        rows={3}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Kalau diisi, sistem otomatis membuat tiket perbaikan.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    Simpan Laporan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}