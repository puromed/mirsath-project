<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Relations\Relation;
use App\Models\Member;
use App\Models\Dependent;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure polymorphic relationships
        Relation::enforceMorphMap([
            // Support both lowercase and capitalized type strings stored in the database
            'member'     => Member::class,
            'Member'     => Member::class,
            'dependent'  => Dependent::class,
            'Dependent'  => Dependent::class,
        ]);
    }
}
