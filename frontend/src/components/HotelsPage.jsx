import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import axios from 'axios';
import Loader from './Loader';

function HotelsPage({ addHotel, user }) {
    const [hotels, setHotels] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (hotels == null) {
            axios.get("/api/hotels").then((res => {
                // console.log(res);
                setHotels(res.data.hotels);
            }))

        }
        else {
            setLoading(false);
        }
    }, [hotels]);

    return (
        <div //className="bg-image"
            style={{
                // backgroundImage: 'url(https://img.freepik.com/free-vector/world-tourism-day-labels-collection_23-2149052388.jpg?ga=GA1.1.917910491.1706989513&semt=ais_hybrid)',
                // height: '100vh',
                //paddingTop:'10vh'
                backgroundColor: '#eaf3fa'
            }}>
            {loading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: '80vh' }}>
                    <Loader marginT="20%"></Loader>
                </div>
            ) : (
                <div //className="border d-flex align-items-center justify-content-center" 
                    style={{
                        // height: "100vh",
                        backgroundColor: 'transparent',
                        marginLeft: '25%',
                        marginRight: '25%',
                        // paddingTop: '30%',
                        flexDirection: 'column'
                    }}>
                    {/* <HotelCard />
                <HotelCard /> */}
                    {hotels == null ? <></> : hotels.map((hotel) => (
                        <HotelCard hotel={hotel} key={hotel.id} addHotel={addHotel} user={user} />
                    ))}

                </div>)}

        </div>
    )
}

export default HotelsPage
