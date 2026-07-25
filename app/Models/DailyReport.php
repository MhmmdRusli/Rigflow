<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'rig_unit_id', 'user_id', 'report_date',
        'hourmeter_start', 'hourmeter_end', 'fuel_liters',
        'depth_meters', 'equipment_issue',
    ];

    public function rigUnit()
    {
        return $this->belongsTo(RigUnit::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function repairTicket()
    {
        return $this->hasOne(RepairTicket::class);
    }

    // Efisiensi solar per meter kedalaman
    public function getFuelEfficiencyAttribute()
    {
        return $this->depth_meters > 0
            ? round($this->fuel_liters / $this->depth_meters, 2)
            : null;
    }
}