<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsStaff
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated with staff guard
        if (!Auth::guard('staff')->check()) {
            return redirect('/staff/login')->with('error', 'Please login as staff first.');
        }

        $staff = Auth::guard('staff')->user()->staff;
        
        // Ensure the staff record exists and has appropriate role
        if (!$staff || !in_array($staff->role, ['Admin', 'Nazir'])) {
            Auth::guard('staff')->logout();
            return redirect('/staff/login')->with('error', 'Unauthorized access.');
        }

        return $next($request);
    }
}
