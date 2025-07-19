import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, Table, Heading } from '@radix-ui/themes';

export default function DependentsIndex({ dependents = [] }) {
    return (
        <AdminLayout
            pageTitle="Dependents"
            pageSubtitle="View and manage all dependents."
        >
            <Head title="Dependents" />
            <Card>
                <Heading size="4" mb="4">Dependents</Heading>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Relationship</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Member</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Added On</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {dependents.map(d => (
                            <Table.Row key={d.id}>
                                <Table.Cell>{d.name}</Table.Cell>
                                <Table.Cell>{d.relationship}</Table.Cell>
                                <Table.Cell>{d.member?.name}</Table.Cell>
                                <Table.Cell>{new Date(d.created_at).toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </AdminLayout>
    );
}
