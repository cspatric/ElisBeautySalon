<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Criar usuário genérico para os funcionários
        $user = User::firstOrCreate(
            ['email' => 'funcionarios@elisbeauty.com'],
            [
                'name' => 'Funcionários do Sistema',
                'password' => Hash::make('123456'),
            ]
        );

        $userId = $user->id;

        DB::table('employees')->insert([
            [
                'user_id' => $userId,
                'name' => 'Naihara',
                'email' => 'naiharataiz@icloud.com',
                'password' => Hash::make('123456'),
                'phone' => '(99) 6000-0335',
                'photo' => null,
                'workschedule' => null,
                'services' => json_encode([1, 2, 3]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Thaylla',
                'email' => 'comercialthaylla@gmail.com',
                'password' => Hash::make('123456'),
                'phone' => '(62) 99872-1258',
                'photo' => null,
                'workschedule' => json_encode([
                    'terça' => ['09:00', '16:00'],
                    'quarta' => ['09:00', '16:00'],
                    'quinta' => ['09:00', '16:00'],
                    'sexta' => ['09:00', '16:00'],
                    'sábado' => ['09:00', '18:00'],
                ]),
                'services' => json_encode([4, 5, 6, 7]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Elisangela',
                'email' => 'elisangela@example.com', // 👈 email obrigatório
                'password' => Hash::make('123456'),
                'phone' => null,
                'photo' => null,
                'workschedule' => null,
                'services' => json_encode([8, 9, 10, 11, 12, 13, 14, 15]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Amanda Alves Martins Bitencourt',
                'email' => 'amandafilipegustavo@gmail.com',
                'password' => Hash::make('123456'),
                'phone' => '(31) 97146-4432',
                'photo' => null,
                'workschedule' => null,
                'services' => json_encode([16, 17, 18, 19, 20, 21, 22, 23, 24, 25]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Thay Martins',
                'email' => 'thaynasouza037@gmail.com',
                'password' => Hash::make('123456'),
                'phone' => '31985099684',
                'photo' => null,
                'workschedule' => null,
                'services' => json_encode([17, 18]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Darcy',
                'email' => 'dadabento72@gmail.com',
                'password' => Hash::make('123456'),
                'phone' => '31987148308',
                'photo' => null,
                'workschedule' => json_encode([
                    'terça' => ['08:00', '18:00'],
                    'quarta' => ['08:00', '18:00'],
                    'quinta' => ['08:00', '18:00'],
                    'sexta' => ['08:00', '18:00'],
                    'sábado' => ['08:00', '19:00'],
                ]),
                'services' => json_encode([]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userId,
                'name' => 'Maria Eduarda',
                'email' => 'duda.silva.304070@gmail.com',
                'password' => Hash::make('123456'),
                'phone' => '31972071321',
                'photo' => null,
                'workschedule' => json_encode([
                    'segunda' => ['07:00', '12:00'],
                    'terça' => ['07:00', '12:00'],
                    'quarta' => ['07:00', '12:00'],
                    'quinta' => ['07:00', '12:00'],
                    'sexta' => ['07:00', '12:00'],
                    'sábado' => ['07:00', '17:00'],
                ]),
                'services' => json_encode([26, 27, 28, 29, 30, 31]),
                'active' => true,
                'pagepermissions' => json_encode(['dashboard', 'agenda']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
