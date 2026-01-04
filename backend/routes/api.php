<?php

use App\Http\Controllers\Api\DestinationController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\TrafficController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Destinations
Route::get('/destinations', [DestinationController::class, 'index']);
Route::get('/destinations/{id}', [DestinationController::class, 'show']);
Route::post('/destinations', [DestinationController::class, 'store']);
Route::put('/destinations/{id}', [DestinationController::class, 'update']);
Route::delete('/destinations/{id}', [DestinationController::class, 'destroy']);

// Recommendations
Route::get('/recommendations', [DestinationController::class, 'recommendations']); 
Route::get('/recommendations/smart', [RecommendationController::class, 'index']);   

// Weather
Route::get('/weather/current', [WeatherController::class, 'current']);

// Traffic
Route::get('/traffic', [TrafficController::class, 'index']);
Route::get('/traffic/overview', [TrafficController::class, 'overview']);

// Admin & Reviews
Route::get('/admin/stats', [\App\Http\Controllers\Api\DashboardController::class, 'stats']);
Route::get('/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'index']);
Route::delete('/reviews/{id}', [\App\Http\Controllers\Api\ReviewController::class, 'destroy']);
Route::post('/destinations/{id}/reviews', [\App\Http\Controllers\Api\ReviewController::class, 'store']);
