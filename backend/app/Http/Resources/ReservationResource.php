<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = 'reservation';
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'user' => new UserResource($this->resource->user),
            'hotel' => new HotelResource($this->resource->hotel),
            'date' => $this->resource->date,
            'pansion' => $this->resource->pansion,
            'numberOfAdults' => $this->resource->numberOfAdults,
            'numberOfChildren' => $this->resource->numberOfChildren,
            'numberOfNights' => $this->resource->numberOfNights
        ];
    }
}
