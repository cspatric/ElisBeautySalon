<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            [
                'name' => 'João Silva',
                'email' => 'joao.silva@example.com',
                'password' => '123456',
                'phone' => '(11) 98765-4321',
                'photo' => 'https://exemplo.com/fotos/joao.jpg',
                'services' => [1, 2],
                'workschedule' => [
                    'segunda' => ['08:00', '12:00'],
                    'terca' => ['13:00', '17:00'],
                ],
                'active' => true,
                'pagepermissions' => ['dashboard', 'agenda'],
            ],
            [
                'name' => 'Maria Oliveira',
                'email' => 'maria.oliveira@example.com',
                'password' => '123456',
                'phone' => '(21) 99876-5432',
                'photo' => null,
                'services' => [2, 3],
                'workschedule' => [
                    'quarta' => ['09:00', '15:00'],
                    'sexta' => ['10:00', '16:00'],
                ],
                'active' => true,
                'pagepermissions' => ['agenda'],
            ],
        ];

        foreach ($employees as $emp) {
            $user = User::create([
                'name' => $emp['name'],
                'email' => $emp['email'],
                'password' => Hash::make($emp['password']),
            ]);

            Employee::create([
                'user_id'         => $user->id,
                'name'            => $emp['name'],
                'email'           => $emp['email'],
                'phone'           => $emp['phone'],
                'photo'           => $emp['photo'],
                'services'        => $emp['services'],
                'workschedule'    => $emp['workschedule'],
                'active'          => $emp['active'],
                'pagepermissions' => $emp['pagepermissions'],
            ]);
        }
    }
}
