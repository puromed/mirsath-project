<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;
use App\Models\StaffAccount;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use updateOrCreate to prevent duplicate entry errors on re-seeding
        $staff = Staff::updateOrCreate(
            ['email' => 'admin@mirsath.my'],
            [
                'name' => 'Admin MIRSATH',
                'role' => 'Admin',
            ]
        );

        // Use updateOrCreate for the staff account as well
        StaffAccount::updateOrCreate(
            ['staff_id' => $staff->id],
            [
                'email' => $staff->email,
                'password' => Hash::make('Admin@123'), // You should change this in production
            ]
        );
    }
}
