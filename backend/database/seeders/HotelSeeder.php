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
        // $urls = ['https://service.odeontravel.rs/media/images/product/1/1/0/2/2/49367/aqua_mondo_abu_soma_resort_49367.jpg',
        // 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/492019350.jpg?k=2d185330f31a733a3524d08d38f61714d6ce73a126e9f462fb900afcaabf5655&o=&hp=1',
        // 'https://content.r9cdn.net/rimg/himg/5b/cc/8b/ice-100053252-0746998_3XL-452362.jpg'];
        // for ($i = 0; $i < 3; $i++) {
        //     Hotel::factory()->create([
        //         'city_id' => rand(1, 7),
        //         'photo_url' => $urls[$i]
        //     ]);
        // }

        // Beograd
        Hotel::create([
            'name' => 'Hotel Moskva',
            'address' => 'Balkanska 1',
            'email' => 'info@hotelmoskva.rs',
            'restrictions' => serialize(['no pets']),
            'facilities' => serialize(['parking', 'Wi-Fi', 'gym', 'spa']),
            'description' => 'Robert de Niro, Albert Ajnstajn, Indira Gandi, Lucano Pavaroti, Maksim Gorki i Alfred Hickok samo su neka od svetski poznatih imena  koja su ostavila svoj trajni trag u hotelu Moskva. Po njima je nazvano sest apartmana u hotelu.',
            'photo_url' => 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/436369773.jpg?k=d6ca1e038cdb9f8b65aa4f09f83cfbe412ec0b9308d7503dfc2009b2ba57cf18&o=&hp=1',
            'city_id' => 1
        ]);

        Hotel::create([
            'name' => 'Nobel Gallery Hotel',
            'address' => 'Visegradska 23',
            'email' => 'info.gallery@nhg.rs',
            'restrictions' => serialize(['none']),
            'facilities' => serialize(['parking', 'Wi-Fi', 'gym', 'restaurant']),
            'description' => 'Ekskluzivnu oaza mirnog luksuza smestena u samom srcu Beograda.',
            'photo_url' => 'https://nobelgallery.rs/wp-content/uploads/2023/11/batch_AIP_0941-scaled.jpg',
            'city_id' => 1
        ]);

        // Novi Sad
        Hotel::create([
            'name' => 'Hotel Pupin',
            'address' => 'Narodnih heroja 3',
            'email' => 'hotel@pupin.rs',
            'restrictions' => serialize(['adults only']),
            'facilities' => serialize(['restaurant', 'breakfast', 'parking', 'Wi-Fi', 'gym', 'spa']),
            'description' => 'Dobro dosli u Novi Sad! Uzivajte u njegovim zivopisnim prizorima i pruzite sebi ugodjaj kakav zasluzujete u samom centru grada.',
            'photo_url' => 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/399554626.jpg?k=b093af4991a8c37d7d568d1d3062a899cf0e0a1c40fa4029ec0551087c1c062b&o=&hp=1',
            'city_id' => 2
        ]);

        // // Pariz
        Hotel::create([
            'name' => 'Hôtel Alpha Paris Eiffel by Patrick Hayat',
            'address' => 'Rue Emile Landrin 26',
            'email' => 'hotel@alpha-paris-hotel.com',
            'restrictions' => serialize(['no smoking']),
            'facilities' => serialize(['Wi-Fi', 'gym', 'breakfast', 'pets']),
            'description' => 'Staying at Hotel Alpha, you can easily reach the main Parisian high spots as well as the Parc des Princes and Roland Garros stadiums and the Porte de Versailles Exhibition Centre.',
            'photo_url' => 'https://hapi.mmcreation.com/media/143/Photos/Photos2024/Hotel_Alpha_Paris_Eiffel_chambre_Superieure_6.jpg?w=1216&mode=ratio&coi=50%2C50&hash=21afd90364161b0',
            'city_id' => 6
        ]);

        Hotel::create([
            'name' => 'Hotel Chevallier',
            'address' => 'Rue Louis Rouquier 67',
            'email' => 'hotel@chevallier.com',
            'restrictions' => serialize(['no smoking', 'adults only']),
            'facilities' => serialize(['Wi-Fi', 'TV', 'parking']),
            'description' => 'Located in Levallois Perret, Hotel Chevallier features a garden and good public transport connection.',
            'photo_url' => 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/134976406.jpg?k=d320990623e425137b05e0408e82a4f2c4a19108c59e37064cbf961f35fd1dd0&o=&hp=1',
            'city_id' => 6
        ]);

        Hotel::create([
            'name' => 'Hotel Campanile Paris-Bercy Village',
            'address' => 'Rue Baron Le Roy 17',
            'email' => 'campanile@paris.fr',
            'restrictions' => serialize(['no smoking']),
            'facilities' => serialize(['Wi-Fi', 'pets', 'gym', 'air condition', 'TV', 'parking']),
            'description' => 'The hotel is situated on Rue Baron Le Roy, close to Gare de Lyon and the National Library of France. The Bercy area is predominantly residential and notable for its stunning green spaces.',
            'photo_url' => 'https://y.cdrst.com/cdrimg/hotel-sf/302662009/800x600/max-side/c87c7f.jpg',
            'city_id' => 6
        ]);


        // // Hurgada
        Hotel::create([
            'name' => 'Serenity Alma Heights',
            'address' => 'Hurghada Safaga road 36',
            'email' => 'hotelAlma@gmail.com',
            'restrictions' => serialize(['none']),
            'facilities' => serialize(['entertainment', 'restaurant', 'play area', 'pool', 'Wi-Fi', 'pets', 'gym', 'air condition', 'TV', 'parking']),
            'description' => 'Serenity Fun City offers Aqua Park with variety of water slides and Pools for all age ranges, Luna Park with various games, Designed Kids Club, XD cinema, Video games etc.',
            'photo_url' => 'https://y.cdrst.com/cdrimg/hotel-sf/311653276/800x600/max-side/8cefc9.jpg',
            'city_id' => 5
        ]);

        Hotel::create([
            'name' => 'Royal Lagoons Resort & Aqua Park Families and Couples Only',
            'address' => 'Al Mamsha El Siyahi Street 7',
            'email' => 'hotel@royal.com',
            'restrictions' => serialize(['no smoking', 'families only', 'couples only']),
            'facilities' => serialize(['play area', 'pool', 'gym', 'spa', 'entertainment', 'restaurant', 'Wi-Fi', 'pets', 'gym', 'air condition', 'TV', 'parking']),
            'description' => 'Royal Lagoons Resort is 3 minutes by Shuttle Bus from/to the beach. Ideally located on central Hurghadas promenade and 3 minutes by car from Hurghada International Airport.',
            'photo_url' => 'https://z.cdrst.com/cdrimg/hotel-sf/284737598/800x600/max-side/93e7fd.jpg',
            'city_id' => 5
        ]);

        // // Kotor
        Hotel::create([
            'name' => 'Bayview Hills Luxury Residences',
            'address' => 'Adriatic Heights 66',
            'email' => 'hotel@luxuryhills.com',
            'restrictions' => serialize(['no pets']),
            'facilities' => serialize(['air condition', 'TV', 'parking', 'Wi-Fi', 'sauna', 'pool']),
            'description' => 'Your holiday will be filled with Bayview Hills Luxury Residences with its breathtaking Adriatic view, pools, sauna, gardens and terraces that host pleasant moments.',
            'photo_url' => 'https://y.cdrst.com/cdrimg/hotel-sf/290782159/800x600/max-side/31b863.jpg',
            'city_id' => 3
        ]);

        Hotel::create([
            'name' => 'Casa Montenegro Residence',
            'address' => 'Tivat Heights Access Road  98',
            'email' => 'casaresidence@gmail.com',
            'restrictions' => serialize(['no smoking']),
            'facilities' => serialize(['Wi-Fi', 'pets allowed', 'air condition', 'TV', 'parking', 'pool']),
            'description' => 'Casa Montenegro Hotel is a sustainable apartment where guests can make the most of its pool with a view, free bikes, and garden.',
            'photo_url' => 'https://x.cdrst.com/cdrimg/hotel-sf/302525589/800x600/max-side/bc1198.jpg',
            'city_id' => 3
        ]);

        // // Monte Carlo
        Hotel::create([
            'name' => 'Monte-Carlo Bay Hotel & Resort',
            'address' => '40 Av. Princesse Grace',
            'email' => 'groupes@sbm.mc',
            'restrictions' => serialize(['no pets']),
            'facilities' => serialize(['gym', 'Wi-Fi', 'spa', 'bar', 'family friendly', 'air condition', 'TV', 'parking', 'pool']),
            'description' => 'Chic and casual, contemporary and timeless: the Monte-Carlo Bay Hotel & Resort is a daring fusion of styles and atmospheres.',
            'photo_url' => 'https://asset.montecarlosbm.com/styles/hotel_intro_left_image_2x_webp/s3/media/orphea/mcbay_vues_exterieures_011_1.jpg.webp?h=5df42fa2&itok=Haz9YnRQ',
            'city_id' => 4
        ]);

        Hotel::create([
            'name' => 'Hotel Metropole',
            'address' => '4 Av. de la Madone',
            'email' => 'metropole@hotel.com',
            'restrictions' => serialize(['adults only']),
            'facilities' => serialize(['parking', 'pool', 'gym', 'Wi-Fi', 'spa', 'air condition', 'TV']),
            'description' => 'Ideally situated in the Carré d\'Or, within walking distance of the Casino, Hotel Metropole Monte-Carlo overlooks the Mediterranean Sea.',
            'photo_url' => 'https://metropole.com/wp-content/uploads/resized/2020/10/suite-carre-dor-1920x0-c-default.jpg',
            'city_id' => 4
        ]);

        // // Male
        Hotel::create([
            'name' => 'Kurumba Maldives',
            'address' => 'Vihamanaafushi 42',
            'email' => 'kurumba@gmail.com',
            'restrictions' => serialize(['no pets']),
            'facilities' => serialize(['bar', 'restaurant', 'room service', 'parking', 'spa', 'gym', 'Wi-Fi', 'air condition', 'TV']),
            'description' => 'Ideally located in the prime touristic area of North Male Atoll, Kurumba Maldives promises a relaxing and wonderful visit. ',
            'photo_url' => 'https://img.tripi.vn/cdn-cgi/image/width=640/https://pix8.agoda.net/hotelImages/121/12153/12153_16070413510044381237.png?ca=6&ce=1',
            'city_id' => 7
        ]);
    }
}
