<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Claim;

class ClaimReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('staff')->user()?->can('review', Claim::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'decision_notes' => ['nullable', 'string', 'max:1000'],
            /* amount required only on approve route */
            'payout_amount' => [ 'required_if:_route_,admin.claims.approve', 'numeric', 'min:0'],
        ];
    }
}
