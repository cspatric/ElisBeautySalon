<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/product/index');
    }

    public function create()
    {
        return Inertia::render('admin/product/create');
    }

    public function store(Request $request)
    {
       
    }

    public function delete(Request $request)
    {
        
    }
}
