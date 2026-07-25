<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequest extends Model
{
    use HasFactory;

    protected $fillable = ['inventory_item_id', 'quantity_requested', 'status'];

    public function inventoryItem()
    {
        return $this->belongsTo(InventoryItem::class);
    }
}