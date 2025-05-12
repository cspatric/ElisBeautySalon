<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Service;
use App\Models\Schedule;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $products = Product::all();
        $services = Service::all();
        $schedule = Schedule::all();

        return Inertia::render('admin/home/index', [
            'user' => $user,
            'products' => $products,
            'services' => $services,
            'schedule' => $schedule,
        ]);
    }
}
