<?php

namespace App\Http\Controllers;

use Spatie\SimpleExcel\SimpleExcelWriter;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Models\Dependent;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;



use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DependentController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the user's dependents.
     */
    public function index()
    {
        $dependents = Auth::user()
            ->member
            ->dependents()
            ->latest()
            ->get([
                'id',
                'name',
                'ic_number',
                'relationship',
                'date_of_birth',
                'created_at',
            ]);

        return Inertia::render('User/DependentsList', [
            'dependents' => $dependents,
        ]);
    }

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

    // Export dependents to CSV
    public function exportDependents(): BinaryFileResponse
    {
        // Create a temporary file on disk
        $tempPath = tempnam(sys_get_temp_dir(), 'dependents_') . '.csv';

        $writer = SimpleExcelWriter::create($tempPath)
            ->addHeader(['ID', 'Name', 'IC Number', 'Relationship', 'Date of Birth', 'Created']);

        Dependent::select('id', 'name', 'ic_number', 'relationship', 'date_of_birth', 'created_at')
            ->orderBy('created_at')
            ->chunk(1000, function ($chunk) use ($writer) {
                $writer->addRows($chunk->toArray());
            });

        // Close the writer to flush data
        unset($writer);

        return response()->download($tempPath, 'dependents.csv', [
            'Content-Type' => 'text/csv',
        ])->deleteFileAfterSend(true);
    }
}
