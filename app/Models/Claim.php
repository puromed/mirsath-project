<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Member;

class Claim extends Model
{
    protected $fillable = [
        'member_id',
        'deceased_person_id',
        'deceased_person_type',
        'date_of_death',
        'status',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }


}
