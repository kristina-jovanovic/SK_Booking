<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $perPage = 5, $page = 1)
    {
        $role = Auth::user()->role;
        if ($role === 'user' || $role === 'owner') {
            return response()->json(['Unauthorized: only admins can make see statistics.'], 401);
        }
        $result = User::leftJoin('reservations', 'reservations.user_id', '=', 'users.id')
            ->select('users.id', 'users.name', 'users.email', 'users.phone_number', DB::raw('COUNT(reservations.id) as reservation_count'))
            ->where('users.role', '=', 'user')
            ->groupBy('users.id', 'users.name', 'users.email', 'users.phone_number')
            ->orderBy('reservation_count', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        // $result = User::withCount('reservation')->get();
        // $result = DB::select(DB::raw('
        //     SELECT u.id, u.name, u.email, u.phone_number, u.role, COUNT(r.id) as reservation_count
        //     FROM users u
        //     LEFT JOIN reservations r ON r.user_id = u.id
        //     GROUP BY u.id, u.name, u.email, u.phone_number, u.role
        //     '))
        $data = $result->items();
        // $data = $result;

        $stranice = $result->lastPage();
        return response()->json(['data' => $data, 'pages' => $stranice], 200);
        // return response()->json(['data' => $data], 200);
        // $users = User::all();
        // return new UserCollection($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
