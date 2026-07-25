<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairTicket extends Model
{
    use HasFactory;

    protected $fillable = ['daily_report_id', 'rig_unit_id', 'issue_description', 'status'];

    public function dailyReport()
    {
        return $this->belongsTo(DailyReport::class);
    }

    public function rigUnit()
    {
        return $this->belongsTo(RigUnit::class);
    }
}