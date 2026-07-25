import { Link, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard, ClipboardList, Package, Wrench,
    Wallet, Users, LogOut,
} from 'lucide-react';

const roleLabels = {
    site_supervisor: 'Mandor Lapangan',
    project_manager: 'Manajer Proyek',
    warehouse: 'Logistik & Gudang',
    client: 'Klien',
};

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['site_supervisor', 'project_manager', 'warehouse', 'client'] },
    { href: '/daily-reports', label: 'Laporan Harian', icon: ClipboardList, roles: ['site_supervisor', 'project_manager'] },
    { href: '/inventory', label: 'Inventaris', icon: Package, roles: ['warehouse', 'project_manager'] },
    { href: '/repair-tickets', label: 'Tiket Perbaikan', icon: Wrench, roles: ['warehouse', 'project_manager'] },
    { href: '/cost-entries', label: 'Biaya vs Anggaran', icon: Wallet, roles: ['project_manager', 'client'] },
    { href: '/crew-members', label: 'Kru & Timesheet', icon: Users, roles: ['site_supervisor', 'project_manager'] },
];

export default function AuthenticatedLayout({ children }) {
    const { auth, url } = usePage().props;
    const currentUrl = usePage().url;

    function logout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="flex min-h-screen bg-[var(--color-slate-50,#F8FAFC)]">
            <aside className="flex w-64 shrink-0 flex-col bg-navy-950 text-white">
                <div className="border-b border-navy-800 p-6">
                    <h1 className="font-display text-lg font-semibold tracking-tight">RigFlow</h1>
                    <p className="mt-1 font-data text-xs text-blue-300/70">
                        {roleLabels[auth.user?.role] ?? auth.user?.role}
                    </p>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-3">
                    {navItems
                        .filter((item) => item.roles.includes(auth.user?.role))
                        .map((item) => {
                            const Icon = item.icon;
                            const active = currentUrl.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                        active
                                            ? 'bg-brand-600 text-white'
                                            : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                                    }`}
                                >
                                    <Icon size={17} strokeWidth={2} />
                                    {item.label}
                                </Link>
                            );
                        })}
                </nav>

                <div className="border-t border-navy-800 p-3">
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-navy-800 hover:text-white"
                    >
                        <LogOut size={17} strokeWidth={2} />
                        Keluar
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
                    <div />
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">{auth.user?.name}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-600">
                            {auth.user?.name?.charAt(0)}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}