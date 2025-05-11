<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with(['service', 'employee'])->get();

        return Inertia::render('admin/schedule/index', [
            'schedules' => $schedules,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/schedule/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'scheduled_date'     => 'required|date',
            'scheduled_time'     => 'required|date_format:H:i',
            'service_id'         => 'required|exists:services,id',
            'employee_id'        => 'required|exists:employees,id',
            'client_name'        => 'required|string|max:255',
            'client_phone'       => 'nullable|string|max:20',
            'client_observation' => 'nullable|string',
            'status'             => 'required|in:pending,confirmed,finalized,cancelled',
        ]);

        Schedule::create($validated);

        return redirect()->route('schedule.index')->with('success', 'Agendamento criado com sucesso.');
    }

    public function updateStatus(Request $request, $id)
{
    $validated = $request->validate([
        'status' => 'required|in:pending,confirmed,finalized,cancelled',
    ]);

    $schedule = Schedule::findOrFail($id);
    $schedule->status = $validated['status'];
    $schedule->save();

    return redirect()->route('schedule.index')->with('success', 'Status do agendamento atualizado com sucesso.');
}
}
