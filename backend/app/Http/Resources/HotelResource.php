<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'hotel';
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'email' => $this->resource->email,
            'address' => $this->resource->address,
            'description' => $this->resource->description,
            'photo_url' => $this->resource->photo_url,
            'restrictions' => unserialize($this->resource->restrictions),
            'facilities' => unserialize($this->resource->facilities),
            'city' => new CityResource($this->resource->city)
        ];
    }
}
