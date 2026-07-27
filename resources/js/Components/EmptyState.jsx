import { Inbox } from 'lucide-react';

export default function EmptyState({ text }) {
    return (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
            <Inbox size={22} className="text-slate-300" />
            <p className="text-sm text-slate-400">{text}</p>
        </div>
    );
}