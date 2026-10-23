<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolios;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PortfoliosController extends Controller
{
    public function index(): JsonResponse
    {
        $portfolios = Portfolios::all();
        return response()->json([
            'success' => true,
            'message' => 'Portfolios retrieved successfully',
            'data' => $portfolios,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:portfolios,slug',
            'description' => 'required|string',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'project_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'category' => 'required|string|max:255',
            'is_featured' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except('thumbnail');

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('portfolios', 'public');
        }

        $portfolio = Portfolios::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio created successfully',
            'data' => $portfolio,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $portfolio = Portfolios::find($id);
        if (!$portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Portfolio retrieved successfully',
            'data' => $portfolio,
        ], 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $portfolio = Portfolios::find($id);
        if (!$portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:portfolios,slug,' . $id,
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'project_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'category' => 'required|string|max:255',
            'is_featured' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except(['thumbnail', '_method']);

        if ($request->hasFile('thumbnail')) {
            if ($portfolio->thumbnail && Storage::disk('public')->exists($portfolio->thumbnail)) {
                Storage::disk('public')->delete($portfolio->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('portfolios', 'public');
        }

        $portfolio->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio updated successfully',
            'data' => $portfolio,
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        $portfolio = Portfolios::find($id);
        if (!$portfolio) {
            return response()->json([
                'success' => false,
                'message' => 'Portfolio not found'
            ], 404);
        }

        if ($portfolio->thumbnail && Storage::disk('public')->exists($portfolio->thumbnail)) {
            Storage::disk('public')->delete($portfolio->thumbnail);
        }

        $portfolio->delete();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio deleted successfully'
        ], 200);
    }
}