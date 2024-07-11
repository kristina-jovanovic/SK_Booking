import React, { useEffect, useState } from 'react'
import ReservationCard from './ReservationCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function ReservationPage({ user, token }) {
    let navigate = useNavigate();

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        // console.log(reservations);
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
                {reservations == null ? (<></>) : (reservations.length === 0 ? (<><Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title>Nemate zakazanih rezervacija</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            handleClose();
                            navigate('/');
                        }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal></>) : (reservations.map((res) => (
                    <ReservationCard reservation={res} key={res.id} token={token} user={user} />
                ))))}
                { }

            </div>
        </div>
    )
}

export default ReservationPage
