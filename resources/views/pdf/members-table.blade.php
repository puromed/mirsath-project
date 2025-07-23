<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Members Report - Mirsath Islamic Cooperative - {{ now()->format('M j, Y') }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        html {
            -webkit-print-color-adjust: exact;
            font-family: 'Inter', sans-serif;
        }
        
        body {
            font-size: 12px;
            line-height: 1.4;
            color: #374151;
        }
        
        .header-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v30H30zM0 30c0-16.569 13.431-30 30-30v30H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        .page-break {
            page-break-after: always;
        }
        
        .status-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }
        
        .status-active {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .status-rejected {
            background-color: #fee2e2;
            color: #991b1b;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th, td {
            border: 1px solid #e5e7eb;
            padding: 8px 12px;
            text-align: left;
        }
        
        th {
            background-color: #f9fafb;
            font-weight: 600;
            color: #374151;
        }
        
        tr:nth-child(even) {
            background-color: #f9fafb;
        }
        
        .company-logo {
            max-width: 120px;
            max-height: 80px;
            height: auto;
            width: auto;
        }
        
        .logo-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 80px;
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <div class="header-pattern bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 mb-8">
        <div class="flex justify-between items-start">
            <div>
                <h1 class="text-2xl font-bold text-emerald-900 mb-2">Members Report</h1>
                <div class="text-emerald-700">
                    <p class="font-medium">Mirsath | Setia Alam Mosque</p>
                    <p class="text-sm">Generated on {{ now()->format('F j, Y \a\t g:i A') }}</p>
                    <p class="text-sm">Total Members: {{ count($members) }}</p>
                </div>
            </div>
            <div class="logo-container">
                {{-- Company Logo --}}
                @php 
                    $logoPathSvg = public_path('Mirsath Logo.svg');
                    $logoPathPng = public_path('images/Mirsath Logo.PNG');
                    $useSvg = file_exists($logoPathSvg);
                    $usePng = file_exists($logoPathPng);
                @endphp
                
                @if($useSvg)
                    <div class="company-logo">
                        @inlinedImage($logoPathSvg)
                    </div>
                @elseif($usePng)
                    <div class="company-logo">
                        @inlinedImage($logoPathPng)
                    </div>
                @else
                    {{-- Fallback if logo not found --}}
                    <div class="w-24 h-24 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-xl">M</span>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <!-- Summary Statistics -->
    <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-amber-800">{{ $stats['pending'] ?? 0 }}</div>
            <div class="text-sm text-amber-600 font-medium">Pending</div>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-emerald-800">{{ $stats['active'] ?? 0 }}</div>
            <div class="text-sm text-emerald-600 font-medium">Active</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-red-800">{{ $stats['rejected'] ?? 0 }}</div>
            <div class="text-sm text-red-600 font-medium">Rejected</div>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-gray-800">{{ count($members) }}</div>
            <div class="text-sm text-gray-600 font-medium">Total</div>
        </div>
    </div>

    <!-- Members Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200">
        <table class="min-w-full">
            <thead>
                <tr class="bg-emerald-50">
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">IC Number</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Email</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Joined Date</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($members as $member)
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm font-medium text-gray-900">
                        #{{ $member->id }}
                    </td>
                    <td class="px-4 py-3">
                        <div class="text-sm font-medium text-gray-900">{{ $member->name }}</div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 font-mono">
                        {{ $member->ic_number }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                        {{ $member->user->email ?? 'N/A' }}
                    </td>
                    <td class="px-4 py-3">
                        @if($member->status === 'Pending')
                            <span class="status-badge status-pending">Pending</span>
                        @elseif($member->status === 'Active')
                            <span class="status-badge status-active">Active</span>
                        @elseif($member->status === 'Rejected')
                            <span class="status-badge status-rejected">Rejected</span>
                        @else
                            <span class="status-badge bg-gray-200 text-gray-800">{{ $member->status }}</span>
                        @endif
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">
                        {{ $member->created_at->format('M j, Y') }}
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                            <div class="text-4xl mb-2">👥</div>
                            <div class="font-medium">No members found</div>
                            <div class="text-sm">There are currently no members in the system.</div>
                        </div>
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Footer -->
    <div class="mt-12 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
        <div class="flex justify-between items-center">
            <div>
                <p class="font-medium">Mirsath Islamic Cooperative</p>
                <p>📍 Setia Alam Mosque, Shah Alam, Selangor</p>
            </div>
            <div class="text-right">
                <p>📧 info@mirsath.org</p>
                <p>🕌 Mosque Governed | Shariah Compliant</p>
            </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100">
            <p>This report contains confidential information. Please handle with care.</p>
            <p class="mt-1">Page @pageNumber of @totalPages | Generated by Mirsath Admin System</p>
        </div>
    </div>
</body>
</html>
