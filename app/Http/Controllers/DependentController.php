<?php

namespace App\Http\Controllers;

use App\Models\Dependent;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DependentController extends Controller
{
    use AuthorizesRequests;

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:50',
            'ic_number' => 'required|string|max:12|unique:dependents,ic_number',
            'relationship' => 'required|string|max:100',
            'date_of_birth' => 'required|date|before:today',
        ]);

        // Get the currently authenticated user's member profile and create the dependent
        $request->user()->member->dependents()->create($data);

        return back()->with('success', 'Dependent added successfully');
    }

    /**
     * Update the specified dependent in storage.
     */
    public function update(Request $request, Dependent $dependent)
    {
        // Ensure the user is authorized to update this dependent
        $this->authorize('update', $dependent);

        $data = $request->validate([
            'name' => 'required|string|max:50',
            'ic_number' => [
                'required',
                'string',
                'size:12',
                Rule::unique('dependents', 'ic_number')->ignore($dependent->id),
            ],
            'relationship' => 'required|string|max:100',
            'date_of_birth' => 'required|date|before:today',
        ]);

        $dependent->update($data);

        return back()->with('success', 'Dependent updated successfully');
    }

    /**
     * Remove the specified dependent from storage.
     */
    public function destroy(Dependent $dependent)
    {
        // Ensure the user is authorized to delete this dependent
        $this->authorize('delete', $dependent);

        $dependent->delete();

        return back()->with('success', 'Dependent deleted successfully');
    }
}
