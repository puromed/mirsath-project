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
    Route::get('dependents', fn() => Inertia::render('User/DependentsList'))->name('user.dependents');
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
        $dependents = \App\Models\Dependent::with('member:id,name')->latest()->get(['id','name','relationship','member_id','created_at']);
        return Inertia::render('Admin/DependentsIndex', [
            'dependents' => $dependents,
        ]);
    })->name('admin.dependents.index');
    Route::get('admin/reports', function () { return Inertia::render('Admin/ReportsIndex'); })->name('admin.reports.index');

    // Route to review claim
    Route::middleware(['can:review,App\\Models\\Claim'])
    ->group(function () {
        Route::get   ('admin/claims',                     [AdminClaimController::class,'index' ])->name('admin.claims.index');
        Route::get   ('admin/claims/{claim}',             [AdminClaimController::class,'show'  ])->name('admin.claims.show');
        Route::patch ('admin/claims/{claim}/approve',     [AdminClaimController::class,'approve'])->name('admin.claims.approve');
        Route::patch ('admin/claims/{claim}/reject',      [AdminClaimController::class,'reject' ])->name('admin.claims.reject');
        Route::get   ('admin/claims/{claim}/certificate', [AdminClaimController::class,'download'])->name('admin.claims.certificate');
    });
});
