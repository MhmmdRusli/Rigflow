<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'budget', 'contract_value', 'status'];

    public function rigUnits()
    {
        return $this->hasMany(RigUnit::class);
    }

    public function inventoryItems()
    {
        return $this->hasMany(InventoryItem::class);
    }

    public function crewMembers()
    {
        return $this->hasMany(CrewMember::class);
    }

    public function costEntries()
    {
        return $this->hasMany(CostEntry::class);
    }
}