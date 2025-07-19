import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Badge, Box, Button, Card, Flex, Grid, Heading, Text, TextArea, TextField } from '@radix-ui/themes';
import { ArrowLeftIcon, DownloadIcon } from '@radix-ui/react-icons';


// Time if null 
const displayDate = iso =>
    iso ? new Date(iso). toLocaleString() : '-';

// A simple component to display a piece of information
const InfoBlock = ({ label, value, children }) => (
    <Box>
        <Text as="div" size="2" color="gray" mb="1">{label}</Text>
        {children ? (
            children
        ) : (
            <Text as="div" size="3" weight="bold">{value ?? '-'}</Text>
        )}
    </Box>
);

export default function ClaimShow({ claim }) {
    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('ms-MY', { style: 'currency', currency: 'MYR' }).format(amount);
    };

    const statusColors = {
        Pending: 'orange',
        Approved: 'green',
        Rejected: 'red',
    };

    // Approve form state
const { data: approveData, setData: setApprove, patch: patchApprove, processing: approving, errors: approveErrors } = useForm({
        payout_amount: '',
        decision_notes: '',
    });

// Reject form state
const { data: rejectData, setData: setReject, patch: patchReject, processing: rejecting, errors: rejectErrors } = useForm({
    decision_notes: '',
});

// Handlers
const handleApprove = (e) => {
    e.preventDefault();
    patchApprove(`/admin/claims/${claim.id}/approve`, { preserveScroll: true });
};

const handleReject = (e) => {
    e.preventDefault();
    patchReject(`/admin/claims/${claim.id}/reject`, { preserveScroll: true });
};

    return (
        <AdminLayout
            pageTitle="Claim Details"
            pageSubtitle={`Reviewing claim submitted on ${new Date(claim.submission_date).toLocaleDateString()}`}
        >
            <Head title={`Claim #${claim.id}`} />

            <div className="max-w-7xl mx-auto space-y-6">
                <Link href="/admin/claims" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeftIcon className="mr-2" />
                    Back to Claims
                </Link>

                <Grid columns={{ initial: '1', md: '3' }} gap="6">
                    {/* Main Details Column */}
                    <Box className="md:col-span-2">
                        <Card>
                            <Flex justify="between" align="start">
                                <Heading as="h2" size="6">Claim #{claim.id}</Heading>
                                <Badge color={statusColors[claim.status] || 'gray'} size="2">{claim.status}</Badge>
                            </Flex>

                            <Grid columns={{ initial: '1', sm: '2' }} gap="5" mt="6">
                                <InfoBlock label="Member Name" value={claim.member.name} />
                                <InfoBlock label="Deceased Person" value={claim.deceased.name} />
                                <InfoBlock label="Relationship to Member" value={claim.deceased.relationship} />
                                <InfoBlock label="Submission Date" value={displayDate(claim.submission_date)} />
                            </Grid>

                            <hr className="my-6" />

                            <Heading as="h3" size="4" mb="4">Review & Decision</Heading>
                            <Grid columns={{ initial: '1', sm: '2' }} gap="5">
                                <InfoBlock label="Decision" value={claim.status} />
                                <InfoBlock label="Decision Date" value={displayDate(claim.decision_date)} />
                                <InfoBlock label="Payout Amount">
                                    {claim.payout_amount ? (
                                        <Text as="div" size="3" weight="bold" color="green">{formatCurrency(claim.payout_amount)}</Text>
                                    ) : (
                                        <Text as="div" size="3" color="gray">Not applicable</Text>
                                    )}
                                </InfoBlock>
                                {/* <InfoBlock label="Reviewed By" value={claim.reviewer?.name} /> */}
                                <InfoBlock label="Reviewer Notes" value={claim.decision_notes} />
                            </Grid>
                        </Card>
                    </Box>

                    {/* Actions Column */}
                    <Box>
                        <Card>
                            <Heading as="h3" size="4" mb="4">Actions</Heading>
                            <Flex direction="column" gap="3">
                                <Button color="gray" variant="soft" asChild>
                                    <a href={`/admin/claims/${claim.id}/certificate`} target="_blank">
                                        <DownloadIcon className="mr-2" />
                                        Download Certificate
                                    </a>
                                </Button>

                                {/* Approval and Rejection forms will go here */}
                                {claim.status === 'Pending Review' && (
                                    <>
                                        {/* Approve form */}
                                        <Box className="p-4 bg-green-50 rounded-lg mt-4">
                                            <Heading size="3" mb="3">Approve Claim</Heading>
                                            <form onSubmit={handleApprove}>
                                                <Flex direction="column" gap="3">
                                                    <TextField.Root
                                                        type="number"
                                                        placeholder="Payout amount"
                                                        value={approveData.payout_amount}
                                                        onChange={(e) => setApprove('payout_amount', e.target.value)}
                                                        required
                                                    />
                                                    {approveErrors?.payout_amount && <Text size="1" color="red">{approveErrors.payout_amount}</Text>}

                                                    <TextArea
                                                        placeholder="Optional notes"
                                                        value={approveData.decision_notes}
                                                        onChange={(e) => setApprove('decision_notes', e.target.value)}
                                                    />
                                                    {approveErrors?.decision_notes && <Text size="1" color="red">{approveErrors.decision_notes}</Text>}

                                                    <Button type="submit" disabled={approving} color="green">
                                                        {approving ? 'Approving…' : 'Approve'}
                                                    </Button>
                                                </Flex>
                                            </form>
                                        </Box>

                                        {/* Reject form */}
                                        <Box className="p-4 bg-red-50 rounded-lg mt-2">
                                            <Heading size="3" mb="3">Reject Claim</Heading>
                                            <form onSubmit={handleReject}>
                                                <Flex direction="column" gap="3">
                                                    <TextArea
                                                        placeholder="Reason for rejection"
                                                        value={rejectData.decision_notes}
                                                        onChange={(e) => setReject('decision_notes', e.target.value)}
                                                        required
                                                    />
                                                    {rejectErrors?.decision_notes && <Text size="1" color="red">{rejectErrors.decision_notes}</Text>}

                                                    <Button type="submit" color="red" disabled={rejecting}>
                                                        {rejecting ? 'Rejecting…' : 'Reject'}
                                                    </Button>
                                                </Flex>
                                            </form>
                                        </Box>
                                    </>
                                )}
                            </Flex>
                        </Card>
                    </Box>
                </Grid>
            </div>
        </AdminLayout>
    );
}