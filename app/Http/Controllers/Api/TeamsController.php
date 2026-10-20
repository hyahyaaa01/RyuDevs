<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teams;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;   

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

        // Tangani upload file foto terlebih dahulu sebelum data disimpan
        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('teams', 'public');
        }

        // Simpan data ke database beserta path foto yang sudah di-generate
        $team = Teams::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Team created successfully',
            'data' => $team,
        ], 201);
    }
}