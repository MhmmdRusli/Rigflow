export default function StatCard({ label, value, accent, bg, icon: Icon }) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
                <Icon size={18} className={accent.replace('bg-', 'text-')} strokeWidth={2} />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="font-data mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}