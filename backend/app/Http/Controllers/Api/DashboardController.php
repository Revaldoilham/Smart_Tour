<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\Review;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        // Get visitors last 7 days for chart
        $visitorsChart = Visitor::select(DB::raw('visit_date, COUNT(*) as count'))
            ->where('visit_date', '>=', now()->subDays(7)->toDateString())
            ->groupBy('visit_date')
            ->orderBy('visit_date', 'asc')
            ->get();

        // Top pages
        $topPages = Visitor::select(DB::raw('path, COUNT(*) as count'))
            ->groupBy('path')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_destinations' => Destination::count(),
                'total_reviews' => Review::count(),
                'total_users' => User::count(),
                'total_visitors' => Visitor::count(),
                'unique_visitors_today' => Visitor::where('visit_date', now()->toDateString())->distinct('ip_address')->count('ip_address'),
                'recent_reviews' => Review::with(['user', 'destination'])->latest()->limit(5)->get(),
                'top_destinations' => Destination::withCount('reviews')->orderBy('reviews_count', 'desc')->limit(5)->get(),
                'visitors_chart' => $visitorsChart,
                'top_pages' => $topPages
            ]
        ]);
    }
}
