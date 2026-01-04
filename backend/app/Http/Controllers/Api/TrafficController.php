<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrafficStat;
use Illuminate\Http\Request;

class TrafficController extends Controller
{
    /**
     * Get traffic stats for a specific destination or all.
     */
    public function index(Request $request)
    {
        $query = TrafficStat::with('destination');

        if ($request->has('destination_id')) {
            $query->where('destination_id', $request->destination_id);
        }

        $stats = $query->latest()->limit(20)->get();

        return response()->json([
            'status' => 'success',
            'data' => $stats
        ]);
    }

    /**
     * Get current aggregated traffic overview for the city.
     */
    public function overview()
    {
        // For demo, we might aggregate all latest stats
        $latestStats = TrafficStat::orderBy('recorded_at', 'desc')
            ->get()
            ->unique('destination_id');

        return response()->json([
            'status' => 'success',
            'data' => [
                'average_congestion' => 'Moderate',
                'affected_routes' => $latestStats->whereIn('congestion_level', ['heavy', 'stalled'])->count(),
                'details' => $latestStats
            ]
        ]);
    }
}
