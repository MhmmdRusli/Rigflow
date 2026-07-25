<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RigUnit extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'code', 'status'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function dailyReports()
    {
        return $this->hasMany(DailyReport::class);
    }

    public function repairTickets()
    {
        return $this->hasMany(RepairTicket::class);
    }
}