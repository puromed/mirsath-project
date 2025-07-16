import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Card,
  Table,
  Badge,
  Button,
  TextField,
} from '@radix-ui/themes';
import { 
    MagnifyingGlassIcon, 
    UploadIcon,
    PersonIcon,
} from '@radix-ui/react-icons';
import AdminLayout from '@/Layouts/AdminLayout';

// Mock data for the Recent Invoices table
const mockInvoices = [
  { id: 'INV-001', memberName: 'Ain Balqis Azhar', about: 'Yuran Tahunan', year: '2025', amount: 'RM70', date: 'Jun 1, 20...', status: 'Selesai' },
];

// Mock data for the new contributions table
const mockSumbangan = [
    { id: 'SUMB-001', memberName: 'Ain Balqis Azhar', about: 'Yuran Tahunan', year: '2025', amount: 'RM0.70', date: 'Jun 1, 20...', status: 'Selesai' },
    { id: 'SUMB-002', memberName: 'Afiq Faris Bin Zamri', about: 'Yuran Tahunan', year: '2025', amount: 'RM500,000', date: 'May 29, ...', status: 'Selesai' },
    { id: 'SUMB-003', memberName: 'Fathiah Binti Arfan Arip', about: 'Yuran Tahunan', year: '2025', amount: 'RM30.00', date: 'May 15, 2...', status: 'Selesai' },
];

// Mock data for the dashboard stats
const dashboardStats = {
  monthlyFeePercentage: 70,
  weeklyFeePercentage: 0,
  paymentsReceived: 70.00,
  totalMembers: 10,
  activeMembers: 1,
};

// Custom Circular Progress Component
const CircularProgress = ({ percentage, size = 80, strokeWidth = 8 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <Box style={{ width: size, height: size }} className="relative">
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle className="text-slate-200" strokeWidth={strokeWidth} stroke="currentColor" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
          <circle
            className="text-primary-green"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        {percentage > 0 && (
            <Flex align="center" justify="center" className="absolute top-0 left-0 w-full h-full">
            <Text size="5" weight="bold" className="text-text-dark">
                {percentage}%
            </Text>
            </Flex>
        )}
      </Box>
    );
};

export default function Dashboard() {
    return (
        <AdminLayout>
            <Box className="flex-1">
                {/* Search Bar */}
                <Box className="mb-6">
                    <TextField.Root placeholder="Search here" radius="full" className="w-80">
                        <TextField.Slot><MagnifyingGlassIcon height="16" width="16" /></TextField.Slot>
                    </TextField.Root>
                </Box>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <Card className="lg:col-span-2 p-4 shadow-md" variant="surface">
                        <Flex justify="around" align="center" className="h-full">
                            <Flex direction="column" align="center" gap="2">
                                <CircularProgress percentage={dashboardStats.monthlyFeePercentage} />
                            </Flex>
                            <Flex direction="column" align="center" gap="2" className="text-center">
                                <Button variant="solid" color="gray" highContrast className="mt-2" size="1">
                                    Kemaskini
                                </Button>
                            </Flex>
                            <Flex direction="column" align="center" gap="2">
                                <CircularProgress percentage={dashboardStats.weeklyFeePercentage} />
                            </Flex>
                        </Flex>
                    </Card>

                    <Card className="p-4 shadow-md" variant="surface">
                        <Flex direction="column" justify="between" className="h-full">
                            <Flex justify="end" align="start">
                                <Button variant="outline" color="gray" size="1" radius="full">
                                    <UploadIcon width="12" height="12" className="mr-1"/>Report
                                </Button>
                            </Flex>
                            <Box className="mt-4">
                                <Text size="8" weight="bold" className="text-text-dark">RM {dashboardStats.paymentsReceived.toFixed(2)}</Text>
                                <Flex gap="1" className="mt-1">
                                    {Array.from({ length: dashboardStats.totalMembers }).map((_, i) => (
                                        <PersonIcon key={i} className={i < dashboardStats.activeMembers ? 'text-text-dark' : 'text-text-muted'} />
                                    ))}
                                </Flex>
                                <Text size="1" className="text-text-muted mt-1">{dashboardStats.activeMembers} orang ahli berdaftar</Text>
                            </Box>
                        </Flex>
                    </Card>
                </div>

                {/* Tables */}
                <div className="space-y-6">
                    <Card className="shadow-md" variant="surface">
                        <Text size="5" weight="bold" className="text-text-dark mb-4 block">Invois Terbaru</Text>
                        <Table.Root variant="surface">
                            <Table.Header className="bg-primary-green">
                                <Table.Row>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">#</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Ahli</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Bayaran Mengenai</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Tahun</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Jumlah</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Tarikh Invois</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Invois</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {mockInvoices.map((invoice) => (
                                    <Table.Row key={invoice.id}>
                                        <Table.Cell>{invoice.id}</Table.Cell>
                                        <Table.Cell>{invoice.memberName}</Table.Cell>
                                        <Table.Cell>{invoice.about}</Table.Cell>
                                        <Table.Cell>{invoice.year}</Table.Cell>
                                        <Table.Cell>{invoice.amount}</Table.Cell>
                                        <Table.Cell>{invoice.date}</Table.Cell>
                                        <Table.Cell><Badge color="green" variant="surface" highContrast>{invoice.status}</Badge></Table.Cell>
                                        <Table.Cell><Button size="1" variant="soft">Invois</Button></Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Card>
                    <Card className="shadow-md" variant="surface">
                        <Text size="5" weight="bold" className="text-text-dark mb-4 block">Sumbangan Terbaru</Text>
                        <Table.Root variant="surface">
                            <Table.Header className="bg-primary-green">
                                <Table.Row>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">#</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Ahli</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Bayaran Mengenai</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Tahun</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Jumlah</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Tarikh Invois</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className="text-accent-light-green">Invois</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {mockSumbangan.map((sumbangan) => (
                                    <Table.Row key={sumbangan.id}>
                                        <Table.Cell>{sumbangan.id}</Table.Cell>
                                        <Table.Cell>{sumbangan.memberName}</Table.Cell>
                                        <Table.Cell>{sumbangan.about}</Table.Cell>
                                        <Table.Cell>{sumbangan.year}</Table.Cell>
                                        <Table.Cell>{sumbangan.amount}</Table.Cell>
                                        <Table.Cell>{sumbangan.date}</Table.Cell>
                                        <Table.Cell><Badge color="green" variant="surface" highContrast>{sumbangan.status}</Badge></Table.Cell>
                                        <Table.Cell><Button size="1" variant="soft">Invois</Button></Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </Card>
                </div>
            </Box>
        </AdminLayout>
    );
}
