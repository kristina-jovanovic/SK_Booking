import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import axios from 'axios';
import Loader from './Loader';
import useFetch from '../useFetch';
import PaginationHotels from './PaginationHotels';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

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
    let navigate = useNavigate();

    const [hotels, setHotels] = useState(null);

    const [callFetch, setCallFetch] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [data, errors] = useFetch({ urlFetch: "/api/hotels/pagination/5/" + pageNumber, dependencies: [callFetch, pageNumber] });
    //search
    const [filter, setFilter] = useState({
        filter: ''
    });
    // const [callFetchS, setCallFetchS] = useState(false);
    // const [pageNumberS, setPageNumberS] = useState(1);
    // const [maxPagesS, setMaxPagesS] = useState(1);
    // const [dataS, errorsS] = useFetch({ urlFetch: "/api/hotels/search/5/" + pageNumberS + '/' + filter.filter, dependencies: [callFetchS, pageNumberS], callOption: false });

    useEffect(() => {
        setLoading(true);
        if (data != null) {
            setHotels(data.hotels);
            setMaxPages(data.pages);
            setLoading(false);
        }
    }, [data, errors]);
    useEffect(() => {
        setCallFetch(!callFetch);
    }, []);

    //NOVO

    function handleInput(e) {
        // console.log(e);
        let newFilter = filter;
        newFilter[e.target.name] = e.target.value;
        // console.log(newFilter);
        setFilter(newFilter);

        e.preventDefault();
        if (filter.filter === '') {
            // console.log('empty');
            navigate('/');
            navigate('/hotels');
        }
        else {
            // setCallFetchS(true);
            // setLoading(true);
            // if (dataS != null) {
            //     setHotels(dataS.hotels);
            //     setMaxPagesS(dataS.pages);
            //     setLoading(false);
            //     setCallFetchS(false);
            // }


            axios.get("/api/hotels/search/5/1/" + filter.filter).then(res => {
                console.log(res.data);
                setHotels(res.data.hotels);
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    return (
        <div
            style={{
                backgroundColor: '#eaf3fa',
                minHeight: '100vh'
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
                    <form className="d-flex" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        <input className="form-control me-2" type="search" placeholder="Pretraži hotele po nazivu, ograničenjima ili sadržajima" aria-label="Search"
                            onInput={handleInput} name='filter' />
                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        <button type="submit" className="btn btn-outline-info" disabled><FaSearch /></button>
                    </form>
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
