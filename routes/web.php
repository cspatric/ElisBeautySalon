<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ScheduleController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    // Home
    Route::get('/home', [PageController::class, 'index'])->name('home.index');

    // Schedule
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');

    // Product
    Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
    Route::get('/product/edit/{id}', [ProductController::class, 'edit'])->name('product.edit');
    Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
    Route::put('/product/update/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::post('/product/delete', [ProductController::class, 'delete'])->name('product.delete');

    // Service
    Route::get('/service', [ServiceController::class, 'index'])->name('service.index');
    Route::get('/service/create', [ServiceController::class, 'create'])->name('service.create');
    Route::post('/service/store', [ServiceController::class, 'store'])->name('service.store');
    Route::get('/service/edit/{id}', [ServiceController::class, 'edit'])->name('service.edit');
    Route::put('/service/update/{id}', [ServiceController::class, 'update'])->name('service.update');
    Route::post('/service/delete', [ServiceController::class, 'delete'])->name('service.delete');


    // Employee
    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
    Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.create');
    Route::get('/employee/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
    Route::post('/employee/store', [EmployeeController::class, 'store'])->name('employee.store');
    Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('/employee/delete', [EmployeeController::class, 'delete'])->name('employee.delete');

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
