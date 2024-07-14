import React, { useEffect, useState } from 'react'
import useFetch from '../useFetch';
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import Loader from './Loader';
import PaginationHotels from './PaginationHotels';

function UsersStats({ user, token }) {
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate();
    if (user == null || user?.role != 'admin') {
        navigate('/');
        // return;
    }

    const [users, setUsers] = useState(null);
    const [callFetch, setCallFetch] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [data, errors] = useFetch({ urlFetch: "/api/stats/5/" + pageNumber, dependencies: [callFetch, pageNumber] });

    useEffect(() => {
        setLoading(true);
        if (data != null) {
            // console.log(data.data);
            setUsers(data.data);
            setMaxPages(data.pages);
            setLoading(false);
        }
    }, [data, errors]);
    useEffect(() => {
        setCallFetch(!callFetch);
    }, []);

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
                    {users == null ? <></> : users.map((user) => (
                        // <HotelCard hotel={hotel} key={hotel.id} addHotel={addHotel} user={user} />
                        <UserCard user={user} />
                    ))}
                    <div className='d-flex justify-content-between' style={{ width: "100%", alignItems: 'center', flexFlow: 'column' }}>

                        <PaginationHotels page={pageNumber} setPage={setPageNumber} maxPages={maxPages} />
                    </div>
                </div>)}


        </div>
    )
}

export default UsersStats
