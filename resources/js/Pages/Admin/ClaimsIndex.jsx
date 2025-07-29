import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  Table,
  Button,
  ScrollArea,
  Flex,
  Badge,
} from '@radix-ui/themes';
import { ArrowRightIcon, DownloadIcon, FileTextIcon } from '@radix-ui/react-icons';
import AdminLayout from '@/Layouts/AdminLayout';

// Date only if not null (DD/MM/YYYY format)
const displayDate = iso =>
    iso ? new Date(iso).toLocaleDateString('en-GB') : '-';


export default function ClaimsIndex({ claims }) {
  const { flash } = usePage().props;

  /* helper to color status */
  const statusBadge = status => {
    const map = {
      Pending: 'yellow',
      Approved: 'green',
      Rejected: 'red',
    };
    return (
      <Badge color={map[status] || 'gray'} size="1" radius="full">
        {status}
      </Badge>
    );
  };

  const renderPagination = () => (
    <Flex gap="2" justify="center" className="mt-4">
      {claims.links.map(link => {
        const label = link.label.replace('&laquo;','«').replace('&raquo;','»');
        if (!link.url) {
          return (
            <Button key={label} disabled variant="soft" size="1">
              {label}
            </Button>
          );
        }
        return (
          <Link href={link.url} key={label} preserveScroll preserveState>
            <Button variant={link.active ? 'solid':'soft'} size="1">
              {label}
            </Button>
          </Link>
        );
      })}
    </Flex>
  );

  return (
    <AdminLayout>
      <Head title="Claims" />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-semibold mb-4">Claims for Review</h1>

        {flash.success && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-200 rounded p-2 text-sm">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-200 rounded p-2 text-sm">
            {flash.error}
          </div>
        )}

        <ScrollArea type="auto" scrollbars="vertical" className="border rounded">
          <Table.Root size="2" className="min-w-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Member</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Deceased</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Submitted</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Decision</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {claims.data.map(claim => (
                <Table.Row key={claim.id}>
                  <Table.Cell>{claim.id}</Table.Cell>
                  <Table.Cell>{claim.member?.name ?? '-'}</Table.Cell>
                  <Table.Cell>{claim.deceased?.name ?? '-'}</Table.Cell>
                  <Table.Cell>{statusBadge(claim.status)}</Table.Cell>
                  <Table.Cell>{displayDate(claim.submission_date)}</Table.Cell>
                  <Table.Cell>{displayDate(claim.decision_date)}</Table.Cell>
                  <Table.Cell>
                    <Link href={`/admin/claims/${claim.id}`} preserveScroll>
                      <Button size="1" variant="ghost" color="gray" title="View">
                        <ArrowRightIcon />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </ScrollArea>

        {/* Export Buttons */}
        <Flex gap="3" className="mt-4">
          <a
            href="/admin/claims/export"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
            target="_blank" 
            rel="noopener"
          >
            <DownloadIcon className="w-4 h-4" />
            Download CSV
          </a>
          
          <a
            href="/admin/claims/export-pdf"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            target="_blank" 
            rel="noopener"
          >
            <FileTextIcon className="w-4 h-4" />
            Download PDF
          </a>
        </Flex>

        {renderPagination()}
      </div>
    </AdminLayout>
  );
}
