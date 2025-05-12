<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;
use App\Models\Service;
use App\Models\Employee;
use Illuminate\Support\Carbon;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        // Recupera serviços e funcionários existentes
        $service1 = Service::inRandomOrder()->first();
        $employee1 = Employee::inRandomOrder()->first();

        if (!$service1 || !$employee1) {
            $this->command->warn('É necessário ter pelo menos um service e um employee para rodar o ScheduleSeeder.');
            return;
        }

        Schedule::create([
            'scheduled_date'     => Carbon::tomorrow()->toDateString(),
            'scheduled_time'     => '10:00',
            'service_id'         => $service1->id,
            'employee_id'        => $employee1->id,
            'client_name'        => 'Carlos Andrade',
            'client_phone'       => '(11) 91234-5678',
            'client_observation' => 'Cliente prefere atendimento rápido.',
            'status'             => 'confirmed',
        ]);

        Schedule::create([
            'scheduled_date'     => Carbon::tomorrow()->addDays(2)->toDateString(),
            'scheduled_time'     => '14:30',
            'service_id'         => $service1->id,
            'employee_id'        => $employee1->id,
            'client_name'        => 'Fernanda Lima',
            'client_phone'       => '(21) 99876-5432',
            'client_observation' => null,
            'status'             => 'pending',
        ]);
    }
}
