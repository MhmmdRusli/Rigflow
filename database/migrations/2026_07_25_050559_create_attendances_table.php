<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crew_member_id')->constrained()->cascadeOnDelete();
            $table->date('attendance_date');
            $table->enum('shift', ['siang', 'malam']);
            $table->time('check_in')->nullable();
            $table->time('check_out')->nullable();
            $table->decimal('overtime_hours', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};