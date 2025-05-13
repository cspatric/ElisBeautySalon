<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    { 
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->longText('photo')->nullable();
            $table->json('services')->nullable();
            $table->json('workschedule')->nullable();
            $table->boolean('active')->default(true);
            $table->json('pagepermissions')->nullable();
        
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        
            $table->timestamps();
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
