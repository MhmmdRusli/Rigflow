<?php

namespace App\Http\Controllers;

use App\Models\CostEntry;
use App\Models\DailyReport;
use App\Models\InventoryItem;
use App\Models\Project;
use App\Models\RepairTicket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $project = Project::first();

        $totalSpent = CostEntry::where('project_id', $project->id)->sum('amount');
        $lowStockItems = InventoryItem::where('project_id', $project->id)
            ->whereColumn('quantity', '<=', 'low_stock_threshold')
            ->get(['id', 'name', 'quantity', 'unit']);

        $openTickets = RepairTicket::where('status', 'open')->count();

        $recentReports = DailyReport::with('rigUnit')
            ->latest()
            ->take(5)
            ->get();

        $avgEfficiency = DailyReport::where('depth_meters', '>', 0)
            ->get()
            ->avg(fn ($r) => $r->fuel_liters / $r->depth_meters);

        return Inertia::render('Dashboard', [
            'project' => $project,
            'totalSpent' => $totalSpent,
            'budgetUsedPercent' => $project->budget > 0
                ? round(($totalSpent / $project->budget) * 100, 1)
                : 0,
            'lowStockItems' => $lowStockItems,
            'openTicketsCount' => $openTickets,
            'recentReports' => $recentReports,
            'avgEfficiency' => round($avgEfficiency ?? 0, 2),
        ]);
    }
}