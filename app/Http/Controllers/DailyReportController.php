<?php

namespace App\Http\Controllers;

use App\Models\DailyReport;
use App\Models\InventoryItem;
use App\Models\RepairTicket;
use App\Models\RigUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DailyReportController extends Controller
{
    public function index()
{
    $reports = DailyReport::with(['rigUnit', 'user'])->latest()->get();

    $avgEfficiency = $reports->filter(fn ($r) => $r->depth_meters > 0)
        ->avg(fn ($r) => $r->fuel_liters / $r->depth_meters);

    return Inertia::render('DailyReports/Index', [
        'reports' => $reports,
        'totalReports' => $reports->count(),
        'avgEfficiency' => round($avgEfficiency ?? 0, 2),
        'issuesCount' => $reports->whereNotNull('equipment_issue')->count(),
    ]);
}

    public function create()
    {
        return Inertia::render('DailyReports/Create', [
            'rigUnits' => RigUnit::select('id', 'code', 'project_id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rig_unit_id' => 'required|exists:rig_units,id',
            'report_date' => 'required|date',
            'hourmeter_start' => 'required|numeric|min:0',
            'hourmeter_end' => 'required|numeric|gte:hourmeter_start',
            'fuel_liters' => 'required|numeric|min:0',
            'depth_meters' => 'required|numeric|min:0',
            'equipment_issue' => 'nullable|string|max:1000',
        ]);

        $validated['user_id'] = $request->user()->id;

        $report = DailyReport::create($validated);
        $rigUnit = $report->rigUnit;

        // Efek otomatis 1: kurangi stok solar milik proyek ini
        $fuelItem = InventoryItem::where('project_id', $rigUnit->project_id)
            ->where('category', 'fuel')
            ->first();

        if ($fuelItem) {
        $fuelItem->decrement('quantity', $validated['fuel_liters']);
        $fuelItem->refresh();

            \App\Models\CostEntry::create([
            'project_id' => $rigUnit->project_id,
            'category' => 'fuel',
            'amount' => $validated['fuel_liters'] * 12000,
            'entry_date' => $validated['report_date'],
        ]);


        if ($fuelItem->quantity <= $fuelItem->low_stock_threshold) {
            \App\Models\PurchaseRequest::create([
                'inventory_item_id' => $fuelItem->id,
                'quantity_requested' => $fuelItem->low_stock_threshold * 2,
                'status' => 'pending',
            ]);
        }
    }

        // Efek otomatis 2: buat tiket perbaikan kalau ada laporan kerusakan
        if (!empty($validated['equipment_issue'])) {
            RepairTicket::create([
                'daily_report_id' => $report->id,
                'rig_unit_id' => $rigUnit->id,
                'issue_description' => $validated['equipment_issue'],
                'status' => 'open',
            ]);
        }

        return redirect()->route('daily-reports.index');
    }
}