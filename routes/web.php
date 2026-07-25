<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\DailyReportController;
use App\Http\Controllers\RepairTicketController;
use App\Http\Controllers\CostEntryController;
use App\Http\Controllers\CrewMemberController;
use App\Http\Controllers\AttendanceController;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('inventory', InventoryItemController::class)
    ->only(['index', 'create', 'store', 'destroy']);
    Route::resource('daily-reports', DailyReportController::class)
    ->only(['index', 'create', 'store']);
    Route::resource('repair-tickets', RepairTicketController::class)
    ->only(['index', 'update']);
    Route::resource('cost-entries', CostEntryController::class)
    ->only(['index', 'create', 'store']);
    Route::resource('crew-members', CrewMemberController::class)
    ->only(['index', 'create', 'store']);

Route::get('/attendances/create', [AttendanceController::class, 'create'])->name('attendances.create');
Route::post('/attendances', [AttendanceController::class, 'store'])->name('attendances.store');
});