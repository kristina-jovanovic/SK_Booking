<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 3; $i++) {
            Reservation::factory()->create([
                'user_id' => rand(4, 8),
                'hotel_id' => rand(1, 3)
            ]);
        }
    }
}
