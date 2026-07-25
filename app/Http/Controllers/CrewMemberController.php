<?php

namespace App\Http\Controllers;

use App\Models\CrewMember;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CrewMemberController extends Controller
{
    public function index()
    {
        $crewMembers = CrewMember::withCount('attendances')
            ->with(['attendances' => fn ($q) => $q->select('crew_member_id')])
            ->get()
            ->map(function ($crew) {
                $crew->total_overtime = $crew->attendances()->sum('overtime_hours');
                return $crew;
            });

        return Inertia::render('CrewMembers/Index', [
            'crewMembers' => $crewMembers,
        ]);
    }

    public function create()
    {
        return Inertia::render('CrewMembers/Create', [
            'projects' => Project::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);

        CrewMember::create($validated);

        return redirect()->route('crew-members.index');
    }
}