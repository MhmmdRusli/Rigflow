import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create({ rigUnits }) {
    const { data, setData, post, processing, errors } = useForm({
        rig_unit_id: '', report_date: '', hourmeter_start: '', hourmeter_end: '',
        fuel_liters: '', depth_meters: '', equipment_issue: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/daily-reports');
    }

    const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";
    const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500";

    return (
        <AuthenticatedLayout>
            <Link href="/daily-reports" className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft size={15} /> Kembali
            </Link>
            <h1 className="font-display mb-6 text-2xl font-semibold text-slate-900">Laporan Harian Baru</h1>

            <form onSubmit={submit} className="max-w-lg space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <label className={labelClass}>Unit Rig</label>
                    <select value={data.rig_unit_id} onChange={(e) => setData('rig_unit_id', e.target.value)} className={inputClass}>
                        <option value="">Pilih unit</option>
                        {rigUnits.map((r) => <option key={r.id} value={r.id}>{r.code}</option>)}
                    </select>
                    {errors.rig_unit_id && <p className="mt-1 text-sm text-red-600">{errors.rig_unit_id}</p>}
                </div>

                <div>
                    <label className={labelClass}>Tanggal</label>
                    <input type="date" value={data.report_date} onChange={(e) => setData('report_date', e.target.value)} className={inputClass} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Hourmeter Awal</label>
                        <input type="number" step="0.01" value={data.hourmeter_start} onChange={(e) => setData('hourmeter_start', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Hourmeter Akhir</label>
                        <input type="number" step="0.01" value={data.hourmeter_end} onChange={(e) => setData('hourmeter_end', e.target.value)} className={inputClass} />
                        {errors.hourmeter_end && <p className="mt-1 text-sm text-red-600">{errors.hourmeter_end}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Konsumsi Solar (L)</label>
                        <input type="number" step="0.01" value={data.fuel_liters} onChange={(e) => setData('fuel_liters', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Kedalaman (m)</label>
                        <input type="number" step="0.01" value={data.depth_meters} onChange={(e) => setData('depth_meters', e.target.value)} className={inputClass} />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Kendala Alat (opsional)</label>
                    <textarea
                        value={data.equipment_issue} onChange={(e) => setData('equipment_issue', e.target.value)}
                        placeholder="Kosongkan kalau tidak ada kerusakan" rows={3} className={inputClass}
                    />
                    <p className="mt-1 text-xs text-slate-400">Kalau diisi, sistem otomatis membuat tiket perbaikan.</p>
                </div>

                <button type="submit" disabled={processing} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                    Simpan Laporan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}