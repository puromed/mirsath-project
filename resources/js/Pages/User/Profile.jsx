import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Profile() {
    return (
        <UserLayout>
            <Head title="My Profile" />
            <p>Your profile page will go here.</p>
        </UserLayout>
    );
}
