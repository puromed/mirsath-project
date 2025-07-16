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
       Schema::create('claims', function (Blueprint $table) {
        $table->id();
        $table->foreignId('member_id')->constrained()->onDelete('cascade');
        $table->unsignedBigInteger('deceased_person_id');
        $table->string('deceased_person_type'); // Will store 'Member' or 'Dependent'
        $table->date('date_of_death');
        $table->string('death_certificate_url');
        $table->enum('status', ['Pending Review', 'Approved', 'Rejected'])->default('Pending Review');
        $table->decimal('payout_amount', 8, 2)->nullable(); // e.g., up to 999,999.99
        $table->foreignId('approved_by_staff_id')->nullable()->constrained('staff')->onDelete('set null');
        $table->date('submission_date');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
