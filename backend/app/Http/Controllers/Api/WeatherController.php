<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class WeatherController extends Controller
{
    /**
     * Get current weather for Yogyakarta.
     * Uses OpenWeatherMap API with caching.
     */
    public function current(Request $request)
    {
        $lat = $request->query('lat', -7.7956); // Default Jogja
        $lon = $request->query('lon', 110.3695);
        $units = $request->query('units', 'metric');
        
        $cacheKey = "weather_{$lat}_{$lon}_{$units}";
        
        $weatherData = Cache::remember($cacheKey, 1800, function () use ($lat, $lon, $units) {
            $apiKey = env('OPENWEATHER_API_KEY');
            
            if (!$apiKey) {
                return $this->getMockWeatherData($lat, $lon);
            }
            
            try {
                // Using One Call API 3.0 as per design
                $response = Http::get("https://api.openweathermap.org/data/3.0/onecall", [
                    'lat' => $lat,
                    'lon' => $lon,
                    'appid' => $apiKey,
                    'units' => $units,
                    'lang' => 'id',
                    'exclude' => 'minutely'
                ]);
                
                if ($response->successful()) {
                    return $response->json();
                }
                
                return $this->getMockWeatherData($lat, $lon);
            } catch (\Exception $e) {
                return $this->getMockWeatherData($lat, $lon);
            }
        });

        return response()->json([
            'status' => 'success',
            'data' => $weatherData
        ]);
    }

    /**
     * Fallback mock data when API key is missing or call fails.
     */
    private function getMockWeatherData($lat, $lon)
    {
        $hour = (int) now()->format('H');
        $temp = 28;
        
        // Dynamic Temp Curve
        if ($hour >= 11 && $hour <= 15) $temp = 32 + rand(0, 3);
        elseif ($hour >= 19 || $hour <= 5) $temp = 24 + rand(0, 2);
        else $temp = 28 + rand(0, 2);

        $isRaining = ($hour >= 14 && $hour <= 17 && rand(0, 100) > 60);

        return [
            'lat' => (float)$lat,
            'lon' => (float)$lon,
            'timezone' => 'Asia/Jakarta',
            'current' => [
                'dt' => time(),
                'temp' => $temp,
                'feels_like' => $temp + 2,
                'humidity' => $isRaining ? 85 : 70,
                'wind_speed' => 8.5,
                'uvi' => ($hour > 7 && $hour < 16) ? 8.5 : 0,
                'weather' => [
                    [
                        'id' => $isRaining ? 500 : 800,
                        'main' => $isRaining ? 'Rain' : 'Clear',
                        'description' => $isRaining ? 'hujan ringan' : 'cerah berawan',
                        'icon' => $isRaining ? '10d' : '02d'
                    ]
                ]
            ],
            'hourly' => array_map(function($i) use ($hour) {
                $h = ($hour + $i) % 24;
                $isHRaining = ($h >= 14 && $h <= 17);
                return [
                    'dt' => time() + ($i * 3600),
                    'temp' => ($h >= 11 && $h <= 15) ? 33 : (($h >= 19 || $h <= 5) ? 24 : 28),
                    'weather' => [[
                        'id' => $isHRaining ? 500 : 800, 
                        'main' => $isHRaining ? 'Rain' : 'Clear', 
                        'description' => $isHRaining ? 'hujan' : 'cerah'
                    ]],
                    'pop' => $isHRaining ? 0.7 : 0.1
                ];
            }, range(1, 12))
        ];
    }
}
