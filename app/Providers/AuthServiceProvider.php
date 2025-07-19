<?php

namespace App\Providers;

use App\Models\Dependent;
use App\Models\Claim;
use App\Policies\DependentPolicy;
use App\Policies\ClaimPolicy;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    protected $policies = [
        Dependent::class=> DependentPolicy::class,
        Claim::class=> ClaimPolicy::class,
    ];

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
       // No need to call registerPolicies() since we're not using policies
    }
}
