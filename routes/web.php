<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\StaffLoginController; // Added this line
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminClaimController;
use App\Models\Member;
use App\Http\Controllers\DependentController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\PaymentController;
use App\Http\Controllers\ClaimController;
use App\Http\Controllers\FaqController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public and Member Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return inertia('Home');
})->name('home');

// About Route
Route::get('/about', function () {
    return inertia('About');
})->name('about');

// FAQ Route (accessible to all)
Route::get('/faq', [FaqController::class, 'index'])->name('faq');

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    // Add member-specific routes here, e.g., /user/dashboard
    // Member Dashboard – dynamic
    Route::get('dashboard', [UserDashboardController::class, 'index'])->name('dashboard');

    // Placeholder pages for sidebar
    Route::get('profile', fn() => Inertia::render('User/Profile'))->name('profile');
    Route::get('dependents', [\App\Http\Controllers\DependentController::class, 'index'])->name('user.dependents');
    Route::get('claims', fn() => Inertia::render('User/ClaimsIndex'))->name('user.claims');
    Route::get('payments', [PaymentController::class, 'index'])->name('user.payments');

    // Dependent Routes
    Route::resource('dependents', DependentController::class)
    ->only(['store', 'update', 'destroy'])
    ->names('member.dependents');

    // Payment Routes
    Route::post('payment', [PaymentController::class, 'store'])->name('payment.store');
    

    // Claim Routes
    Route::post('claim', [ClaimController::class, 'store'])->name('claims.store');
    
});

/*
|--------------------------------------------------------------------------
| Staff & Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest:staff')->group(function () {
    Route::get('admin/login', [StaffLoginController::class, 'create'])->name('admin.login');
    Route::post('admin/login', [StaffLoginController::class, 'store']);
});

Route::middleware('auth:staff')->group(function () {
    Route::post('admin/logout', [StaffLoginController::class, 'destroy'])->name('admin.logout');
    
    // Admin Dashboard Route
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    // Route to update member status
    Route::put('admin/members/{member}/status', [AdminDashboardController::class, 'updateMemberStatus'])->name('admin.members.updateStatus');

    // Placeholder routes for new sidebar links
    Route::get('admin/members', function () {
        $members = \App\Models\Member::latest()->get(['id','name','ic_number','status','created_at']);
        return Inertia::render('Admin/MembersIndex', [
            'members' => $members,
        ]);
    })->name('admin.members.index');
    Route::get('admin/dependents', function () {
        $dependents = \App\Models\Dependent::with('member.user')->latest()->get();
        return Inertia::render('Admin/DependentsIndex', [
            'dependents' => $dependents,
        ]);
    })->name('admin.dependents.index');

    // Route to review claim
    Route::middleware(['can:review,App\Models\Claim'])
    ->group(function () {
        Route::get   ('admin/claims',                     [AdminClaimController::class,'index' ])->name('admin.claims.index');
        Route::get   ('admin/claims/{claim}',             [AdminClaimController::class,'show'  ])->whereNumber('claim')->name('admin.claims.show');
        Route::patch ('admin/claims/{claim}/approve',     [AdminClaimController::class,'approve'])->name('admin.claims.approve');
        Route::patch ('admin/claims/{claim}/reject',      [AdminClaimController::class,'reject' ])->name('admin.claims.reject');
        Route::get   ('admin/claims/{claim}/certificate', [AdminClaimController::class,'download'])->name('admin.claims.certificate');
    });

    // Route to export csv members
    Route::get('admin/members/export', [AdminDashboardController::class, 'exportMembers'])
    ->name('admin.members.export');

    // Route to export csv dependents
    Route::get('admin/dependents/export', [DependentController::class, 'exportDependents'])
    ->name('admin.dependents.export');

    // Route to export csv claims
    Route::get('admin/claims/export', [AdminClaimController::class, 'exportClaims'])
    ->name('admin.claims.export');
    
    // Route to export PDF claims
    Route::get('admin/claims/export-pdf', [AdminClaimController::class, 'exportClaimsPdf'])
    ->name('admin.claims.export.pdf');
});
