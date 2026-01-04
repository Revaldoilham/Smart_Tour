<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    /**
     * Get smart recommendations based on dynamic context.
     */
    public function index(Request $request)
    {
        // 1. Get Context (Weather, Time, etc.)
        // In a real app, we would fetch current weather from our cache or directly from WeatherController logic
        $weatherCondition = $request->query('condition'); 
        
        if (!$weatherCondition) {
            // Internal call to get current (mock/real) weather if not provided
            $weatherCtrl = new WeatherController();
            $weatherResponse = $weatherCtrl->current(new Request());
            $weatherData = json_decode($weatherResponse->getContent(), true);
            $weatherCondition = $weatherData['data']['current']['weather'][0]['main'];
        }

        $query = Destination::query();

        // 2. Apply Scoring Logic (Design doc: Recommendation Logic)
        // Weather 40%, Distance/Time 30%, Opening Hours 20%, Traffic 10%
        
        $isRaining = in_array(strtolower($weatherCondition), ['rain', 'drizzle', 'thunderstorm']);

        if ($isRaining) {
            // High priority for indoor, low for outdoor
            $query->orderByRaw("CASE WHEN type = 'indoor' THEN 1 ELSE 2 END");
        } else {
            // High priority for outdoor
            $query->orderByRaw("CASE WHEN type = 'outdoor' THEN 1 ELSE 2 END");
        }

        // Add some variety based on category
        if ($request->has('preferred_category')) {
            $query->orderByRaw("CASE WHEN category = ? THEN 1 ELSE 2 END", [$request->preferred_category]);
        }

        $recommendations = $query->inRandomOrder()->limit(5)->get()->map(function($dest) {
            $dest->live_traffic = $dest->getDynamicTrafficStatus();
            $dest->live_weather = $dest->getDynamicWeatherStatus();
            return $dest;
        });

        return response()->json([
            'status' => 'success',
            'context' => [
                'weather' => $weatherCondition,
                'is_raining' => $isRaining,
                'timestamp' => now()
            ],
            'data' => $recommendations
        ]);
    }
}
