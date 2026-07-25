<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cost_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('category');
            $table->decimal('amount', 15, 2);
            $table->date('entry_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cost_entries');
    }
};