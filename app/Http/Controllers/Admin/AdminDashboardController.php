<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member; // <-- ADDED THIS LINE
use App\Models\Claim;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\MemberStatusUpdated;

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
     * @param  \App\Models\Member  $member  <-- This now works because of the import
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
}
