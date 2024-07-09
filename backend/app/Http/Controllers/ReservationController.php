<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationCollection;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
        $role = Auth::user()->role;
        if ($role === 'admin' || $role === 'owner') {
            return response()->json(['Unauthorized: only users can make new reservations.'], 401);
        }
        if ($user_id != Auth::user()->id) {
            return response()->json(['Unauthorized: this reservation does not belong to you.'], 401);
        }

        $res = Reservation::get()->where('user_id', $user_id);
        if (is_null($res))
            return response()->json('Data not found', 404);

        // return new ReservationCollection(response()->json($res)); //ovo ne radi
        return new ReservationCollection($res);

        // return response()->json($res);

        // $res = Reservation::all();
        // return new ReservationCollection($res);
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
        $role = Auth::user()->role;
        if ($role === 'admin' || $role === 'owner') {
            return response()->json(['Unauthorized: only users can make new reservations.'], 401);
        }

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'pansion' => 'required|in:room only,breakfast,half board,all inclusive',
            'numberOfAdults' => 'required',
            'numberOfChildren' => 'required',
            'hotel_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $res = Reservation::create([
            'date' => $request->date,
            'pansion' => $request->pansion,
            'numberOfAdults' => $request->numberOfAdults,
            'numberOfChildren' => $request->numberOfChildren,
            'hotel_id' => $request->hotel_id,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['Reservation is successfuly made.', new ReservationResource($res)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        $role = Auth::user()->role;
        if ($role === 'admin' || $role === 'owner') {
            return response()->json(['Unauthorized: only users can make new reservations.'], 401);
        }
        if ($reservation->user_id != Auth::user()->id) {
            return response()->json(['Unauthorized: this reservation does not belong to you.'], 401);
        }
        return new ReservationResource($reservation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        $role = Auth::user()->role;
        if ($role === 'admin' || $role === 'owner') {
            return response()->json(['Unauthorized: only users can update reservations.'], 401);
        }
        if ($reservation->user_id != Auth::user()->id) {
            return response()->json(['Unauthorized: this reservation does not belong to you.'], 401);
        }

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'pansion' => 'required|in:room only,breakfast,half board,all inclusive',
            'numberOfAdults' => 'required',
            'numberOfChildren' => 'required',
            // 'hotel_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        //ne moze da se menja user i hotel, mogu da se menjaju ostale stavke rezervacije, ako user hoce da promeni hotel onda 
        //treba da obrise ovu rezervaciju i napravi novu sa drugim hotelom

        $reservation->date = $request->date;
        $reservation->pansion = $request->pansion;
        $reservation->numberOfAdults = $request->numberOfAdults;
        $reservation->numberOfChildren = $request->numberOfChildren;

        $reservation->save();

        return response()->json(['Reservation is successfuly updated.', new ReservationResource($reservation)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        $role = Auth::user()->role;
        if ($role === 'admin' || $role === 'owner') {
            return response()->json(['Unauthorized: only users can delete reservations.'], 401);
        }
        if ($reservation->user_id != Auth::user()->id) {
            return response()->json(['Unauthorized: this reservation does not belong to you.'], 401);
        }
        $reservation->delete();
        return response()->json(['Reservation is successfully deleted.']);
    }
}
