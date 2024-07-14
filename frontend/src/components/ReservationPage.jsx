import React, { useEffect, useState } from 'react'
import ReservationCard from './ReservationCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Loader from './Loader';

function ReservationPage({ user, token }) {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    // console.log(loading);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reservations, setReservations] = useState();
    useEffect(() => {
        setLoading(true);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `api/users/${user.id}/reservations`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        if (reservations == null) {
            axios.request(config)
                .then((response) => {
                    setReservations(response.data.reservations);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        else {
            setLoading(false);
        }
        // console.log(reservations);
    }, [reservations]);
    return (
        <div //className="bg-image"
            style={{
                // backgroundImage: 'url(https://img.freepik.com/free-vector/world-tourism-day-labels-collection_23-2149052388.jpg?ga=GA1.1.917910491.1706989513&semt=ais_hybrid)',
                // height: '100vh',
                //paddingTop:'10vh'
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

                </div>

            )}

        </div>
    )
}

export default ReservationPage
