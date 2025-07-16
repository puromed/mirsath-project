<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\StaffLoginController; // Added this line
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Models\Member;
use App\Http\Controllers\DependentController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\PaymentController;
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

    // Dependent Routes
    Route::resource('dependents', DependentController::class)
    ->only(['store', 'update', 'destroy'])
    ->names('member.dependents');

    // Payment Routes
    Route::post('payment', [PaymentController::class, 'store'])->name('payment.store');
});

/*
|--------------------------------------------------------------------------
| Staff & Admin Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest:staff')->group(function () {
        Route::get('login', [StaffLoginController::class, 'create'])->name('login');
        Route::post('login', [StaffLoginController::class, 'store']);
    });

    Route::middleware('auth:staff')->group(function () {
        Route::post('logout', [StaffLoginController::class, 'destroy'])->name('logout');
        
        // Admin Dashboard Route
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Route to update member status
        Route::put('members/{member}/status', [AdminDashboardController::class, 'updateMemberStatus'])->name('members.updateStatus');
    });
});
