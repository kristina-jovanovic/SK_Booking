import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import axios from 'axios';
import Loader from './Loader';
import useFetch from '../useFetch';
import PaginationHotels from './PaginationHotels';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function HotelsPage({ addHotel, user }) {
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    const [hotels, setHotels] = useState(null);

    const [callFetch, setCallFetch] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [data, errors] = useFetch({ urlFetch: "/api/hotels/pagination/5/" + pageNumber, dependencies: [callFetch, pageNumber] });

    const [filter, setFilter] = useState({
        filter: ''
    });


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

    const [pageNumberS, setPageNumberS] = useState(1);
    const [maxPagesS, setMaxPagesS] = useState(1);

    function handleInput(e) {
        let newFilter = filter;
        newFilter[e.target.name] = e.target.value;
        setFilter(newFilter);

        e.preventDefault();
        if (filter.filter === '') {
            navigate('/');
            navigate('/hotels');
            setMaxPagesS(1);
            setHotels(data.hotels);
        }
        else {
            axios.get("/api/hotels/search/5/" + pageNumberS + '/' + filter.filter).then(res => {
                console.log(res.data);
                setHotels(res.data.hotels);
                setMaxPagesS(res.data.pages);
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
                    {(filter == null || filter.filter === '') ? (
                        <div className='d-flex justify-content-between' style={{ width: "100%", alignItems: 'center', flexFlow: 'column' }}>

                            <PaginationHotels page={pageNumber} setPage={setPageNumber} maxPages={maxPages} />
                        </div>) : (
                        <div className='d-flex justify-content-between' style={{ width: "100%", alignItems: 'center', flexFlow: 'column' }}>

                            <PaginationHotels page={pageNumberS} setPage={setPageNumberS} maxPages={maxPagesS} />
                        </div>
                    )}

                </div>)}


        </div>
    )
}

export default HotelsPage
