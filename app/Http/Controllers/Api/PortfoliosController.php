<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolios;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PortfoliosController extends Controller
{
    public function index(): JsonResponse
    {
        $portfolios = Portfolios::latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $portfolios,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'project_url' => 'required|url',
            'github_url'  => 'required|url',
            'category'    => 'required|string',
            'is_featured' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('portfolios', 'public');
        }

        $portfolio = Portfolios::create([
            'title'       => $request->title,
            'slug'        => Str::slug($request->title),
            'description' => $request->description,
            'thumbnail'   => $thumbnailPath,
            'project_url' => $request->project_url,
            'github_url'  => $request->github_url,
            'category'    => $request->category,
            'is_featured' => $request->boolean('is_featured', false),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio berhasil ditambahkan!',
            'data'    => $portfolio
        ], 201);
    }
}