<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name', 50);
            $table->string('ic_number', 12)->unique();
            
            // Address fields
            $table->string('house_no', 3);
            $table->string('street_address', 100);
            $table->string('postcode', 5); // Malaysian postcodes are 5 digits
            $table->string('city', 50)->default('Setia Alam');
            $table->string('state', 50)->default('Selangor');
            
            $table->string('phone_number', 11);
            $table->date('date_of_birth');
            $table->date('membership_start_date');
            $table->enum('status', ['Pending', 'Active', 'Inactive', 'Deceased'])->default('Pending');
            
            // Next of Kin fields
            $table->string('next_of_kin_name', 50);
            $table->string('next_of_kin_phone', 11);
            $table->string('next_of_kin_relationship', 30);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
