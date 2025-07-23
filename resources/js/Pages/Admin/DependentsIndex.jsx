import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, Table, Heading, Flex, Button } from '@radix-ui/themes';
import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons';

export default function DependentsIndex({ dependents = [] }) {
    return (
        <AdminLayout
            pageTitle="Dependents"
            pageSubtitle="View and manage all dependents."
        >
            <Head title="Dependents" />
            <Card>
                <Flex justify="between" align="center" mb="4">
                    <Heading size="4">Dependents</Heading>
                    <Flex gap="2">
                        <Button asChild variant="outline" size="2">
                            <a
                                href="/admin/dependents/export"
                                target="_blank" 
                                rel="noopener"
                            >
                                <DownloadIcon />
                                Export CSV
                            </a>
                        </Button>
                        <Button asChild variant="solid" size="2" color="emerald">
                            <a
                                href="/admin/dependents/export-pdf"
                                target="_blank" 
                                rel="noopener"
                            >
                                <FileTextIcon />
                                Export PDF
                            </a>
                        </Button>
                    </Flex>
                </Flex>
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
