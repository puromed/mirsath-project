<?php

namespace App\Http\Controllers\Admin;

use Spatie\SimpleExcel\SimpleExcelWriter;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member; 
use App\Models\Claim;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\MemberStatusUpdated;
use Spatie\LaravelPdf\Facades\Pdf;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $pendingMembers = Member::where('status', 'Pending')->latest()->get();
        $activeMembers = Member::where('status', 'Active')->count();
        $totalMembers = Member::count();
        $totalClaims = Claim::count();

        $pendingClaims = Claim::with(['member', 'deceased'])
            ->where('status', 'Pending Review')
            ->latest('submission_date')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalMembers' => $totalMembers,
                'pendingMembers' => $pendingMembers->count(),
                'activeMembers' => $activeMembers,
                'totalClaims' => $totalClaims,
            ],
            'pendingMembers' => $pendingMembers->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'ic_number' => $member->ic_number,
                    'created_at' => $member->created_at->toIso8601String(),
                ];
            }),
            'pendingClaims' => $pendingClaims->map(function ($claim) {
                return [
                    'id' => $claim->id,
                    'member_name' => $claim->member->name,
                    'deceased_name' => $claim->deceased->name,
                    'submission_date' => optional($claim->submission_date)->toFormattedDateString() ?? '—',
                ];
            }),
        ]);
    }

    /**
     * Update the status of a member.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member  $member  
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateMemberStatus(Request $request, Member $member)
    {
        $request->validate([
            'status' => 'required|in:Active,Rejected',
        ]);

        $member->status = $request->status;
        $member->has_seen_status_update = false;
        $member->save();

        // Notify the member
        $member->notify(new MemberStatusUpdated($member->status));

        return redirect()->route('admin.dashboard')->with('success', 'Member status updated successfully.');
    }

    // Export members to CSV
    public function exportMembers(): BinaryFileResponse
    {
        // Create a temporary file on disk
        $tempPath = tempnam(sys_get_temp_dir(), 'members_') . '.csv';

        $writer = SimpleExcelWriter::create($tempPath)
            ->addHeader(['ID', 'Name', 'IC Number', 'Status', 'Created']);

        Member::select('id', 'name', 'ic_number', 'status', 'created_at')
            ->orderBy('created_at')
            ->chunk(1000, function ($chunk) use ($writer) {
                $writer->addRows($chunk->toArray());
            });

        // Close the writer to flush data
        unset($writer);

        return response()->download($tempPath, 'members.csv', [
            'Content-Type' => 'text/csv',
        ])->deleteFileAfterSend(true);
    }

    // Export members to PDF
    public function exportMembersPdf()
    {
        // Get all members with statistics
        $members = Member::with('user')
                        ->orderBy('created_at', 'desc')
                        ->get();

        // Calculate statistics
        $stats = [
            'pending' => $members->where('status', 'Pending')->count(),
            'active' => $members->where('status', 'Active')->count(),
            'rejected' => $members->where('status', 'Rejected')->count(),
        ];

        // Generate filename with current date
        $filename = 'members-report-' . now()->format('Y-m-d') . '.pdf';

        // Generate PDF using Spatie Laravel PDF
        return Pdf::view('pdf.members-table', [
                'members' => $members,
                'stats' => $stats,
            ])
            ->format('a4')
            ->orientation('landscape') // Better for table data
            ->margins(15, 15, 15, 15) // top, right, bottom, left in mm
            ->name($filename)
            ->download();
    }
}
