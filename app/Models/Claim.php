<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Member;
use App\Models\Dependent;
use App\Models\Staff;

class Claim extends Model
{
    protected $fillable = [
        'member_id',
        'deceased_person_id',
        'deceased_person_type',
        'date_of_death',
        'death_certificate_url',
        'submission_date',
        'status',
        'payout_amount',
        'decision_date',
        'decision_notes',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

public function deceased()
{
    return $this->morphTo(__FUNCTION__, 'deceased_person_type', 'deceased_person_id');
}

public function submittedBy()
{
    return $this->belongsTo(Member::class, 'member_id');
}

public function reviewer()
{
    return $this->belongsTo(Staff::class, 'approved_by_staff_id');
}
}
