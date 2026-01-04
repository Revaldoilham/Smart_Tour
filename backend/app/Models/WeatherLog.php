<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'weather_main',
        'weather_description',
        'temp',
        'recorded_at',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
}
