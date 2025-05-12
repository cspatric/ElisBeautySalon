<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('services')->insert([
            [
                'name' => 'Consulta Inicial',
                'description' => 'Avaliação completa e plano de tratamento personalizado.',
                'photo' => json_encode(['url' => 'https://exemplo.com/foto1.jpg']),
                'price' => 150.00,
                'duration' => 60,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Limpeza Dental',
                'description' => 'Procedimento de limpeza e remoção de tártaro.',
                'photo' => json_encode(['url' => 'https://exemplo.com/foto2.jpg']),
                'price' => 100.00,
                'duration' => 45,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Aplicação de Flúor',
                'description' => 'Aplicação tópica de flúor para prevenção de cáries.',
                'photo' => null,
                'price' => 50.00,
                'duration' => 30,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
