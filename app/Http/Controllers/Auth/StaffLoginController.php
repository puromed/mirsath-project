<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StaffLoginRequest; // This might need to be created or adjusted
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StaffLoginController extends Controller
{
    /**
     * Display the staff login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // Corrected to render AdminLogin.jsx
        return Inertia::render('Auth/AdminLogin'); 
    }

    /**
     * Handle an incoming staff authentication request.
     *
     * @param  \App\Http\Requests\Auth\StaffLoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StaffLoginRequest $request)
    {
        $request->authenticate('staff');

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Destroy an authenticated session for staff.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('staff')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
