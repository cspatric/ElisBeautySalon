<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
       
    }

    public function delete(Request $request)
    {
        
    }
}
