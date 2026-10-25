<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PortfoliosController;
use App\Http\Controllers\Api\TeamsController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;

Route::get('/portfolios', [PortfoliosController::class, 'index']);
Route::post('/portfolios', [PortfoliosController::class, 'store']);
Route::get('/portfolios/{id}', [PortfoliosController::class, 'show']);
Route::post('/portfolios/{id}', [PortfoliosController::class, 'update']);
Route::put('/portfolios/{id}', [PortfoliosController::class, 'update']); // <-- Tambahan untuk Portfolios PUT
Route::delete('/portfolios/{id}', [PortfoliosController::class, 'destroy']);

Route::get('/teams', [TeamsController::class, 'index']);
Route::post('/teams', [TeamsController::class, 'store']);
Route::get('/teams/{id}', [TeamsController::class, 'show']);
Route::post('/teams/{id}', [TeamsController::class, 'update']);
Route::put('/teams/{id}', [TeamsController::class, 'update']); // <-- Tambahan untuk Teams PUT
Route::delete('/teams/{id}', [TeamsController::class, 'destroy']);

Route::get('/review', [ReviewController::class, 'index']);
Route::post('/review', [ReviewController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contacts', [ContactController::class, 'index']);
    
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
});