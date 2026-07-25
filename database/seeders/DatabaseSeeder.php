<?php

namespace Database\Seeders;

use App\Models\CrewMember;
use App\Models\InventoryItem;
use App\Models\Project;
use App\Models\RigUnit;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat user untuk tiap role
        $manager = User::create([
            'name' => 'Budi Manajer',
            'email' => 'manager@rigflow.com',
            'password' => bcrypt('password'),
            'role' => 'project_manager',
        ]);

        $mandor = User::create([
            'name' => 'Andi Mandor',
            'email' => 'mandor@rigflow.com',
            'password' => bcrypt('password'),
            'role' => 'site_supervisor',
        ]);

        User::create([
            'name' => 'Sari Logistik',
            'email' => 'logistik@rigflow.com',
            'password' => bcrypt('password'),
            'role' => 'warehouse',
        ]);

        User::create([
            'name' => 'PT Klien Tambang',
            'email' => 'client@rigflow.com',
            'password' => bcrypt('password'),
            'role' => 'client',
        ]);

        // 2. Buat 1 proyek contoh
        $project = Project::create([
            'name' => 'Eksplorasi Blok Kalimantan Timur',
            'budget' => 850000000,
            'contract_value' => 1200000000,
            'status' => 'active',
        ]);

        // 3. Buat 2 unit rig di proyek itu
        $rig1 = RigUnit::create([
            'project_id' => $project->id,
            'code' => 'RIG-01',
            'status' => 'active',
        ]);

        RigUnit::create([
            'project_id' => $project->id,
            'code' => 'RIG-02',
            'status' => 'idle',
        ]);

        // 4. Buat beberapa item inventaris
        InventoryItem::create([
            'project_id' => $project->id,
            'name' => 'Mata Bor PDC 8.5"',
            'category' => 'drill_bit',
            'quantity' => 2,
            'low_stock_threshold' => 5,
            'unit' => 'pcs',
        ]);

        InventoryItem::create([
            'project_id' => $project->id,
            'name' => 'Solar Industri',
            'category' => 'fuel',
            'quantity' => 5000,
            'low_stock_threshold' => 1000,
            'unit' => 'liter',
        ]);

        // 5. Buat kru
        CrewMember::create([
            'project_id' => $project->id,
            'name' => 'Joko Kru',
            'position' => 'Driller',
        ]);

        CrewMember::create([
            'project_id' => $project->id,
            'name' => 'Rudi Kru',
            'position' => 'Helper',
        ]);

        $this->command->info('Seeding selesai! Login: manager@rigflow.com / password');
    }
}