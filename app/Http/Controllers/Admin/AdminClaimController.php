<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClaimReviewRequest;
use App\Models\Claim;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminClaimController extends Controller
{
    /* GET /admin/claims */
    public function index(): Response
    {
        // Load member (for name) and deceased (for name/relationship)
        $claims = Claim::with(['member', 'deceased'])
                       ->latest()
                       ->paginate(15);

        return Inertia::render('Admin/ClaimsIndex', ['claims' => $claims]);
    }

    /* GET /admin/claims/{claim} */
    public function show(Claim $claim): Response
    {
        // Eager-load everything the detail page needs
        $claim->load(['member', 'deceased', 'submittedBy', 'reviewer']);
        return Inertia::render('Admin/ClaimShow', ['claim' => $claim]);
    }

    /* PATCH /admin/claims/{claim}/approve */
    public function approve(ClaimReviewRequest $request, Claim $claim)
    {
        $staff = auth('staff')->user();

        $claim->update([
            'status'               => 'Approved',
            'payout_amount'        => $request->payout_amount,
            'decision_notes'       => $request->decision_notes,
            'decision_date'        => now(),
            'approved_by_staff_id' => $staff->id,
        ]);

        return back()->with('success', 'Claim approved.');
    }

    /* PATCH /admin/claims/{claim}/reject */
    public function reject(ClaimReviewRequest $request, Claim $claim)
    {
        $staff = auth('staff')->user();

        $claim->update([
            'status'               => 'Rejected',
            'decision_notes'       => $request->decision_notes,
            'decision_date'        => now(),
            'approved_by_staff_id' => $staff->id,
        ]);

        return back()->with('success', 'Claim rejected.');
    }

    /* GET /admin/claims/{claim}/certificate */
    public function download(Claim $claim)
    {
        return Storage::disk('private')->download($claim->death_certificate_url);
    }
}
