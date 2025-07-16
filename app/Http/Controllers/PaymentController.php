<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Store a new payment transaction for the authentication
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */

    public function store(Request $request)
    {
        $member = $request->user()->member;

        // Create the transaction record
        $member->transactions()->create([
            'amount' => 60.00,
            'purpose' => 'MembershipFee',
            'transaction_date' => Carbon::now(),
        ]);

        return back()->with('success', 'Payment completed successfully');
    }
}
