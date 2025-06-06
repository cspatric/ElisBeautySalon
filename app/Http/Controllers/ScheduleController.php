<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Service;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $schedules = Schedule::with(['service', 'employee'])->get();
        $employees = Employee::all();
        $services = Service::all();
        $schedule = Schedule::all();

        return Inertia::render('admin/schedule/index', [
            'user' => $user,
            'employees' => $employees,
            'services' => $services,
            'schedule' => $schedule,
        ]);
    }

    public function create()
    {
        $employees = Employee::where('active', true)->get();
    $services = Service::where('active', true)->get();
    $schedule = Schedule::all(); 

        return Inertia::render('admin/schedule/User/create', [
            'employees' => $employees,
            'services' => $services,
            'schedule' => $schedule,
        ]);
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

        $schedule = Schedule::create($validated);

        return redirect()->route('schedule.proof', ['id' => $schedule->id]);
    }

    public function storeProof($id)
{
    $schedule = Schedule::with(['service', 'employee'])->findOrFail($id);
    $employees = Employee::all();
    $services = Service::all();

    return Inertia::render('admin/schedule/User/proof', [
        'employees' => $employees,
        'services' => $services,
        'schedule' => $schedule,
    ]);
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
