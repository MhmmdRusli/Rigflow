<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Mandor & Manajer: input dan lihat laporan harian
    Route::middleware('role:site_supervisor,project_manager')->group(function () {
        Route::resource('daily-reports', DailyReportController::class)->only(['index', 'create', 'store']);
    });

    // Logistik & Manajer: kelola inventaris dan tiket perbaikan
    Route::middleware('role:warehouse,project_manager')->group(function () {
        Route::resource('inventory', InventoryItemController::class)->only(['index', 'create', 'store', 'destroy']);
        Route::resource('repair-tickets', RepairTicketController::class)->only(['index', 'update']);
    });

    // Manajer & Klien: lihat biaya vs anggaran (klien read-only, tapi kita batasi create khusus manajer)
    Route::middleware('role:project_manager,client')->group(function () {
        Route::get('/cost-entries', [CostEntryController::class, 'index'])->name('cost-entries.index');
    });
    Route::middleware('role:project_manager')->group(function () {
        Route::get('/cost-entries/create', [CostEntryController::class, 'create'])->name('cost-entries.create');
        Route::post('/cost-entries', [CostEntryController::class, 'store'])->name('cost-entries.store');
    });

    // Mandor & Manajer: kelola kru dan absensi
    Route::middleware('role:site_supervisor,project_manager')->group(function () {
        Route::resource('crew-members', CrewMemberController::class)->only(['index', 'create', 'store']);
        Route::get('/attendances/create', [AttendanceController::class, 'create'])->name('attendances.create');
        Route::post('/attendances', [AttendanceController::class, 'store'])->name('attendances.store');
    });
});