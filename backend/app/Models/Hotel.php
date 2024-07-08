<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'email',
        'restrictions',
        'facilities',
        'description',
        'photo_url'
    ];

    function city()
    {
        return $this->belongsTo(City::class);
    }

    function reservation()
    {
        return $this->hasMany(Reservation::class);
    }
}
