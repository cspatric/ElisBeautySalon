<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return redirect()->route('schedule.create');
})->name('home');

    // Schedule Client
    Route::get('/schedule/create', [ScheduleController::class, 'create'])->name('schedule.create');
    Route::post('/schedule/store', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::get('/schedule/proof/{id}', [ScheduleController::class, 'storeProof'])->name('schedule.proof');

Route::middleware(['auth', 'verified'])->group(function () {

    //Home
    Route::get('/home', [HomeController::class, 'index'])->name('home.index');

    // Schedule Employee
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::put('/schedule/update-status/{id}', [ScheduleController::class, 'updateStatus'])->name('schedule.updateStatus');

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
    Route::get('/service/edit/{id}', [ServiceController::class, 'edit'])->name('service.edit');
    Route::post('/service/store', [ServiceController::class, 'store'])->name('service.store');
    Route::put('/service/update/{id}', [ServiceController::class, 'update'])->name('service.update');
    Route::post('/service/delete', [ServiceController::class, 'delete'])->name('service.delete');


    // Employee
    Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
    Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.create');
    Route::get('/employee/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
    Route::post('/employee/store', [EmployeeController::class, 'store'])->name('employee.store');
    Route::put('/employee/update/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::post('/employee/delete', [EmployeeController::class, 'delete'])->name('employee.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
