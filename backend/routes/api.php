<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Resources\CityCollection;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/users', [UserController::class, 'index']);
// Route::post('/users', [UserController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/pagination/{perPage?}/{page?}', [HotelController::class, 'indexPag']);
Route::get('/hotels/search/{perPage?}/{page?}/{filter?}', [HotelController::class, 'indexSearch']);


//ovo je samo za ulogovane korisnike
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', function (Request $request) {
        return new UserResource(auth()->user());
    });
    Route::resource('/hotels', HotelController::class)->only('update', 'destroy', 'store');
    Route::post('/city', [CityController::class, 'store']);
    Route::resource('users.reservations', ReservationController::class)->only('index');
    Route::resource('/reservations', ReservationController::class)->only('show', 'update', 'store', 'destroy');
    Route::get('/stats/{perPage?}/{page?}', [UserController::class, 'index']);
});
