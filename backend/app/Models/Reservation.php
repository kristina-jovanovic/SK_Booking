<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'pansion',
        'numberOfAdults',
        'numberOfChildren',
        'numberOfNights',
        'user_id',
        'hotel_id'
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }
    function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
