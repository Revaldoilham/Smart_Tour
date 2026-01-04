<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Destination::query();

        // Search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('category', 'like', '%' . $request->search . '%');
        }

        // Filter Type (Indoor/Outdoor)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter Category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()->map(function($dest) {
                $dest->live_traffic = $dest->getDynamicTrafficStatus();
                $dest->live_weather = $dest->getDynamicWeatherStatus();
                return $dest;
            })
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $destination = Destination::with(['reviews'])->find($id);

        if (!$destination) {
            return response()->json(['status' => 'error', 'message' => 'Not found'], 404);
        }

        $destination->live_traffic = $destination->getDynamicTrafficStatus();
        $destination->live_weather = $destination->getDynamicWeatherStatus();
        $destination->extra_info = $destination->getDynamicExtraInfo();

        return response()->json([
            'status' => 'success',
            'data' => $destination
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'category' => 'required|string',
            'type' => 'required|in:indoor,outdoor',
            'opening_hours' => 'nullable|string',
            'ticket_price' => 'integer',
            'image_url' => 'nullable|string',
        ]);

        $validated['slug'] = \Illuminate\Support\Str::slug($request->name) . '-' . time();
        
        $destination = Destination::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Destination created successfully',
            'data' => $destination
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['status' => 'error', 'message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'address' => 'string',
            'latitude' => 'numeric',
            'longitude' => 'numeric',
            'category' => 'string',
            'type' => 'in:indoor,outdoor',
            'opening_hours' => 'nullable|string',
            'ticket_price' => 'integer',
            'image_url' => 'nullable|string',
        ]);

        if ($request->has('name')) {
            $validated['slug'] = \Illuminate\Support\Str::slug($request->name) . '-' . time();
        }

        $destination->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Destination updated successfully',
            'data' => $destination
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['status' => 'error', 'message' => 'Not found'], 404);
        }

        $destination->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Destination deleted successfully'
        ]);
    }

    /**
     * Smart Recommendations
     */
    public function recommendations(Request $request)
    {
        // Simple logic for now: Random 3 or filtered by weather if provided
        $weatherMain = $request->input('weather'); // e.g. Rain

        $query = Destination::query();

        if ($weatherMain === 'Rain') {
            $query->where('type', 'indoor');
        } elseif ($weatherMain === 'Clear') {
            $query->where('type', 'outdoor');
        }

        $recommendations = $query->inRandomOrder()->limit(3)->get();

        return response()->json([
            'status' => 'success',
            'data' => $recommendations
        ]);
    }
}
