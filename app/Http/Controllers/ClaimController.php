<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClaimStoreRequest;
use App\Models\Claim;
use Illuminate\Http\RedirectResponse;

class ClaimController extends Controller
{
    /**
     * Handle a new claim submission (member-side).
     */
    public function store(ClaimStoreRequest $request): RedirectResponse
    {
        // Auth::user() returns an instance of App\Models\User. We need the related Member record.
        $member = $request->user()->member; // assumes a one-to-one User→Member relationship

        if (! $member) {
            abort(403, 'Member profile not found.');
        }

        $member->claims()->create([
            'deceased_person_id'   => $request->deceased_person_id,
            'deceased_person_type' => $request->deceased_person_type, // Member / Dependent
            'date_of_death'        => $request->date_of_death,
            // status defaults to “Pending” (set in the DB migration)
        ]);

        return back()->with('success', 'Claim submitted for review.');
    }
}