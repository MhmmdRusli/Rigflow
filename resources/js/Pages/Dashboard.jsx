import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-gray-600">Selamat datang di RigFlow 🎉</p>
        </AuthenticatedLayout>
    );
}