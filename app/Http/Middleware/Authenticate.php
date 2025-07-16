<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; // Import the Route facade

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if (! $request->expectsJson()) {
            // Check if the current route is an admin route
            if ($request->routeIs('admin.*')) {
                return route('admin.login');
            }
            
            // Default to the standard login route
            return route('login');
        }
        return null;
    }
}
