import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create({ projects }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '', category: '', amount: '', entry_date: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/cost-entries');
    }

    const inputClass = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";
    const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500";

    return (
        <AuthenticatedLayout>
            <Link href="/cost-entries" className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft size={15} /> Kembali
            </Link>
            <h1 className="font-display mb-6 text-2xl font-semibold text-slate-900">Tambah Entri Biaya</h1>

            <form onSubmit={submit} className="max-w-lg space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <label className={labelClass}>Proyek</label>
                    <select value={data.project_id} onChange={(e) => setData('project_id', e.target.value)} className={inputClass}>
                        <option value="">Pilih proyek</option>
                        {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    {errors.project_id && <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>}
                </div>

                <div>
                    <label className={labelClass}>Kategori</label>
                    <input type="text" value={data.category} onChange={(e) => setData('category', e.target.value)} placeholder="payroll, sparepart, dll" className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Jumlah (Rp)</label>
                    <input type="number" value={data.amount} onChange={(e) => setData('amount', e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Tanggal</label>
                    <input type="date" value={data.entry_date} onChange={(e) => setData('entry_date', e.target.value)} className={inputClass} />
                </div>

                <button type="submit" disabled={processing} className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
                    Simpan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}