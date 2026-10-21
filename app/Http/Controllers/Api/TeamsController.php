<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teams;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class TeamsController extends Controller
{
    public function index(): JsonResponse
    {
        $teams = Teams::all();
        return response()->json([
            'success' => true,
            'message' => 'Teams retrieved successfully',
            'data' => $teams,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'required|string',
            'email' => 'required|email|unique:teams,email',
            'linkedin_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'telegram' => 'nullable|string',
            'portfolio_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('teams', 'public');
        }

        $team = Teams::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Team created successfully',
            'data' => $team,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $team = Teams::find($id);
        if (!$team) {
            return response()->json([
                'success' => false,
                'message' => 'Team not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Team retrieved successfully',
            'data' => $team,
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $team = Teams::find($id);
        if (!$team) {
            return response()->json([
                'success' => false,
                'message' => 'Team not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'bio' => 'required|string',
            'email' => 'required|email|unique:teams,email,' . $id,
            'linkedin_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'instagram_url' => 'nullable|url',
            'telegram' => 'nullable|string',
            'portfolio_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except(['photo', '_method']);

        if ($request->hasFile('photo')) {
            if ($team->photo && Storage::disk('public')->exists($team->photo)) {
                Storage::disk('public')->delete($team->photo);
            }
            $data['photo'] = $request->file('photo')->store('teams', 'public');
        }

        $team->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Team updated successfully',
            'data' => $team,
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $team = Teams::find($id);
        if (!$team) {
            return response()->json([
                'success' => false,
                'message' => 'Team not found'
            ], 404);
        }

        if ($team->photo && Storage::disk('public')->exists($team->photo)) {
            Storage::disk('public')->delete($team->photo);
        }

        $team->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team deleted successfully'
        ], 200);
    }
}