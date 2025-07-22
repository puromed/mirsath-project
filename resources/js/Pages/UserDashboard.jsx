import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useForm, router} from '@inertiajs/react';
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
    AlertDialog,
    Tooltip,
    Dialog,
    TextField,
    Select,
} from '@radix-ui/themes';
import { 
    PlusIcon,
    PersonIcon,
    Pencil2Icon,
    ReloadIcon,
    UpdateIcon,
    TrashIcon,
    CheckCircledIcon,
    Cross2Icon
} from '@radix-ui/react-icons';
import UserLayout from '@/Layouts/UserLayout';




export default function UserDashboard() {
    const { user = {}, dependents = [], claims = [], payments = [], payouts = [], hasPaidAnnual = false } = usePage().props;

    // Build a Set of IDs already used in pending claims
    const pendingKeys = new Set(
        claims.filter(c => c.status?.toLowerCase().startsWith('pending'))
              .map(c => `${c.deceased_person_type}-${c.deceased_person_id}`)
    );

    // Filter payments by purpose for separate display
    const membershipPayments = payments.filter(p => p.purpose === 'MembershipFee');

    const [isLoading, setIsLoading] = useState(false);
    const [claimsLoading, setClaimsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dependentToDelete, setDependentToDelete] = useState(null);

    // State for the new payment modal
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState('initial'); // 'initial', 'processing', 'completed'

    // Inertia form for annual membership payment
    const {
        data: paymentData,
        setData: setPaymentData,
        post: postPayment,
        processing: processingPayment,
    } = useForm({
        amount: 60,
        purpose: 'MembershipFee',
    });

    const submitPayment = () => {
        postPayment('/payment', {
            preserveScroll: true,
            onSuccess: () => {
                setPaymentStep('completed');
                // refresh page props to reflect new payment
                router.reload({ only: ['payments', 'hasPaidAnnual'] });
            },
            onError: () => {
                // Reset back to initial state on error
                setPaymentStep('initial');
            }
        });
    }

    // ----- Claim Modal State & Form -----
    const [isClaimModalOpen, setClaimModalOpen] = useState(false);
    const {
        data: claimData,
        setData: setClaimData,
        post: postClaim,
        processing: processingClaim,
        reset: resetClaimForm,
    } = useForm({
        deceased_person_id: '',
        deceased_person_type: 'Member',
        date_of_death: '',
        death_certificate: null,
    });

    const submitClaim = (e) => {
        e.preventDefault();
        postClaim('/claim', {
            forceFormData: true,
            onSuccess: () => {
                resetClaimForm();
                setClaimModalOpen(false);
            },
        });
    };

    // Inertia form helper for adding a new dependent
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        ic_number: '',
        relationship: 'Spouse', //Default Value
        date_of_birth: '',
    });

    return (
        <UserLayout userName={user.name}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* My Claims Section */}
                    <Card className="shadow-md" variant="surface">
                        <Flex justify="between" align="center" className="mb-4">
                            <Flex align="center" gap="2">
                                <Heading as="h3" size="4" className="text-text-dark">My Claims</Heading>
                                <Button
                                    variant="ghost"
                                    size="1"
                                    onClick={() => {
                                        setClaimsLoading(true);
                                        setTimeout(() => setClaimsLoading(false), 800);
                                    }}
                                >
                                    <ReloadIcon className={claimsLoading ? "animate-spin" : ""} />
                                </Button>
                            </Flex>
                            <Tooltip content="Start a new claim application">
                                <Button variant="solid" onClick={() => setClaimModalOpen(true)}><PlusIcon className="mr-1"/> Submit New Claim</Button>
                            </Tooltip>
                        </Flex>

                        {claimsLoading ? (
                            <Flex align="center" justify="center" className="py-12">
                                <Flex direction="column" align="center" gap="2">
                                    <ReloadIcon className="h-8 w-8 animate-spin" />
                                    <Text size="2" className="text-text-muted">Loading claims...</Text>
                                </Flex>
                            </Flex>
                        ) : (
                            <Table.Root variant="surface">
                                <Table.Header>
                                    <Table.Row className="bg-accent-light-green">
                                        <Table.ColumnHeaderCell className="text-text-dark">Claim ID</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className="text-text-dark">Deceased Person</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className="text-text-dark">Date Submitted</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell className="text-text-dark">Status</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {claims.length === 0 ? (
                                        <Table.Row>
                                            <Table.Cell colSpan={4}>
                                                <Flex direction="column" align="center" className="py-8">
                                                    <Text className="text-text-muted">You haven't submitted any claims yet</Text>
                                                    <Button variant="solid" className="mt-4">
                                                        <PlusIcon className="mr-1"/> Submit Your First Claim
                                                    </Button>
                                                </Flex>
                                            </Table.Cell>
                                        </Table.Row>
                                    ) : (
                                        claims.map((claim) => (
                                            <Table.Row
                                                key={claim.id}
                                                className="hover:bg-accent-light-green/10 transition-colors duration-200"
                                            >
                                                <Table.Cell weight="medium">{claim.id}</Table.Cell>
                                                <Table.Cell>{claim.deceasedName}</Table.Cell>
                                                <Table.Cell>{claim.submissionDate}</Table.Cell>
                                                <Table.Cell>
                                                    <Tooltip content={`Payout: ${claim.payout}`}>
                                                        <Badge color={
                                                            claim.status?.toLowerCase() === 'approved' ? 'green' :
                                                            claim.status?.toLowerCase() === 'rejected' ? 'red' :
                                                            claim.status?.toLowerCase().startsWith('pending') ? 'amber' :
                                                            'gray'
                                                        }>
                                                            {claim.status}
                                                        </Badge>
                                                    </Tooltip>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))
                                    )}
                                </Table.Body>
                            </Table.Root>
                        )}
                    </Card>

                    {/* Membership Fee History */}
                    <Card className="shadow-md" variant="surface">
                        <Flex justify="between" align="center" className="mb-3">
                            <Heading as="h3" size="4" className="text-text-dark">Membership Fee History</Heading>
                        </Flex>
                        <Table.Root variant="surface">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Transaction ID</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {membershipPayments.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan="3" className="text-center py-4">
                                            <Text color="gray">No membership payments found</Text>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    membershipPayments.map(payment => (
                                        <Table.Row key={payment.id}>
                                            <Table.RowHeaderCell>{payment.id}</Table.RowHeaderCell>
                                            <Table.Cell>{payment.date}</Table.Cell>
                                            <Table.Cell>{payment.amount}</Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Card>

                    {/* Claim Payout History */}
                    <Card className="shadow-md" variant="surface">
                        <Flex justify="between" align="center" className="mb-3">
                            <Heading as="h3" size="4" className="text-text-dark">Claim Payout History</Heading>
                        </Flex>
                        <Table.Root variant="surface">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Transaction ID</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                                    
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {payouts.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan="3" className="text-center py-4">
                                            <Text color="gray">No claim payouts recorded</Text>
                                        </Table.Cell>
                                    </Table.Row>
                                ) : (
                                    payouts.map(payment => (
                                        <Table.Row key={payment.id}>
                                            <Table.RowHeaderCell>{payment.id}</Table.RowHeaderCell>
                                            <Table.Cell>{payment.date}</Table.Cell>
                                            <Table.Cell>{payment.amount}</Table.Cell>
                                        </Table.Row>
                                    ))
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Membership Status Card */}
                    <Card className="shadow-md" variant="surface">
                        <Flex justify="between" align="center" className="mb-3">
                            <Heading as="h3" size="4" className="text-text-dark">Membership Status</Heading>
                            <Tooltip content="View full membership details">
                                <Button variant="ghost" size="1">
                                    <Pencil2Icon />
                                </Button>
                            </Tooltip>
                        </Flex>
                        {isLoading ? (
                            <Flex align="center" justify="center" className="py-8">
                                <ReloadIcon className="h-6 w-6 animate-spin" />
                            </Flex>
                        ) : (
                            <Flex direction="column" gap="2">
                                <Flex justify="between">
                                    <Text size="2" className="text-text-muted">Status</Text>
                                    <Tooltip content="Your membership is active and in good standing">
                                        <Badge color="green" size="2">{user.status}</Badge>
                                    </Tooltip>
                                </Flex>
                                <Separator my="1" size="4" />
                                <Flex justify="between">
                                    <Text size="2" className="text-text-muted">Member Since</Text>
                                    <Text size="2" weight="medium" className="text-text-dark">{user.memberSince}</Text>
                                </Flex>
                                <Flex justify="between">
                                    <Text size="2" className="text-text-muted">Next Payment</Text>
                                    <Tooltip content="Your next annual payment due date">
                                        <Text size="2" weight="medium" className="text-text-dark">{user.nextPaymentDue}</Text>
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        )}
                    </Card>

                    {/* Annual Fee / Thank-you Card */}
                    <Card className="shadow-md" variant="surface">
                        {hasPaidAnnual ? (
                            <Flex direction="column" gap="3" align="center" py="6">
                                <Heading as="h3" size="4" className="text-text-dark" align="center">Thank you for joining Setia Alam Khairat!</Heading>
                                <Text size="2" color="gray" align="center">Your membership fee for this year has been received.</Text>
                            </Flex>
                        ) : (
                            <Flex direction="column" gap="3">
                                <Heading as="h3" size="4" className="text-text-dark">Annual Fee</Heading>
                                <Text as="p" size="2" color="gray">
                                    Your annual membership fee of RM60 is due. Pay now to maintain your active status.
                                </Text>
                                <Button onClick={() => {
                                    setPaymentStep('initial');
                                    setIsPaymentModalOpen(true);
                                }}>
                                    Pay RM60 Now
                                </Button>
                            </Flex>
                        )}
                    </Card>

                    {/* Payment Modal */}
                    <Dialog.Root open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                        <Dialog.Content style={{ maxWidth: 400 }}>
                            {paymentStep === 'initial' && (
                                <>
                                    <Dialog.Title>Confirm Annual Fee</Dialog.Title>
                                    <Dialog.Description size="2" mb="4">
                                        Pay RM60 to renew your membership.
                                    </Dialog.Description>
                                    <Flex gap="3" justify="end">
                                        <Button variant="soft" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
                                        <Button disabled={processingPayment} onClick={submitPayment}>
                                            {processingPayment ? 'Processing…' : 'Confirm & Pay'}
                                        </Button>
                                    </Flex>
                                </>
                            )}
                            {paymentStep === 'completed' && (
                                <Flex direction="column" align="center" gap="4" py="6">
                                    <CheckCircledIcon className="w-8 h-8 text-green-600" />
                                    <Heading as="h4" size="4">Payment Successful</Heading>
                                    <Button onClick={() => {
                                        setIsPaymentModalOpen(false);
                                        setPaymentStep('initial');
                                    }}>Close</Button>
                                </Flex>
                            )}
                        </Dialog.Content>
                    </Dialog.Root>

                    {/* My Family Card (Enhanced) */}
                    <Card className="shadow-md" variant="surface">
                        <Flex justify="between" align="center" className="mb-3">
                            <Heading as="h3" size="4" className="text-text-dark">My Family</Heading>

                            {/* Dialog for adding a dependent */}
                            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <Dialog.Trigger>
                                    <Button variant="soft" size="1"><PlusIcon /> Add</Button>
                                </Dialog.Trigger>

                                <Dialog.Content maxWidth="450px">
                                    <Dialog.Title>Add New Dependent</Dialog.Title>
                                    <Dialog.Description size="2" mb="4">
                                        Enter the details of your family member.
                                    </Dialog.Description>

                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        post('/dependents', {
                                            onSuccess: () => {
                                                reset();
                                                setIsModalOpen(false);
                                            },
                                            preserveScroll: true,
                                        });
                                    }}>
                                        <Flex direction="column" gap="3">
                                            {/* Full name */}
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">Full Name</Text>
                                                <TextField.Root
                                                    value={data.name}
                                                    onChange={e => setData('name', e.target.value)}
                                                    placeholder="e.g., Siti binti Kassim"
                                                    maxLength={50}
                                                />
                                                <Text size="1" color="gray" align="right">{data.name.length} / 50</Text>
                                                {errors.name && <Text color="red" size="1">{errors.name}</Text>}
                                            </label>

                                            {/* IC number */}
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">IC Number</Text>
                                                <TextField.Root
                                                    value={data.ic_number}
                                                    onChange={e => setData('ic_number', e.target.value)}
                                                    placeholder="e.g., 900101101234"
                                                    maxLength={12}
                                                />
                                                <Text size="1" color="gray" align="right">{data.ic_number.length} / 12</Text>
                                                {errors.ic_number && <Text color="red" size="1">{errors.ic_number}</Text>}
                                            </label>

                                            {/* Relationship & Date of Birth (unchanged) */}
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">Relationship</Text>
                                                <select
                                                    value={data.relationship}
                                                    onChange={e => setData('relationship', e.target.value)}
                                                    className="rt-BaseSelect"
                                                >
                                                    <option value="Spouse">Spouse</option>
                                                    <option value="Child">Child</option>
                                                    <option value="Parent">Parent</option>
                                                    <option value="Sibling">Sibling</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {errors.relationship && <Text color="red" size="1">{errors.relationship}</Text>}
                                            </label>
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">Date of Birth</Text>
                                                <TextField.Root
                                                    type="date"
                                                    value={data.date_of_birth}
                                                    onChange={e => setData('date_of_birth', e.target.value)}
                                                />
                                                {errors.date_of_birth && <Text color="red" size="1">{errors.date_of_birth}</Text>}
                                            </label>
                                        </Flex>

                                        <Flex gap="3" mt="4" justify="end">
                                            <Dialog.Close>
                                                <Button variant="soft" color="gray" type="button">Cancel</Button>
                                            </Dialog.Close>
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Saving…' : 'Save Dependent'}
                                            </Button>
                                        </Flex>
                                    </form>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Flex>

                        {/* Dependent list */}
                        <Flex direction="column" gap="3">
                            {dependents.length === 0 ? (
                                <Flex direction="column" align="center" gap="2" className="py-8">
                                    <Text className="text-text-muted">No family members added yet.</Text>
                                </Flex>
                            ) : (
                                dependents.map(dep => (
                                    <Flex key={dep.id} justify="between" align="center" className="hover:bg-accent-light-green/10 p-2 rounded-md transition-colors duration-200">
                                        <Box>
                                            <Text weight="medium" className="text-text-dark">{dep.name}</Text>
                                            <Text as="p" size="1" className="text-text-muted">{dep.relationship}</Text>
                                        </Box>
                                        <Tooltip content="Remove Dependent">
                                            <Button variant="ghost" color="red" size="1" onClick={() => setDependentToDelete(dep)}>
                                                <TrashIcon />
                                            </Button>
                                        </Tooltip>
                                    </Flex>
                                ))
                            )}
                        </Flex>

                        {/* Radix Alert Dialog for Delete Confirmation */}
                        <AlertDialog.Root open={dependentToDelete !== null} onOpenChange={() => setDependentToDelete(null)}>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Delete Dependent</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure you want to delete <Text weight="bold">{dependentToDelete?.name}</Text>? This action cannot be undone.
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button variant="solid" color="red" onClick={() => {
                                            router.delete(`/dependents/${dependentToDelete.id}`, {
                                                preserveScroll: true,
                                                onSuccess: () => setDependentToDelete(null),
                                            });
                                        }}>
                                            Delete
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Card>
                </div>
            </div>

            {/* Claim Submission Modal */}
            <Dialog.Root open={isClaimModalOpen} onOpenChange={setClaimModalOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Submit a New Claim</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Please fill in the details for the claim.
                    </Dialog.Description>

                    <form onSubmit={submitClaim}>
                        <Flex direction="column" gap="3">
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">Deceased Person</Text>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={claimData.deceased_person_id}
                                    onChange={e => {
                                        const id = e.target.value;
                                        setClaimData('deceased_person_id', id);
                                        setClaimData('deceased_person_type',
                                            id === String(user.id) ? 'Member' : 'Dependent'
                                        );
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select a person</option>
                                    <option value={user.id} disabled={pendingKeys.has(`Member-${user.id}`)}>{user.name} (Member){pendingKeys.has(`Member-${user.id}`) ? ' - Pending Claim' : ''}</option>
                                    {dependents.map(d => (
                                        <option key={d.id} value={d.id} disabled={pendingKeys.has(`Dependent-${d.id}`)}>{d.name} ({d.relationship}){pendingKeys.has(`Dependent-${d.id}`) ? ' - Pending Claim' : ''}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">Date of Death</Text>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={claimData.date_of_death}
                                    onChange={e => setClaimData('date_of_death', e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <Text as="div" size="2" mb="1" weight="bold">Death Certificate</Text>
                                <input
                                    type="file"
                                    className="w-full p-2 border rounded"
                                    onChange={e => setClaimData('death_certificate', e.target.files[0])}
                                    required
                                />
                            </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button type="button" variant="soft" color="gray">Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" disabled={processingClaim}>{processingClaim ? 'Submitting...' : 'Submit Claim'}</Button>
                        </Flex>
                    </form>

                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close"><Cross2Icon /></button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>


        </UserLayout>
    );
}