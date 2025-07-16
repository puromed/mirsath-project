<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'icNumber' => 'required|string|digits:12|unique:members,ic_number',
            'phone_number' => 'required|string|max:11',
            'date_of_birth' => 'required|date',
            'house_no' => 'required|string|max:3',
            'street_address' => 'required|string|max:100',
            'postcode' => 'required|string|size:5',
            'next_of_kin_name' => 'required|string|max:50',
            'next_of_kin_phone' => 'required|string|max:11',
            'next_of_kin_relationship' => 'required|string|max:30',
            'email' => 'required|string|email|max:100|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $user->member()->create([
                'name' => $request->name,
                'ic_number' => $request->icNumber,
                'phone_number' => $request->phone_number,
                'date_of_birth' => $request->date_of_birth,
                'house_no' => $request->house_no,
                'street_address' => $request->street_address,
                'postcode' => $request->postcode,
                'city' => $request->city,
                'state' => $request->state,
                'membership_start_date' => now(),
                'status' => 'Pending',
                'next_of_kin_name' => $request->next_of_kin_name,
                'next_of_kin_phone' => $request->next_of_kin_phone,
                'next_of_kin_relationship' => $request->next_of_kin_relationship,
            ]);

            return $user;
        });

        // Don't auto-login user - they need admin approval first
        return redirect('/login')->with('success', 'Pendaftaran berjaya! Sila tunggu kelulusan admin sebelum log masuk.');
    }
}
