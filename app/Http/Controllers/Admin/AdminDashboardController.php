<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member; // <-- ADDED THIS LINE
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

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalMembers' => $totalMembers,
                'pendingMembers' => $pendingMembers->count(),
                'activeMembers' => $activeMembers,
                'totalClaims' => 0, // Placeholder for now
            ],
            'pendingMembers' => $pendingMembers->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'ic_number' => $member->ic_number,
                    'created_at' => $member->created_at->toIso8601String(),
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
