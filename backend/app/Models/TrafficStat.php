<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrafficStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'congestion_level',
        'travel_duration_from_city',
        'recorded_at',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
