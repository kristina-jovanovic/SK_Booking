import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import axios from 'axios';
import Loader from './Loader';
import useFetch from '../useFetch';
import PaginationHotels from './PaginationHotels';

function HotelsPage({ addHotel, user }) {
    // const [hotels, setHotels] = useState();
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     setLoading(true);
    //     if (hotels == null) {
    //         axios.get("/api/hotels").then((res => {
    //             // console.log(res);
    //             setHotels(res.data.hotels);
    //         }))

    //     }
    //     else {
    //         setLoading(false);
    //     }
    // }, [hotels]);

    //NOVO
    const [hotels, setHotels] = useState(null);
    const [callFetch, setCallFetch] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [data, errors] = useFetch({ urlFetch: "/api/hotels/pagination/5/" + pageNumber, dependencies: [callFetch, pageNumber] });

    useEffect(() => {
        if (data != null) {
            setHotels(data.hotels);
            setMaxPages(data.pages);
        }
        else {
            setLoading(false);
        }
    }, [data, errors]);
    useEffect(() => {
        setCallFetch(!callFetch);
    }, []);

    //NOVO

    return (
        <div
            style={{
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
                    {hotels == null ? <></> : hotels.map((hotel) => (
                        <HotelCard hotel={hotel} key={hotel.id} addHotel={addHotel} user={user} />
                    ))}
                    <div className='d-flex justify-content-between' style={{ width: "100%", alignItems: 'center', flexFlow: 'column' }}>

                        <PaginationHotels page={pageNumber} setPage={setPageNumber} maxPages={maxPages} />
                    </div>
                </div>)}


        </div>
    )
}

export default HotelsPage
