<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Destination;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::with(['user', 'destination'])->latest()->get();
        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ]);
    }

    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, $destinationId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:500',
            'user_name' => 'nullable|string|max:50',
        ]);

        $destination = Destination::find($destinationId);
        if (!$destination) {
            return response()->json(['status' => 'error', 'message' => 'Destination not found'], 404);
        }

        $userName = $request->input('user_name') ?: 'Wisatawan';
        
        $user = User::where('name', $userName)->first();
        if (!$user) {
            $user = User::create([
                'name' => $userName,
                'email' => strtolower(str_replace(' ', '.', $userName)) . '@guest.com',
                'password' => bcrypt('guest123'),
            ]);
        }

        $review = Review::create([
            'user_id' => $user->id,
            'destination_id' => $destinationId,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $review->load('user')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['status' => 'error', 'message' => 'Not found'], 404);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted successfully'
        ]);
    }
}
