import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ crewMembers }) {
    const { data, setData, post, processing, errors } = useForm({
        crew_member_id: '',
        attendance_date: '',
        shift: 'siang',
        check_in: '',
        check_out: '',
        overtime_hours: 0,
    });

    function submit(e) {
        e.preventDefault();
        post('/attendances');
    }

    return (
        <AuthenticatedLayout>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">Catat Absensi</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4 rounded-lg border bg-white p-6">
                <div>
                    <label className="mb-1 block text-sm font-medium">Kru</label>
                    <select
                        value={data.crew_member_id}
                        onChange={(e) => setData('crew_member_id', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="">Pilih kru</option>
                        {crewMembers.map((c) => (
                            <option key={c.id} value={c.id}>{c.name} — {c.position}</option>
                        ))}
                    </select>
                    {errors.crew_member_id && <p className="mt-1 text-sm text-red-600">{errors.crew_member_id}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Tanggal</label>
                    <input
                        type="date"
                        value={data.attendance_date}
                        onChange={(e) => setData('attendance_date', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Shift</label>
                    <select
                        value={data.shift}
                        onChange={(e) => setData('shift', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="siang">Siang</option>
                        <option value="malam">Malam</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Jam Masuk</label>
                        <input
                            type="time"
                            value={data.check_in}
                            onChange={(e) => setData('check_in', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Jam Keluar</label>
                        <input
                            type="time"
                            value={data.check_out}
                            onChange={(e) => setData('check_out', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Jam Lembur</label>
                    <input
                        type="number" step="0.5"
                        value={data.overtime_hours}
                        onChange={(e) => setData('overtime_hours', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                >
                    Simpan Absensi
                </button>
            </form>
        </AuthenticatedLayout>
    );
}