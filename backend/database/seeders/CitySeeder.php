<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        City::create([
            'name' => 'Beograd',
            'zip_code' => '11000',
            'state' => 'Srbija',
        ]);
        City::create([
            'name' => 'Novi Sad',
            'zip_code' => '21000',
            'state' => 'Srbija',
        ]);
        City::create([
            'name' => 'Kotor',
            'zip_code' => '85330',
            'state' => 'Crna Gora',
        ]);
        City::create([
            'name' => 'Monte Karlo',
            'zip_code' => '98000',
            'state' => 'Monako',
        ]);
        City::create([
            'name' => 'Hurgada',
            'zip_code' => '1950003',
            'state' => 'Egipat',
        ]);
        City::create([
            'name' => 'Paris',
            'zip_code' => '70123',
            'state' => 'Francuska',
        ]);
        City::create([
            'name' => 'Male',
            'zip_code' => '20002',
            'state' => 'Maldivi',
        ]);
    }
}
