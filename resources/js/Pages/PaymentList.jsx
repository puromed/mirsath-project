import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import {
    Box,
    Flex,
    Text,
    Card,
    Table,
    Badge,
    Button,
    Heading,
    Separator,
    Tooltip,
    TextField,
    Select,
} from '@radix-ui/themes';
import { 
    ReloadIcon,
    DownloadIcon,
    CalendarIcon
} from '@radix-ui/react-icons';
import UserLayout from '@/Layouts/UserLayout';

export default function PaymentList() {
    const { user = {}, payments = [] } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterYear, setFilterYear] = useState('All');

    // Get unique years from payments for filter
    const availableYears = [...new Set(payments.map(payment => 
        new Date(payment.date).getFullYear()
    ))].sort((a, b) => b - a);

    // Filter payments based on search and filters
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            payment.purpose.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'All' || payment.purpose === filterType;
        const matchesYear = filterYear === 'All' || 
                          new Date(payment.date).getFullYear().toString() === filterYear;
        
        return matchesSearch && matchesType && matchesYear;
    });

    // Group payments by type
    const membershipPayments = filteredPayments.filter(p => p.purpose === 'MembershipFee');
    const claimPayouts = filteredPayments.filter(p => p.purpose === 'ClaimPayout');
    const otherPayments = filteredPayments.filter(p => 
        p.purpose !== 'MembershipFee' && p.purpose !== 'ClaimPayout'
    );

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleDownload = () => {
        // This would typically generate a PDF or CSV of payment history
        alert('Download functionality would be implemented here');
    };

    const PaymentTable = ({ title, payments, emptyMessage }) => (
        <Card className="shadow-md" variant="surface">
            <Flex justify="between" align="center" className="mb-4">
                <Heading as="h3" size="4" className="text-text-dark">{title}</Heading>
                <Text size="2" color="gray">
                    {payments.length} record{payments.length !== 1 ? 's' : ''}
                </Text>
            </Flex>
            
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row className="bg-accent-light-green">
                        <Table.ColumnHeaderCell className="text-text-dark">Transaction ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-text-dark">Date</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-text-dark">Purpose</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-text-dark">Amount</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="text-text-dark">Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {payments.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={5}>
                                <Flex direction="column" align="center" className="py-8">
                                    <Text className="text-text-muted">{emptyMessage}</Text>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        payments.map((payment) => (
                            <Table.Row 
                                key={payment.id}
                                className="hover:bg-accent-light-green/10 transition-colors duration-200"
                            >
                                <Table.Cell weight="medium">{payment.id}</Table.Cell>
                                <Table.Cell>
                                    <Flex align="center" gap="2">
                                        <CalendarIcon width="14" height="14" className="text-text-muted" />
                                        {new Date(payment.date).toLocaleDateString()}
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell>{payment.purpose || 'Payment'}</Table.Cell>
                                <Table.Cell weight="medium">{payment.amount}</Table.Cell>
                                <Table.Cell>
                                    <Badge color={
                                        payment.status === 'Paid' ? 'green' :
                                        payment.status === 'Pending' ? 'amber' :
                                        payment.status === 'Failed' ? 'red' : 'gray'
                                    }>
                                        {payment.status || 'Completed'}
                                    </Badge>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table.Root>
        </Card>
    );

    return (
        <UserLayout userName={user.name}>
            <div className="space-y-6">
                {/* Header */}
                <Flex justify="between" align="center">
                    <Box>
                        <Heading as="h1" size="6" className="text-text-dark">Payment History</Heading>
                        <Text className="text-text-muted">View and manage your payment transactions</Text>
                    </Box>
                    <Flex gap="2">
                        <Tooltip content="Refresh payment data">
                            <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                                <ReloadIcon className={isLoading ? "animate-spin" : ""} />
                                {!isLoading && "Refresh"}
                            </Button>
                        </Tooltip>
                        <Tooltip content="Download payment history">
                            <Button variant="solid" onClick={handleDownload}>
                                <DownloadIcon className="mr-1" />
                                Download
                            </Button>
                        </Tooltip>
                    </Flex>
                </Flex>

                {/* Filters */}
                <Card variant="surface">
                    <Flex direction="column" gap="4">
                        <Heading as="h3" size="3">Filters</Heading>
                        <Flex gap="4" wrap="wrap">
                            <Box style={{ minWidth: '200px' }}>
                                <Text as="label" size="2" weight="medium" className="block mb-1">
                                    Search
                                </Text>
                                <TextField.Root>
                                    <TextField.Input
                                        placeholder="Search by ID or purpose..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </TextField.Root>
                            </Box>
                            
                            <Box style={{ minWidth: '150px' }}>
                                <Text as="label" size="2" weight="medium" className="block mb-1">
                                    Type
                                </Text>
                                <Select.Root value={filterType} onValueChange={setFilterType}>
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Item value="All">All Types</Select.Item>
                                        <Select.Item value="MembershipFee">Membership Fee</Select.Item>
                                        <Select.Item value="ClaimPayout">Claim Payout</Select.Item>
                                        <Select.Item value="Other">Other</Select.Item>
                                    </Select.Content>
                                </Select.Root>
                            </Box>

                            <Box style={{ minWidth: '120px' }}>
                                <Text as="label" size="2" weight="medium" className="block mb-1">
                                    Year
                                </Text>
                                <Select.Root value={filterYear} onValueChange={setFilterYear}>
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Item value="All">All Years</Select.Item>
                                        {availableYears.map(year => (
                                            <Select.Item key={year} value={year.toString()}>
                                                {year}
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Root>
                            </Box>
                        </Flex>
                    </Flex>
                </Card>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="surface">
                        <Flex direction="column" gap="2">
                            <Text size="2" color="gray">Total Payments</Text>
                            <Text size="6" weight="bold">{filteredPayments.length}</Text>
                        </Flex>
                    </Card>
                    <Card variant="surface">
                        <Flex direction="column" gap="2">
                            <Text size="2" color="gray">Membership Fees</Text>
                            <Text size="6" weight="bold">{membershipPayments.length}</Text>
                        </Flex>
                    </Card>
                    <Card variant="surface">
                        <Flex direction="column" gap="2">
                            <Text size="2" color="gray">Claim Payouts</Text>
                            <Text size="6" weight="bold">{claimPayouts.length}</Text>
                        </Flex>
                    </Card>
                </div>

                {/* Payment Tables */}
                {isLoading ? (
                    <Card variant="surface">
                        <Flex align="center" justify="center" className="py-12">
                            <Flex direction="column" align="center" gap="2">
                                <ReloadIcon className="h-8 w-8 animate-spin" />
                                <Text size="2" className="text-text-muted">Loading payment history...</Text>
                            </Flex>
                        </Flex>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {membershipPayments.length > 0 && (
                            <PaymentTable 
                                title="Membership Fee Payments"
                                payments={membershipPayments}
                                emptyMessage="No membership fee payments found"
                            />
                        )}
                        
                        {claimPayouts.length > 0 && (
                            <PaymentTable 
                                title="Claim Payouts"
                                payments={claimPayouts}
                                emptyMessage="No claim payouts found"
                            />
                        )}
                        
                        {otherPayments.length > 0 && (
                            <PaymentTable 
                                title="Other Payments"
                                payments={otherPayments}
                                emptyMessage="No other payments found"
                            />
                        )}
                        
                        {filteredPayments.length === 0 && !isLoading && (
                            <Card variant="surface">
                                <Flex direction="column" align="center" className="py-12">
                                    <Text className="text-text-muted mb-4">No payments found matching your criteria</Text>
                                    <Button variant="soft" onClick={() => {
                                        setSearchTerm('');
                                        setFilterType('All');
                                        setFilterYear('All');
                                    }}>
                                        Clear Filters
                                    </Button>
                                </Flex>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
