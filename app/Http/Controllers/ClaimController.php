<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClaimStoreRequest;
use App\Models\Claim;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ClaimController extends Controller
{
    /**
     * Handle a new claim submission (member-side).
     */
    public function store(ClaimStoreRequest $request): RedirectResponse
    {
        // Auth::user() returns an instance of App\Models\User. We need the related Member record.
        $member = $request->user()->member; // assumes a one-to-one User→Member relationship

        $path = $request->file('death_certificate')->store('certificates', 'private');

        if (! $member) {
            abort(403, 'Member profile not found.');
        }

        $member->claims()->create([
            'deceased_person_id'   => $request->deceased_person_id,
            'deceased_person_type' => strtolower($request->deceased_person_type), // Convert to lowercase for morphMap
            'date_of_death'        => $request->date_of_death,
            'death_certificate_url' => $path,
            'submission_date'      => now(),
            'status'               => 'Pending Review',
        ]);

        return back()->with('success', 'Claim & document submitted successfully.');
    }

    
}