<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'latitude',
        'longitude',
        'category',
        'type',
        'opening_hours',
        'ticket_price',
        'image_url',
    ];

    public function weatherLogs()
    {
        return $this->hasMany(WeatherLog::class);
    }

    public function trafficStats()
    {
        return $this->hasMany(TrafficStat::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Generate dynamic traffic status based on time, day, and destination popularity.
     */
    public function getDynamicTrafficStatus()
    {
        $hour = (int) now()->format('H');
        $day = now()->format('l'); // Monday, etc.
        $isWeekend = in_array($day, ['Saturday', 'Sunday', 'Friday']);
        
        // Base popularity (0-10)
        $popularity = 5;
        if (str_contains(strtolower($this->name), 'malioboro')) $popularity = 9;
        if (str_contains(strtolower($this->name), 'candi')) $popularity = 8;
        if (str_contains(strtolower($this->name), 'merapi')) $popularity = 7;
        
        $score = $popularity;
        
        // Time factor
        if ($hour >= 17 && $hour <= 21) {
            $score += 4; // Evening rush
        } elseif ($hour >= 7 && $hour <= 9) {
            $score += 3; // Morning rush
        } elseif ($hour >= 23 || $hour <= 5) {
            $score -= 4; // Late night
        }
        
        // Weekend factor
        if ($isWeekend) $score += 2;
        
        if ($score >= 12) return ['level' => 'stalled', 'label' => 'Macet Total', 'color' => 'red'];
        if ($score >= 9) return ['level' => 'heavy', 'label' => 'Padat Merayap', 'color' => 'orange'];
        if ($score >= 6) return ['level' => 'moderate', 'label' => 'Ramai Lancar', 'color' => 'blue'];
        return ['level' => 'clear', 'label' => 'Lancar Jaya', 'color' => 'green'];
    }

    /**
     * Generate dynamic weather based on time and destination type.
     */
    public function getDynamicWeatherStatus()
    {
        $hour = (int) now()->format('H');
        $temp = 28;
        
        // Temp curve
        if ($hour >= 11 && $hour <= 15) $temp = 32 + rand(0, 2);
        elseif ($hour >= 18 || $hour <= 6) $temp = 24 + rand(0, 2);
        else $temp = 28 + rand(0, 2);
        
        // Possible rain in Jogja usually afternoon
        $isRaining = ($hour >= 15 && $hour <= 17 && rand(0, 10) > 6);
        
        return [
            'temp' => $temp,
            'main' => $isRaining ? 'Rain' : 'Clear',
            'description' => $isRaining ? 'Hujan Ringan' : 'Cerah Berawan',
            'icon' => $isRaining ? '10d' : '02d',
            'is_raining' => $isRaining
        ];
    }

    /**
     * Generate extra details like facilities and cultural tips.
     */
    public function getDynamicExtraInfo()
    {
        $facilities = ['Parkir Luas', 'Mushola', 'Toilet Bersih', 'Area Foto'];
        if (str_contains(strtolower($this->category), 'kuliner')) {
            $facilities[] = 'WiFi Gratis';
            $facilities[] = 'Area Merokok';
        }
        if (str_contains(strtolower($this->category), 'budaya')) {
            $facilities[] = 'Pemandu Wisata';
            $facilities[] = 'Penyewaan Jarik';
        }

        $tips = [
            'budaya' => 'Nyuwun sewu, kagem para tamu dipun aturi ngginakaken busana ingkang sopan.',
            'alam' => 'Jagi kebersihan, ampun mbucal sampah sembarangan wonten ing lingkungan pariwisata.',
            'kuliner' => 'Sampun supe nyobi menu mirunggan ingkang dados ciri khas mriki.',
            'default' => 'Mugi-mugi dinten panjenengan nyenengaken dinten menika.'
        ];

        $categoryKey = strtolower($this->category);
        $selectedTip = $tips[$categoryKey] ?? $tips['default'];

        return [
            'facilities' => $facilities,
            'cultural_tip' => $selectedTip,
            'best_time' => ($this->type === 'outdoor') ? 'Enjing utawi Sonten' : 'Kapan kembar'
        ];
    }
}
