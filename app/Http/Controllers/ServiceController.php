<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return Inertia::render('admin/service/index', [
            'services' => $services,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/service/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|array',
            'price'       => 'required|numeric|min:0',
            'duration'    => 'required|integer|min:1',
            'active'      => 'required|boolean',
        ]);

        Service::create($validated);

        return redirect()->route('service.index')->with('success', 'Service created successfully.');
    }

    public function edit($id)
    {
        $service = Service::findOrFail($id);

        return Inertia::render('admin/service/edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'photo'       => 'nullable|array',
            'price'       => 'required|numeric|min:0',
            'duration'    => 'required|integer|min:1',
            'active'      => 'required|boolean',
        ]);

        $service->update($validated);

        return redirect()->route('service.index')->with('success', 'Service updated successfully.');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:services,id',
        ]);

        $service = Service::findOrFail($request->id);
        $service->delete();

        return redirect()->route('service.index')->with('success', 'Service deleted successfully.');
    }
}
