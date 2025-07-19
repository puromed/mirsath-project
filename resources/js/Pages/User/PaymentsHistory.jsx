import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

function SummaryCard({ label, value }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-semibold mt-2">{value}</span>
    </div>
  );
}

export default function PaymentsHistory() {
  const { payments = [] } = usePage().props;

  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const years = [...new Set(payments.map(p => new Date(p.date).getFullYear()))].sort((a, b) => b - a);
  const [year, setYear] = useState('All');

  const filtered = payments.filter(p => {
    const term = search.toLowerCase();
    return (
      (p.id.toString().toLowerCase().includes(term) || (p.purpose || '').toLowerCase().includes(term) || (p.amount?.toString()||'').includes(term)) &&
      (type === 'All' || p.purpose === type) &&
      (year === 'All' || new Date(p.date).getFullYear().toString() === year)
    );
  });

  return (
    <>
      <Head title="Payment History" />
      <UserLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Payment History</h1>

          {/* Filters */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 shadow rounded p-4 flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Search</label>
              <input
                className="border rounded px-3 py-2"
                placeholder="Search by ID or purpose..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Type</label>
              <select className="border rounded px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
                <option>All</option>
                <option value="MembershipFee">Membership Fee</option>
                <option value="ClaimPayout">Claim Payout</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Year</label>
              <select className="border rounded px-3 py-2" value={year} onChange={e => setYear(e.target.value)}>
                <option>All</option>
                {years.map(y => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard label="Total Payments" value={filtered.length} />
            <SummaryCard label="Membership Fees" value={filtered.filter(p => p.purpose === 'MembershipFee').length} />
            <SummaryCard label="Claim Payouts" value={filtered.filter(p => p.purpose === 'ClaimPayout').length} />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border text-left">ID</th>
                  <th className="px-4 py-2 border text-left">Date</th>
                  <th className="px-4 py-2 border text-left">Purpose</th>
                  <th className="px-4 py-2 border text-left">Amount (RM)</th>
                  <th className="px-4 py-2 border text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map(p => (
                    <tr key={p.id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="px-4 py-2 border font-medium">{p.id}</td>
                      <td className="px-4 py-2 border">{new Date(p.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border">{p.purpose || '-'}</td>
                      <td className="px-4 py-2 border font-medium">{new Intl.NumberFormat('en-MY',{style:'currency',currency:'MYR'}).format(p.amount)}</td>
                      <td className="px-4 py-2 border"><span className={`px-2 py-0.5 rounded text-xs font-medium ${p.status==='Paid'?'bg-green-100 text-green-800':p.status==='Pending'?'bg-yellow-100 text-yellow-800':p.status==='Failed'?'bg-red-100 text-red-800':'bg-gray-100 text-gray-800'}`}>{p.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </UserLayout>
    </>
  );
}