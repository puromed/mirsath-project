<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

use App\Models\Transaction as Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Display the authenticated member’s payment history.
     */
    public function index()
    {
        $payments = Payment::where('member_id', Auth::id())
            ->latest('transaction_date')
            ->get([
                'id',
                'transaction_date as date',
                'purpose',
                'amount',
            ]);

        return Inertia::render('User/PaymentsHistory', [
            'payments' => $payments,
        ]);
    }

    /**
     * Record a new payment (e.g. annual membership fee).
     */
    public function store(Request $request)
    {
        $request->validate([
            'amount'   => ['required', 'numeric', 'min:1'],
            'purpose'  => ['required', 'string'],              // “MembershipFee”, “ClaimPayout”, etc.
            'claim_id' => ['nullable', 'exists:claims,id'],    // only for payouts
        ]);

        Payment::create([
            'member_id'        => Auth::id(),
            'claim_id'         => $request->claim_id,
            'amount'           => $request->amount,
            'purpose'          => $request->purpose,
            'transaction_date' => Carbon::now(),
        ]);

       return redirect()
       ->route('dashboard')
       ->with('success', 'Payment recorded successfully.');
    }
}