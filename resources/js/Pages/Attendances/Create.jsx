import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create({ crewMembers }) {
    const { data, setData, post, processing, errors } = useForm({
        crew_member_id: '', attendance_date: '', shift: 'siang',
        check_in: '', check_out: '', overtime_hours: 0,
    });

    function submit(e) {
        e.preventDefault();
        post('/attendances');
    }

    const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";
    const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500";

    return (
        <AuthenticatedLayout>
            <Link href="/crew-members" className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft size={15} /> Kembali
            </Link>
            <h1 className="font-display mb-6 text-2xl font-semibold text-slate-900">Catat Absensi</h1>

            <form onSubmit={submit} className="max-w-lg space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <label className={labelClass}>Kru</label>
                    <select value={data.crew_member_id} onChange={(e) => setData('crew_member_id', e.target.value)} className={inputClass}>
                        <option value="">Pilih kru</option>
                        {crewMembers.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.position}</option>)}
                    </select>
                    {errors.crew_member_id && <p className="mt-1 text-sm text-red-600">{errors.crew_member_id}</p>}
                </div>

                <div>
                    <label className={labelClass}>Tanggal</label>
                    <input type="date" value={data.attendance_date} onChange={(e) => setData('attendance_date', e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Shift</label>
                    <select value={data.shift} onChange={(e) => setData('shift', e.target.value)} className={inputClass}>
                        <option value="siang">Siang</option>
                        <option value="malam">Malam</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Jam Masuk</label>
                        <input type="time" value={data.check_in} onChange={(e) => setData('check_in', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Jam Keluar</label>
                        <input type="time" value={data.check_out} onChange={(e) => setData('check_out', e.target.value)} className={inputClass} />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Jam Lembur</label>
                    <input type="number" step="0.5" value={data.overtime_hours} onChange={(e) => setData('overtime_hours', e.target.value)} className={inputClass} />
                </div>

                <button type="submit" disabled={processing} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                    Simpan Absensi
                </button>
            </form>
        </AuthenticatedLayout>
    );
}