<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'photo',
        'services',
        'workschedule',
        'active',
        'pagepermissions',
    ];

    protected $casts = [
        'services'        => 'array',
        'workschedule'    => 'array',
        'pagepermissions' => 'array',
        'active'          => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
