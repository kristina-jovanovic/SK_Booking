<?php

namespace Database\Factories;

use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;

class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'address' => $this->faker->address(),
            'email' => $this->faker->unique()->safeEmail(),
            'restrictions' => serialize($this->faker->randomElement(['none', 'adults only', 'no pets', 'couples only', 'families only'])),
            'facilities' => serialize($this->faker->randomElements(['pool', 'free parking', 'air conditioning', 'spa', 'free wifi', 'lift', 'no smoking'], 3, true)),
            'description' => $this->faker->sentences(3, true),
            'city_id' => City::factory()
        ];
    }
}
