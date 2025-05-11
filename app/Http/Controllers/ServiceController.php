<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/service/index');
    }

    public function create()
    {
        return Inertia::render('admin/service/create');
    }

    public function store(Request $request)
    {
   
    }

    public function delete(Request $request)
    {
        
    }
}
