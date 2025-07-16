<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Member;

class Dependent extends Model
{
    protected $fillable = [
        'member_id',
        'name',
        'ic_number',
        'relationship',
        'date_of_birth',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
