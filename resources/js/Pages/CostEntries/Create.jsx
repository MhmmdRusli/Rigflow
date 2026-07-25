import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ projects }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        category: '',
        amount: '',
        entry_date: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/cost-entries');
    }

    return (
        <AuthenticatedLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">Tambah Entri Biaya</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4 rounded-lg border bg-white p-6">
                <div>
                    <label className="mb-1 block text-sm font-medium">Proyek</label>
                    <select
                        value={data.project_id}
                        onChange={(e) => setData('project_id', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Pilih proyek</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    {errors.project_id && <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Kategori</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="payroll, sparepart, dll"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Jumlah (Rp)</label>
                    <input
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Tanggal</label>
                    <input
                        type="date"
                        value={data.entry_date}
                        onChange={(e) => setData('entry_date', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    Simpan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}