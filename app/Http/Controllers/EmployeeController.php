<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/employee/index');
    }

    public function create()
    {
        return Inertia::render('admin/employee/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|unique:users,email',
            'password'        => 'required|string|min:6|confirmed',
            'phone'           => 'nullable|string|max:20',
            'photo'           => 'nullable|string',
            'services'        => 'nullable|array',
            'workschedule'    => 'nullable|array',
            'active'          => 'required|boolean',
            'pagepermissions' => 'nullable|array',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Employee::create([
            'user_id'         => $user->id,
            'name'            => $validated['name'],
            'email'           => $validated['email'],
            'phone'           => $validated['phone'] ?? null,
            'photo'           => $validated['photo'] ?? null,
            'services'        => $validated['services'] ?? [],
            'workschedule'    => $validated['workschedule'] ?? [],
            'active'          => $validated['active'],
            'pagepermissions' => $validated['pagepermissions'] ?? [],
        ]);

        return redirect()->route('employee.index')->with('success', 'Employee created successfully.');
    }

    public function edit($id)
    {
        $employee = Employee::with('user')->findOrFail($id);

        return Inertia::render('admin/employee/edit', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrFail($id);
        $user = $employee->user;

        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => "required|email|unique:users,email,{$user->id}",
            'password'        => 'nullable|string|min:6|confirmed',
            'phone'           => 'nullable|string|max:20',
            'photo'           => 'nullable|string',
            'services'        => 'nullable|array',
            'workschedule'    => 'nullable|array',
            'active'          => 'required|boolean',
            'pagepermissions' => 'nullable|array',
        ]);

        $user->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
            'password' => isset($validated['password']) && $validated['password']
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        $employee->update([
            'name'            => $validated['name'],
            'email'           => $validated['email'],
            'phone'           => $validated['phone'] ?? null,
            'photo'           => $validated['photo'] ?? null,
            'services'        => $validated['services'] ?? [],
            'workschedule'    => $validated['workschedule'] ?? [],
            'active'          => $validated['active'],
            'pagepermissions' => $validated['pagepermissions'] ?? [],
        ]);

        return redirect()->route('employee.index')->with('success', 'Employee updated successfully.');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:employees,id',
        ]);

        $employee = Employee::findOrFail($request->id);
        $user = $employee->user;

        $employee->delete();
        $user?->delete();

        return redirect()->route('employee.index')->with('success', 'Employee deleted successfully.');
    }
}
