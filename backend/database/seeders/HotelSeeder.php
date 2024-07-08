<?php

namespace Database\Seeders;

use App\Models\Hotel;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $urls = ['https://service.odeontravel.rs/media/images/product/1/1/0/2/2/49367/aqua_mondo_abu_soma_resort_49367.jpg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/492019350.jpg?k=2d185330f31a733a3524d08d38f61714d6ce73a126e9f462fb900afcaabf5655&o=&hp=1',
        'https://content.r9cdn.net/rimg/himg/5b/cc/8b/ice-100053252-0746998_3XL-452362.jpg'];
        for ($i = 0; $i < 3; $i++) {
            Hotel::factory()->create([
                'city_id' => rand(1, 7),
                'photo_url' => $urls[$i]
            ]);
        }
    }
}
