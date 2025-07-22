import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import {
  Table,
  Button,
  ScrollArea,
  Flex,
  Badge,
} from '@radix-ui/themes';

export default function DependentsList({ dependents = [] }) {
  const [query, setQuery] = React.useState('');

  // Simple client-side filter for dependents
  const filtered = React.useMemo(() => {
    if (!query.trim()) return dependents;
    const q = query.toLowerCase();
    return dependents.filter(d =>
      (d.name && d.name.toLowerCase().includes(q)) ||
      (d.ic_number && d.ic_number.toLowerCase().includes(q)) ||
      (d.relationship && d.relationship.toLowerCase().includes(q))
    );
  }, [query, dependents]);

  const formatDate = dateString => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <UserLayout>
      <Head title="My Dependents" />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-semibold mb-4">My Dependents</h1>

        {/* Search input */}
        <Flex gap="2" align="center" className="mb-4 max-w-md">
          <div className="flex-1">
            <input type="text" className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
              placeholder="Search by name, IC number, relationship…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <Button size="2" variant="soft" onClick={() => setQuery('')}>Clear</Button>
        </Flex>

        <ScrollArea type="auto" scrollbars="vertical" className="border rounded">
          <Table.Root size="2" className="min-w-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>IC Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Relationship</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Date of Birth</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Added</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filtered.map(dependent => (
                <Table.Row key={dependent.id}>
                  <Table.Cell className="font-medium">{dependent.name}</Table.Cell>
                  <Table.Cell>{dependent.ic_number}</Table.Cell>
                  <Table.Cell>
                    <Badge variant="soft" size="1">
                      {dependent.relationship}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{formatDate(dependent.date_of_birth)}</Table.Cell>
                  <Table.Cell>{formatDate(dependent.created_at)}</Table.Cell>
                </Table.Row>
              ))}
              {filtered.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan="5" className="text-center py-4 text-sm text-gray-500">
                    {dependents.length === 0 ? 'No dependents added yet.' : 'No dependents match your search.'}
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </ScrollArea>
      </div>
    </UserLayout>
  );
}
