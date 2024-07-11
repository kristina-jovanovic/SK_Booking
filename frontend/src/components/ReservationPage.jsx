import React, { useEffect, useState } from 'react'
import ReservationCard from './ReservationCard';
import axios from 'axios';

function ReservationPage({ user, token }) {
    const [reservations, setReservations] = useState();
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `api/users/${user.id}/reservations`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        if (reservations == null) {
            // axios.get(`/users/${user.id}/reservations`).then((res => {
            //     // console.log(res);
            //     setReservations(res.data.reservations);
            // }))
            axios.request(config)
                .then((response) => {
                    setReservations(response.data.reservations);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [reservations]);
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
                {/* <HotelCard />
                <HotelCard /> */}
                {reservations == null ? <></> : reservations.map((res) => (
                    <ReservationCard reservation={res} key={res.id} />
                ))}

            </div>
        </div>
    )
}

export default ReservationPage
