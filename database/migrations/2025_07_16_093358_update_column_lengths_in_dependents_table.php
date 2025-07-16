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
        Schema::table('dependents', function (Blueprint $table) {
            // Change column types and lengths
            $table->string('name', 50)->change();
            $table->string('ic_number', 12)->change();
            $table->string('relationship', 100)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dependents', function (Blueprint $table) {
            // Revert to the old lengths if you need to roll back
            $table->string('name', 255)->change();
            $table->string('ic_number', 255)->change();
            $table->string('relationship', 255)->change();
        });
    }
};