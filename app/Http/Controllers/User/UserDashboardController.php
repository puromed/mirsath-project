<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class UserDashboardController extends Controller
{
    /**
     * Member dashboard – shows claims, dependents & recent payments.
     */
    public function index()
    {
        $user = Auth::user();
        $member = $user->member; // assumes relation exists

        // Build list of relationships only if methods exist
        $relations = [];
        if (method_exists($member, 'dependents')) {
            $relations[] = 'dependents';
        }
        if (method_exists($member, 'claims')) {
            $relations['claims'] = function ($q) {
                $q->latest()->limit(5);
            };
        }
        if (method_exists($member, 'transactions')) {
            $relations['transactions'] = function ($q) {
                $q->latest('transaction_date')->limit(5);
            };
        }
        if ($relations) {
            $member->load($relations);
        }

        // Build props expected by the React page
        $props = [
            'user' => [
                'name'             => $user->name,
                'status'           => $member->status ?? null,
                'memberSince'      => $member->membership_start_date ? Carbon::parse($member->membership_start_date)->format('M j, Y') : null,
                'nextPaymentDue'   => $member->next_payment_due ? Carbon::parse($member->next_payment_due)->format('M j, Y') : null,
            ],
            'dependents' => $member->dependents?->map(fn ($d) => [
                'id'           => $d->id,
                'name'         => $d->name,
                'relationship' => $d->relationship,
            ]) ?? [],
            'claims' => $member->claims?->map(fn ($c) => [
                'id'             => $c->claim_no,
                'deceasedName'   => $c->deceased_name,
                'submissionDate' => $c->submitted_at?->format('M d, Y'),
                'status'         => $c->status,
                'payout'         => $c->payout_amount ? 'RM '.number_format($c->payout_amount, 2) : null,
            ]) ?? [],
            'payments' => $member->transactions?->map(fn ($p) => [
                'id'     => $p->id,
                'date'   => $p->transaction_date ? Carbon::parse($p->transaction_date)->format('M d, Y') : null,
                'purpose'=> $p->purpose,
                'amount' => 'RM '.number_format($p->amount, 2),
            ]) ?? [],
            // hasPaidAnnual: true if at least one membership fee this calendar year
            'hasPaidAnnual' => $member->transactions()->where('purpose','MembershipFee')
                                 ->whereYear('transaction_date', now()->year)->exists(),
        ];

        return Inertia::render('UserDashboard', $props);
    }
}
