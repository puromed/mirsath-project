<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use App\Models\Transaction;
use App\Models\Claim;
use App\Models\Dependent;
// import user model
use App\Models\User;

class Member extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'ic_number',
        'house_no',
        'street_address',
        'postcode',
        'city',
        'state',
        'phone_number',
        'date_of_birth',
        'membership_start_date',
        'status',
        'next_of_kin_name',
        'next_of_kin_phone',
        'next_of_kin_relationship',
    ];

   /**
     * Get the user that owns the member profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the dependents for the member.
     */
    public function dependents(): HasMany
    {
        return $this->hasMany(Dependent::class);
    }

    /**
     * Get the transactions for the member.
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    // claims relationship
    public function claims()
    {
        return $this->hasMany(Claim::class);
    }

    
}
