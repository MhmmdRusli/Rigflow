import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create({ projects }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '', name: '', category: '', quantity: '', low_stock_threshold: '', unit: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/inventory');
    }

    return (
        <AuthenticatedLayout>
            <Link href="/inventory" className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft size={15} /> Kembali
            </Link>
            <h1 className="font-display mb-6 text-2xl font-semibold text-slate-900">Tambah Item Inventaris</h1>

            <form onSubmit={submit} className="max-w-lg space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Proyek</label>
                    <select
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                        <option value="">Pilih proyek</option>
                        {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    {errors.project_id && <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>}
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Nama Item</label>
                    <input
                        type="text" value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Kategori</label>
                    <input
                        type="text" value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="drill_bit, fuel, oil, dll"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Jumlah Stok</label>
                        <input
                            type="number" value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Satuan</label>
                        <input
                            type="text" value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="pcs, liter"
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">Ambang Batas Stok Rendah</label>
                    <input
                        type="number" value={data.low_stock_threshold}
                        onChange={(e) => setData('low_stock_threshold', e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                </div>

                <button
                    type="submit" disabled={processing}
                    className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Simpan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}