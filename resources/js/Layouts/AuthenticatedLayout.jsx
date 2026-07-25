import { Link, usePage, router } from '@inertiajs/react';

const roleLabels = {
    site_supervisor: 'Mandor Lapangan',
    project_manager: 'Manajer Proyek',
    warehouse: 'Logistik & Gudang',
    client: 'Klien',
};

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    function logout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 shrink-0 bg-gray-900 text-white">
                <div className="p-6">
                    <h1 className="text-lg font-semibold">RigFlow</h1>
                    <p className="mt-1 text-xs text-gray-400">
                        {roleLabels[auth.user?.role] ?? auth.user?.role}
                    </p>
                </div>
                <nav className="mt-4 flex flex-col gap-1 px-3">
                    <Link href="/dashboard" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Dashboard
                    </Link>
                    <Link href="/inventory" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Inventaris
                    </Link>
                    <Link href="/daily-reports" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Laporan Harian
                    </Link>
                    <Link href="/repair-tickets" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Tiket Perbaikan
                    </Link>
                    <Link href="/cost-entries" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Biaya vs Anggaran
                    </Link>
                    <Link href="/crew-members" className="rounded px-3 py-2 text-sm hover:bg-gray-800">
                        Kru & Timesheet
                    </Link>
                </nav>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                    <span className="text-sm text-gray-600">{auth.user?.name}</span>
                    <button onClick={logout} className="text-sm text-red-600 hover:underline">
                        Keluar
                    </button>
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}