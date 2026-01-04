<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Jogja',
            'email' => 'admin@smarttour.com',
        ]);
        
        $destinations = [
            [
                'name' => 'Candi Borobudur',
                'slug' => 'candi-borobudur',
                'description' => 'Mahakarya arsitektur Buddha terbesar di dunia, situs warisan dunia UNESCO yang megah dengan relief spiritual yang mendalam.',
                'address' => 'Jl. Badrawati, Magelang (Akses Utama dari Jogja)',
                'latitude' => -7.607, 'longitude' => 110.203,
                'category' => 'Budaya', 'type' => 'outdoor', 'opening_hours' => '07:30 - 16:30', 'ticket_price' => 50000,
                'image_url' => '/assets/images/borobudur.png'
            ],
            [
                'name' => 'Candi Prambanan',
                'slug' => 'candi-prambanan',
                'description' => 'Kompleks candi Hindu termegah di Indonesia, menghadirkan kisah legendaris Roro Jonggrang dalam balutan arsitektur batu yang menjulang tinggi.',
                'address' => 'Jl. Raya Solo - Yogyakarta No.16, Sleman',
                'latitude' => -7.752, 'longitude' => 110.491,
                'category' => 'Budaya', 'type' => 'outdoor', 'opening_hours' => '08:00 - 17:00', 'ticket_price' => 50000,
                'image_url' => '/assets/images/prambanan.png'
            ],
            [
                'name' => 'Keraton Yogyakarta',
                'slug' => 'keraton-yogyakarta',
                'description' => 'Pusat pemerintahan dan budaya Kesultanan Yogyakarta, tempat di mana tradisi Jawa masih dijaga dengan ketat oleh para Abdi Dalem.',
                'address' => 'Jl. Rotowijayan No.1, Panembahan, Kota Yogyakarta',
                'latitude' => -7.805, 'longitude' => 110.364,
                'category' => 'Sejarah', 'type' => 'indoor', 'opening_hours' => '08:00 - 14:00', 'ticket_price' => 15000,
                'image_url' => '/assets/images/keraton.jpg'
            ],
            [
                'name' => 'Taman Sari',
                'slug' => 'taman-sari',
                'description' => 'Situs bersejarah "Istana Air" dengan kolam pemandian biru yang menawan dan lorong bawah tanah yang misterius.',
                'address' => 'Tamanan, Patehan, Kraton, Kota Yogyakarta',
                'latitude' => -7.810, 'longitude' => 110.359,
                'category' => 'Sejarah', 'type' => 'outdoor', 'opening_hours' => '09:00 - 15:00', 'ticket_price' => 5000,
                'image_url' => 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Jalan Malioboro',
                'slug' => 'jalan-malioboro',
                'description' => 'Nadi kehidupan kota Jogja, pusat perbelanjaan dan kuliner malam yang tak pernah tidur dengan atmosfer budaya yang kental.',
                'address' => 'Jl. Malioboro, Kota Yogyakarta',
                'latitude' => -7.792, 'longitude' => 110.365,
                'category' => 'Belanja', 'type' => 'outdoor', 'opening_hours' => '24 Jam', 'ticket_price' => 0,
                'image_url' => '/assets/images/malioboro.png'
            ],
            [
                'name' => 'Merapi Lava Tour',
                'slug' => 'merapi-lova-tour',
                'description' => 'Petualangan ekstrem menggunakan jeep menyusuri jejak kegagahan erupsi Gunung Merapi dengan latar pemandangan gunung yang perkasa.',
                'address' => 'Kaliurang, Sleman',
                'latitude' => -7.595, 'longitude' => 110.446,
                'category' => 'Petualangan', 'type' => 'outdoor', 'opening_hours' => '07:00 - 16:00', 'ticket_price' => 350000,
                'image_url' => '/assets/images/merapi.png'
            ],
            [
                'name' => 'HeHa Ocean View',
                'slug' => 'heha-ocean-view',
                'description' => 'Spot foto modern paling eksotis di tebing pantai selatan dengan pemandangan laut lepas yang biru tanpa batas.',
                'address' => 'Bolang, Girikarto, Panggang, Gunung Kidul',
                'latitude' => -8.118, 'longitude' => 110.490,
                'category' => 'Hiburan', 'type' => 'outdoor', 'opening_hours' => '09:00 - 21:00', 'ticket_price' => 20000,
                'image_url' => 'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'HeHa Sky View',
                'slug' => 'heha-sky-view',
                'description' => 'Restoran dan spot foto ikonik yang menawarkan panorama lampu kota Jogja dari atas bukit Gunungkidul.',
                'address' => 'Patuk, Gunung Kidul',
                'latitude' => -7.848, 'longitude' => 110.479,
                'category' => 'Hiburan', 'type' => 'outdoor', 'opening_hours' => '10:00 - 21:00', 'ticket_price' => 20000,
                'image_url' => 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Obelix Hills',
                'slug' => 'obelix-hills',
                'description' => 'Destinasi wisata tebing batu purba dengan pemandangan matahari terbenam terbaik dan fasilitas santai yang estetik.',
                'address' => 'Klumprit, Wukirharjo, Prambanan, Sleman',
                'latitude' => -7.794, 'longitude' => 110.511,
                'category' => 'Hiburan', 'type' => 'outdoor', 'opening_hours' => '10:00 - 21:00', 'ticket_price' => 15000,
                'image_url' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Tebing Breksi',
                'slug' => 'tebing-breksi',
                'description' => 'Bekas tambang batu alam yang disulap menjadi kanvas pahatan seni raksasa yang artistik dan megah.',
                'address' => 'Sambirejo, Kec. Prambanan, Sleman',
                'latitude' => -7.783, 'longitude' => 110.504,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '06:00 - 21:00', 'ticket_price' => 10000,
                'image_url' => 'https://images.unsplash.com/photo-1579710153093-3ea760920478?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Gua Pindul',
                'slug' => 'gua-pindul',
                'description' => 'Pengalaman cave tubing unik menyusuri sungai bawah tanah di dalam gua yang dipenuhi ornamen batuan alami.',
                'address' => 'Bejiharjo, Karangmojo, Gunung Kidul',
                'latitude' => -7.932, 'longitude' => 110.648,
                'category' => 'Petualangan', 'type' => 'outdoor', 'opening_hours' => '07:00 - 16:00', 'ticket_price' => 45000,
                'image_url' => 'https://images.unsplash.com/photo-1544919934-716912384a8c?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Pantai Parangtritis',
                'slug' => 'pantai-parangtritis',
                'description' => 'Pantai paling populer di Jogja dengan garis pantai yang luas, ombak besar yang gagah, dan mitos mistis Laut Selatan.',
                'address' => 'Bantul, DIY',
                'latitude' => -8.019, 'longitude' => 110.329,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '24 Jam', 'ticket_price' => 10000,
                'image_url' => 'https://images.unsplash.com/photo-1600100397561-433400268571?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Museum Ullen Sentalu',
                'slug' => 'museum-ullen-sentalu',
                'description' => 'Museum seni dan budaya Jawa terbaik yang tersembunyi di hutan sejuk Kaliurang, menawarkan kisah bangsawan Jawa.',
                'address' => 'Jl. Boyong KM 25, Kaliurang, Sleman',
                'latitude' => -7.595, 'longitude' => 110.422,
                'category' => 'Budaya', 'type' => 'indoor', 'opening_hours' => '08:30 - 16:00', 'ticket_price' => 50000,
                'image_url' => 'https://images.unsplash.com/photo-1518998053574-53f0201f87dd?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Hutan Pinus Mangunan',
                'slug' => 'hutan-pinus-mangunan',
                'description' => 'Kawasan hutan pinus yang asri dan romantis, tempat favorit untuk menikmati sejuknya alam dan pemandangan lembah.',
                'address' => 'Dlingo, Bantul',
                'latitude' => -7.931, 'longitude' => 110.428,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '06:00 - 17:30', 'ticket_price' => 5000,
                'image_url' => 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Pantai Indrayanti',
                'slug' => 'pantai-indrayanti',
                'description' => 'Pantai berpasir putih bersih dengan air jernih dan fasilitas restoran tepi laut yang nyaman di Gunungkidul.',
                'address' => 'Tepus, Gunung Kidul',
                'latitude' => -8.150, 'longitude' => 110.612,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '24 Jam', 'ticket_price' => 10000,
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Benteng Vredeburg',
                'slug' => 'benteng-vredeburg',
                'description' => 'Saksi bisu perjuangan bangsa Indonesia, kini menjadi museum diorama sejarah dengan arsitektur benteng Belanda.',
                'address' => 'Jl. Margo Mulyo No.6, Kota Yogyakarta',
                'latitude' => -7.800, 'longitude' => 110.366,
                'category' => 'Sejarah', 'type' => 'indoor', 'opening_hours' => '08:00 - 16:00', 'ticket_price' => 3000,
                'image_url' => 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Goa Jomblang',
                'slug' => 'goa-jomblang',
                'description' => 'Wisata minat khusus berupa goa vertikal dengan fenomena "Cahaya Surga" yang menembus dasar goa yang rimbun.',
                'address' => 'Semanu, Gunung Kidul',
                'latitude' => -7.928, 'longitude' => 110.638,
                'category' => 'Petualangan', 'type' => 'outdoor', 'opening_hours' => '08:00 - 14:00', 'ticket_price' => 450000,
                'image_url' => 'https://images.unsplash.com/photo-1509015124115-32219b16892a?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Waduk Sermo',
                'slug' => 'waduk-sermo',
                'description' => 'Danau buatan yang tenang di Kulon Progo, sering dibilang mirip dengan pemandangan di New Zealand saat berkabut.',
                'address' => 'Kokap, Kulon Progo',
                'latitude' => -7.830, 'longitude' => 110.125,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '07:00 - 17:00', 'ticket_price' => 10000,
                'image_url' => 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'Pinus Pengger',
                'slug' => 'pinus-pengger',
                'description' => 'Hutan pinus dengan instalasi karya seni unik yang menyala indah saat malam dengan latar lampu kota Jogja.',
                'address' => 'Dlingo, Bantul',
                'latitude' => -7.900, 'longitude' => 110.435,
                'category' => 'Alam', 'type' => 'outdoor', 'opening_hours' => '07:30 - 23:00', 'ticket_price' => 5000,
                'image_url' => 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200'
            ],
            [
                'name' => 'The Lost World Castle',
                'slug' => 'the-lost-world-castle',
                'description' => 'Kastel megah di lereng Merapi dengan arsitektur fantasi unik dan berbagai spot foto kelas dunia.',
                'address' => 'Cangkringan, Sleman',
                'latitude' => -7.604, 'longitude' => 110.449,
                'category' => 'Hiburan', 'type' => 'outdoor', 'opening_hours' => '07:00 - 18:00', 'ticket_price' => 30000,
                'image_url' => 'https://images.unsplash.com/photo-1590059223870-dbf6447bc0b9?auto=format&fit=crop&w=1200'
            ]
        ];

        foreach ($destinations as $data) {
            $dest = Destination::create($data);
            $dest->weatherLogs()->create([
                'weather_main' => 'Clear',
                'weather_description' => 'cerah berawan',
                'temp' => 29.0,
                'recorded_at' => now(),
            ]);
        }
    }
}
