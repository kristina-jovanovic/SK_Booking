<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'phone_number' => '011200200',
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Milica Petrovic',
            'email' => 'milica@gmail.com',
            'password' => Hash::make('milica123'),
            'phone_number' => '0611514581',
            'role' => 'owner',
        ]);
        User::create([
            'name' => 'Dragan Joksimovic',
            'email' => 'dragan@gmail.com',
            'password' => Hash::make('dragan123'),
            'phone_number' => '0615828541',
            'role' => 'owner',
        ]);

        $users = User::factory(5)->create();
    }
}
