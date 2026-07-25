import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ projects }) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: '',
        name: '',
        category: '',
        quantity: '',
        low_stock_threshold: '',
        unit: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/inventory');
    }

    return (
        <AuthenticatedLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">Tambah Item Inventaris</h1>

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
                    <label className="mb-1 block text-sm font-medium">Nama Item</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Kategori</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        placeholder="drill_bit, fuel, oil, dll"
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Jumlah Stok</label>
                        <input
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Satuan</label>
                        <input
                            type="text"
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                            placeholder="pcs, liter"
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Ambang Batas Stok Rendah</label>
                    <input
                        type="number"
                        value={data.low_stock_threshold}
                        onChange={(e) => setData('low_stock_threshold', e.target.value)}
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