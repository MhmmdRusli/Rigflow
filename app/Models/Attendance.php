<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'crew_member_id', 'attendance_date', 'shift',
        'check_in', 'check_out', 'overtime_hours',
    ];

    public function crewMember()
    {
        return $this->belongsTo(CrewMember::class);
    }
}