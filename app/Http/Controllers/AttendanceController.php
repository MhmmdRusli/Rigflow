<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\CrewMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function create()
    {
        return Inertia::render('Attendances/Create', [
            'crewMembers' => CrewMember::select('id', 'name', 'position')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'crew_member_id' => 'required|exists:crew_members,id',
            'attendance_date' => 'required|date',
            'shift' => 'required|in:siang,malam',
            'check_in' => 'nullable',
            'check_out' => 'nullable',
            'overtime_hours' => 'required|numeric|min:0',
        ]);

        Attendance::create($validated);

        return redirect()->route('crew-members.index');
    }
}