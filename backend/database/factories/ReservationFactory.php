<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'date' => $this->faker->dateTimeBetween('now', '+2 years'),
            'pansion' => $this->faker->randomElement(['room only', 'breakfast', 'half board', 'all inclusive']),
            'numberOfAdults' => rand(1, 4),
            'numberOfChildren' => rand(0, 4),
            'numberOfNights' => rand(0, 15),
            'user_id' => User::factory(),
            'hotel_id' => Hotel::factory(),
        ];
    }
}
