import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, Table, Heading } from '@radix-ui/themes';

export default function MembersIndex({ members = [] }) {
    return (
        <AdminLayout
            pageTitle="Members"
            pageSubtitle="View and manage all members."
        >
            <Head title="Members" />
            <Card>
                <Heading size="4" mb="4">Members</Heading>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>IC Number</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Registered On</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {members.map(m => (
                            <Table.Row key={m.id}>
                                <Table.Cell>{m.name}</Table.Cell>
                                <Table.Cell>{m.ic_number}</Table.Cell>
                                <Table.Cell>{m.status}</Table.Cell>
                                <Table.Cell>{new Date(m.created_at).toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
                <a
                    href="/admin/members/export"
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md mt-4"
                    target="_blank" rel="noopener"
                >
                    Download CSV
                </a> 
            </Card>
        </AdminLayout>
    );
}
