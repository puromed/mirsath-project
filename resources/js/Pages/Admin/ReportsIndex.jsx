import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function ReportsIndex() {
    return (
        <AdminLayout
            pageTitle="Reports"
            pageSubtitle="Generate and view reports."
        >
            <Head title="Reports" />
            <div>
                {/* Content for the reports will go here */}
            </div>
        </AdminLayout>
    );
}
