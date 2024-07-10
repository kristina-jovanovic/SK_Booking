import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState({
        id: null,
        name: '',
        description: '',
        photo_url: '',
        email: '',
        address: '',
        restrictions: '',
        facilities: '',
        city_id: ''
    });
    useEffect(() => {
        if (id) {
            axios.get(`/hotels/${id}`).then((res => {
                // console.log(res);
                setHotel(res.data.hotel);
            }))
        }
    }, [id]);
    return (
        <div //className="bg-image"
            style={{
                // backgroundImage: 'url(https://img.freepik.com/free-vector/world-tourism-day-labels-collection_23-2149052388.jpg?ga=GA1.1.917910491.1706989513&semt=ais_hybrid)',
                // height: '100vh',
                //paddingTop:'10vh'
                backgroundColor: '#eaf3fa'
            }}>
            <div //className="border d-flex align-items-center justify-content-center" 
                style={{
                    // height: "100vh",
                    backgroundColor: 'transparent',
                    marginLeft: '25%',
                    marginRight: '25%',
                    // paddingTop: '30%',
                    flexDirection: 'column'
                }}>
                <div className="card mb-3">
                    <img src={hotel.photo_url} className="card-img-top" alt="hotel image"
                        style={{
                            maxHeight: '400px',
                            //maxWidth: '200px' 
                        }} />

                    <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text">
                            {hotel.description}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">{hotel.address}</small>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HotelDetails
