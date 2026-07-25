<?php

namespace App\Http\Controllers;

use App\Models\CostEntry;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CostEntryController extends Controller
{
    public function index()
    {
        $project = Project::first(); // sementara ambil 1 proyek dulu, nanti bisa dipilih

        $entries = CostEntry::where('project_id', $project->id)->latest()->get();

        $breakdown = $entries->groupBy('category')->map(fn ($group) => $group->sum('amount'));
        $totalSpent = $entries->sum('amount');

        return Inertia::render('CostEntries/Index', [
            'project' => $project,
            'entries' => $entries,
            'breakdown' => $breakdown,
            'totalSpent' => $totalSpent,
        ]);
    }

    public function create()
    {
        return Inertia::render('CostEntries/Create', [
            'projects' => Project::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'category' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'entry_date' => 'required|date',
        ]);

        CostEntry::create($validated);

        return redirect()->route('cost-entries.index');
    }
}