<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Hotel;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Reservation::truncate();
        // Hotel::truncate();
        // City::truncate();
        // User::truncate();

        $this->call(UserSeeder::class);
        $this->call(CitySeeder::class);
        $this->call(HotelSeeder::class);
        $this->call(ReservationSeeder::class);
    }
}
