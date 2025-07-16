import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Grid, Card, Text, Flex, Box, Heading, Table, Button } from '@radix-ui/themes';


export default function Dashboard({ auth, pendingMembers, recentMembers, stats }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* Stats Cards */}
            <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4" mb="6">
                <Card>
                    <Text as="div" size="2" weight="bold">Total Members</Text>
                    <Heading size="7">{stats.totalMembers}</Heading>
                </Card>
                <Card>
                    <Text as="div" size="2" weight="bold">Pending Approvals</Text>
                    <Heading size="7">{stats.pendingMembers}</Heading>
                </Card>
                <Card>
                    <Text as="div" size="2" weight="bold">Active Members</Text>
                    <Heading size="7">{stats.activeMembers}</Heading>
                </Card>
                <Card>
                    <Text as="div" size="2" weight="bold">Total Claims</Text>
                    <Heading size="7">{stats.totalClaims}</Heading>
                </Card>
            </Grid>

            {/* Pending Members Table */}
            <Card>
                <Heading size="4" mb="4">Pending Member Approvals</Heading>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>IC Number</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Registered On</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {pendingMembers.map((member) => (
                            <Table.Row key={member.id}>
                                <Table.Cell>{member.name}</Table.Cell>
                                <Table.Cell>{member.ic_number}</Table.Cell>
                                <Table.Cell>{new Date(member.created_at).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Flex gap="2">
                                        <Link href={`/admin/members/${member.id}/status`} method="put" data={{ status: 'Active' }} as="button" className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600">
                                            Approve
                                        </Link>
                                        <Link href={`/admin/members/${member.id}/status`} method="put" data={{ status: 'Rejected' }} as="button" className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600">
                                            Reject
                                        </Link>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </AdminLayout>
    );
}