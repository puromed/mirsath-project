<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Con                <div class="text-emerald-700">
                    <p class="font-medium">Mirsath Islamic Cooperative</p>
                    <p class="text-sm">Claims Management Report</p>
                    <p class="text-sm">Generated on {{ now()->format('F j, Y \a\t g:i A') }}</p>
                    <p class="text-sm">Total Claims: {{ count($claims) }}</p>
                </div>Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claims Report - Mirsath Islamic Cooperative - {{ now()->format('M j, Y') }}</title>
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
        
        .status-approved {
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
                <h1 class="text-2xl font-bold text-emerald-900 mb-2">Claims Report</h1>
                <div class="text-emerald-700">
                    <p class="font-medium">Mirsath | Setia Alam Mosque</p>
                    <p class="text-sm">Generated on {{ now()->format('F j, Y \a\t g:i A') }}</p>
                    <p class="text-sm">Total Claims: {{ count($claims) }}</p>
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
            <div class="text-2xl font-bold text-emerald-800">{{ $stats['approved'] ?? 0 }}</div>
            <div class="text-sm text-emerald-600 font-medium">Approved</div>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-red-800">{{ $stats['rejected'] ?? 0 }}</div>
            <div class="text-sm text-red-600 font-medium">Rejected</div>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-gray-800">{{ count($claims) }}</div>
            <div class="text-sm text-gray-600 font-medium">Total</div>
        </div>
    </div>

    <!-- Claims Table -->
    <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Claims Details</h2>
        
        <table class="w-full">
            <thead>
                <tr>
                    <th class="w-16">ID</th>
                    <th class="w-32">Member</th>
                    <th class="w-32">Deceased</th>
                    <th class="w-24">Status</th>
                    <th class="w-28">Submitted</th>
                    <th class="w-28">Decision</th>
                    <th class="w-24">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($claims as $claim)
                <tr>
                    <td class="font-mono">#{{ $claim->id }}</td>
                    <td>{{ $claim->member?->user?->name ?? $claim->member?->name ?? '-' }}</td>
                    <td>{{ $claim->deceased?->name ?? '-' }}</td>
                    <td>
                        <span class="status-badge status-{{ strtolower($claim->status) }}">
                            {{ $claim->status }}
                        </span>
                    </td>
                    <td>
                        @if($claim->submission_date)
                            {{ \Carbon\Carbon::parse($claim->submission_date)->format('M j, Y') }}
                        @else
                            -
                        @endif
                    </td>
                    <td>
                        @if($claim->decision_date)
                            {{ \Carbon\Carbon::parse($claim->decision_date)->format('M j, Y') }}
                        @else
                            -
                        @endif
                    </td>
                    <td>
                        @if($claim->payout_amount)
                            RM {{ number_format($claim->payout_amount, 2) }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Footer -->
    <div class="border-t border-gray-200 pt-4 mt-8 text-xs text-gray-500">
        <div class="flex justify-between items-center">
            <div>
                <p>&copy; {{ date('Y') }} Mirsath Islamic Cooperative. All rights reserved.</p>
                <p>This report is confidential and intended for internal use only.</p>
            </div>
            <div class="text-right">
                <p>Page @pageNumber of @totalPages</p>
                <p>Generated by: {{ auth('staff')->user()?->name ?? 'System' }}</p>
            </div>
        </div>
    </div>
</body>
</html>
