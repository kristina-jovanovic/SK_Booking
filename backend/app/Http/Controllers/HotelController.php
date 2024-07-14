<?php

namespace App\Http\Controllers;

use App\Http\Resources\CityResource;
use App\Http\Resources\HotelCollection;
use App\Http\Resources\HotelResource;
use App\Models\City;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $hotels = Hotel::all();
        return new HotelCollection($hotels);
    }

    public function indexPag(Request $request, $perPage = 5, $page = 1)
    {
        // $hotels = DB::table('hotels')->leftjoin('cities', 'hotels.city_id', '=', 'cities.id')->selectRaw('*, cities.Name as city_name, hotels.Name as hotel_name')->paginate($perPage, ['*'], 'page', $page);
        // $hotels = DB::table('hotels')->paginate($perPage, ['*'], 'page', $page);
        $hotels = Hotel::query()->paginate($perPage, ['*'], 'page', $page);

        // $hotels = DB::table('hotels')->paginate(5);
        $data = $hotels->items();
        $hotels1 = $data;

        for ($i = 0; $i < sizeof($data); $i++) {
            $hotels1[$i] = new HotelResource($data[$i]);
        }

        $stranice = $hotels->lastPage();
        return response()->json(['hotels' => $hotels1, 'pages' => $stranice], 200);

        // $hotels = Hotel::paginate(10); // Paginate by 10 items per page
        // return view('hotels.index', compact('hotels'));
    }

    public function indexSearch(Request $request, $perPage = 5, $page = 1, $filter)
    {
        $hotels = Hotel::where('name', 'like', '%' . $filter . '%')
            ->orWhere('facilities', 'like', '%' . $filter . '%')
            ->orWhere('restrictions', 'like', '%' . $filter . '%')
            ->paginate($perPage, ['*'], 'page', $page);
        $data = $hotels->items();
        $hotels1 = $data;

        for ($i = 0; $i < sizeof($data); $i++) {
            $hotels1[$i] = new HotelResource($data[$i]);
        }
        $stranice = $hotels->lastPage();
        return response()->json(['hotels' => $hotels1, 'pages' => $stranice], 200);
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
        if ($role === 'user' || $role === 'admin') {
            return response()->json(['Unauthorized: only owners can add new hotels.'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|unique:hotels|email',
            'restrictions' => 'required|string|in:none,adults only,no pets',
            'facilities' => 'required',
            'description' => 'required|string',
            'photo_url' => 'required|string|url',
            'city_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $hotel = Hotel::create([
            'name' => $request->name,
            'address' => $request->address,
            'email' => $request->email,
            'restrictions' => serialize($request->restrictions),
            'facilities' => serialize($request->facilities),
            'description' => $request->description,
            'photo_url' => $request->photo_url,
            'city_id' =>  $request->city_id
        ]);

        return response()->json(['Hotel is successfuly added.', new HotelResource($hotel)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function show(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function edit(Hotel $hotel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Hotel $hotel)
    {
        $role = Auth::user()->role;
        if ($role === 'user' || $role === 'admin') {
            return response()->json(['Unauthorized: only owners can update hotels.'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|string|unique:hotels|email',
            'restrictions' => 'required|string|in:none,adults only,no pets',
            'facilities' => 'required',
            'description' => 'required|string',
            'photo_url' => 'required|string|url',
            'city_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $hotel->name = $request->name;
        $hotel->address = $request->address;
        $hotel->email = $request->email;
        $hotel->restrictions = serialize($request->restrictions);
        $hotel->facilities = serialize($request->facilities);
        $hotel->description = $request->description;
        $hotel->photo_url = $request->photo_url;
        $hotel->city_id = $request->city_id;

        $hotel->save();
        return response()->json(['Hotel is successfuly updated.', new HotelResource($hotel)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Hotel  $hotel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Hotel $hotel)
    {
        $role = Auth::user()->role;
        if ($role === 'user' || $role === 'admin') {
            return response()->json(['Unauthorized: only owners can delete hotels.'], 401);
        }
        $hotel->delete();
        return response()->json(['Hotel is successfully deleted.']);
    }
}
