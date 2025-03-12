<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

// Authentication Routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // User Routes
    Route::controller(UserController::class)->group(function () {
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
        Route::put('/me/update', 'updateMe');
        Route::post('/me/update-password', 'updatePassword');
    });

    // Contacts Routes
    Route::controller(ContactController::class)->group(function () {
        Route::get('/contacts', 'index');
        Route::post('/contacts', 'store');
        Route::get('/contacts/{id}', 'show');
    });

    // Message Routes
    Route::get('/history', 'App\Http\Controllers\MessageController@userHistory');

});
