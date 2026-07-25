<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepairTicketController extends Controller
{
    public function index()
    {
        $tickets = RepairTicket::with('rigUnit')->latest()->get();

        return Inertia::render('RepairTickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function update(Request $request, RepairTicket $repairTicket)
    {
        $request->validate([
            'status' => 'required|in:open,in_progress,resolved',
        ]);

        $repairTicket->update(['status' => $request->status]);

        return redirect()->route('repair-tickets.index');
    }
}