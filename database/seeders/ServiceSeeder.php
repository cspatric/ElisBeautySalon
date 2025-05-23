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
                'name' => 'Designer de sobrancelhas',
                'description' => 'Designer simples',
                'photo' => json_encode(['url' => '']),
                'price' => 30.00,
                'duration' => 60,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Designer com henna',
                'description' => 'Designer com henna. Efeito maquiagem temporária com pigmento natural.',
                'photo' => json_encode(['url' => '']),
                'price' => 35.99,
                'duration' => 75,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Brow Lamination',
                'description' => 'Alinhamento e fixação dos fios da sobrancelha.',
                'photo' => json_encode(['url' => '']),
                'price' => 0.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pé',
                'description' => 'Serviço de pedicure',
                'photo' => json_encode(['url' => '']),
                'price' => 25.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mão',
                'description' => 'Serviço de manicure',
                'photo' => json_encode(['url' => '']),
                'price' => 25.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pé e mão',
                'description' => 'Serviço combinado de pedicure e manicure',
                'photo' => json_encode(['url' => '']),
                'price' => 45.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cutilagem',
                'description' => 'Remoção de cutículas',
                'photo' => json_encode(['url' => '']),
                'price' => 0.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Selagem',
                'description' => 'Tratamento de selagem capilar',
                'photo' => json_encode(['url' => '']),
                'price' => 180.00,
                'duration' => 150,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Escova comum',
                'description' => 'Escova simples nos cabelos',
                'photo' => json_encode(['url' => '']),
                'price' => 40.00,
                'duration' => 40,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Coloração (cliente)',
                'description' => 'Coloração usando tinta fornecida pelo cliente',
                'photo' => json_encode(['url' => '']),
                'price' => 40.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Coloração (produto próprio)',
                'description' => 'Coloração usando produto do salão',
                'photo' => json_encode(['url' => '']),
                'price' => 85.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Limpeza de pele',
                'description' => 'Limpeza profunda da pele',
                'photo' => json_encode(['url' => '']),
                'price' => 100.00,
                'duration' => 40,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Depilação buço',
                'description' => 'Depilação da região do buço',
                'photo' => json_encode(['url' => '']),
                'price' => 10.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Relaxamento (cliente)',
                'description' => 'Relaxamento usando produto do cliente',
                'photo' => json_encode(['url' => '']),
                'price' => 90.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cronograma capilar + ozônio',
                'description' => '4 sessões com escova e tratamento com ozônio',
                'photo' => json_encode(['url' => '']),
                'price' => 360.00,
                'duration' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Amanda's services
            [
                'name' => 'Alongamento na fibra',
                'description' => 'Alongamento de unhas com fibra de vidro',
                'photo' => json_encode(['url' => '']),
                'price' => 120.00,
                'duration' => 120,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Banho de gel',
                'description' => 'Camada de gel para proteger e fortalecer as unhas',
                'photo' => json_encode(['url' => '']),
                'price' => 65.00,
                'duration' => 90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Blindagem',
                'description' => 'Aplicação de gel fino sobre a unha',
                'photo' => json_encode(['url' => '']),
                'price' => 30.00,
                'duration' => 60,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Esmaltação em gel',
                'description' => 'Esmalte durável com brilho intenso e secagem UV/LED',
                'photo' => json_encode(['url' => '']),
                'price' => 40.00,
                'duration' => 90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alongamento encapsulado',
                'description' => 'Decoração por baixo do gel (glitter, madre pérola)',
                'photo' => json_encode(['url' => '']),
                'price' => 140.00,
                'duration' => 150,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manutenção encapsulada',
                'description' => 'Preenchimento + decoração encapsulada',
                'photo' => json_encode(['url' => '']),
                'price' => 100.00,
                'duration' => 135,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alongamento permanente',
                'description' => 'Decoração por cima do gel (francesinha, glitter)',
                'photo' => json_encode(['url' => '']),
                'price' => 130.00,
                'duration' => 140,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manutenção permanente',
                'description' => 'Preenchimento + decoração permanente',
                'photo' => json_encode(['url' => '']),
                'price' => 90.00,
                'duration' => 140,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alongamento natural',
                'description' => 'Alongamento sem decoração, apenas gel',
                'photo' => json_encode(['url' => '']),
                'price' => 120.00,
                'duration' => 135,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manutenção natural',
                'description' => 'Preenchimento com gel natural',
                'photo' => json_encode(['url' => '']),
                'price' => 80.00,
                'duration' => 120,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Volume Brasileiro',
                'description' => 'Extensão de cílios estilo brasileiro. Volume leve e natural.',
                'photo' => json_encode(['url' => '']),
                'price' => 90.00,
                'duration' => 180,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manutenção Volume Brasileiro',
                'description' => 'Manutenção do volume brasileiro.',
                'photo' => json_encode(['url' => '']),
                'price' => 70.00,
                'duration' => 90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luxo 3D, 4D, 5D',
                'description' => 'Cílios com efeito mais volumoso e sofisticado.',
                'photo' => json_encode(['url' => '']),
                'price' => 100.00,
                'duration' => 180,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manutenção Luxo 3D, 4D, 5D',
                'description' => 'Manutenção dos cílios luxo.',
                'photo' => json_encode(['url' => '']),
                'price' => 85.00,
                'duration' => 90,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fox',
                'description' => 'Estilo fox eyes — cílios alongados nos cantos para efeito levantado.',
                'photo' => json_encode(['url' => '']),
                'price' => 100.00,
                'duration' => 180,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mega Brasileiro',
                'description' => 'Volume extremo e destacado no estilo brasileiro.',
                'photo' => json_encode(['url' => '']),
                'price' => 100.00,
                'duration' => 180,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],            
        ]);
    }
}
