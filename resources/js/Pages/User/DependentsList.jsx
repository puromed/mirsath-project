import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function DependentsList() {
    return (
        <UserLayout>
            <Head title="My Dependents" />
            <p>Your dependents list will appear here.</p>
        </UserLayout>
    );
}
