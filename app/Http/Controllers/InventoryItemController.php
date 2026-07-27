<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryItemController extends Controller
{
    public function index()
{
    $items = InventoryItem::with('project')->latest()->get();

    return Inertia::render('Inventory/Index', [
        'items' => $items,
        'totalItems' => $items->count(),
        'lowStockCount' => $items->filter(fn ($i) => $i->quantity <= $i->low_stock_threshold)->count(),
        'categoriesCount' => $items->pluck('category')->unique()->count(),
    ]);
}

    public function create()
    {
        return Inertia::render('Inventory/Create', [
            'projects' => Project::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'low_stock_threshold' => 'required|numeric|min:0',
            'unit' => 'required|string|max:50',
        ]);

        InventoryItem::create($validated);

        return redirect()->route('inventory.index');
    }

    public function destroy(InventoryItem $inventoryItem)
    {
        $inventoryItem->delete();
        return redirect()->route('inventory.index');
    }
}