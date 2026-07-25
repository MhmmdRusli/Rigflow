<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id', 'name', 'category',
        'quantity', 'low_stock_threshold', 'unit',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function purchaseRequests()
    {
        return $this->hasMany(PurchaseRequest::class);
    }

    // Cek apakah stok sudah di bawah ambang batas
    public function getIsLowStockAttribute()
    {
        return $this->quantity <= $this->low_stock_threshold;
    }
}