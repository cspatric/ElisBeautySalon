<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Camisa Polo Masculina',
                'description' => 'Camisa polo de algodão, ideal para o dia a dia.',
                'photo' => json_encode(['url' => 'https://exemplo.com/fotos/camisa.jpg']),
                'price' => 89.90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tênis Esportivo',
                'description' => 'Confortável e resistente, ideal para corridas e caminhadas.',
                'photo' => json_encode(['url' => 'https://exemplo.com/fotos/tenis.jpg']),
                'price' => 199.90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fone Bluetooth',
                'description' => 'Fone de ouvido sem fio com ótima duração de bateria.',
                'photo' => json_encode(['url' => 'https://exemplo.com/fotos/fone.jpg']),
                'price' => 129.90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
