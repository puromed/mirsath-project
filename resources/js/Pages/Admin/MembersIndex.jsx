import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, Table, Heading, Flex, Button } from '@radix-ui/themes';
import { DownloadIcon, FileTextIcon } from '@radix-ui/react-icons';

export default function MembersIndex({ members = [] }) {
    return (
        <AdminLayout
            pageTitle="Members"
            pageSubtitle="View and manage all members."
        >
            <Head title="Members" />
            <Card>
                <Flex justify="between" align="center" mb="4">
                    <Heading size="4">Members</Heading>
                    <Flex gap="2">
                        <Button asChild variant="outline" size="2">
                            <a
                                href="/admin/members/export"
                                target="_blank" 
                                rel="noopener"
                            >
                                <DownloadIcon />
                                Export CSV
                            </a>
                        </Button>
                        <Button asChild variant="solid" size="2" color="emerald">
                            <a
                                href="/admin/members/export-pdf"
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
            </Card>
        </AdminLayout>
    );
}
