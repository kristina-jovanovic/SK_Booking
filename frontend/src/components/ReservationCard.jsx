import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Map from './Map';
// import Modal from 'react-bootstrap/Modal';

function ReservationCard({ reservation, token, user }) {
    let navigate = useNavigate();
    // function izmeni() {
    //     // addReservation(reservation);
    //     // navigate(`/reservations/${reservation.id}`);
    // }

    function obrisi() {
        // console.log('brisem');

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `api/reservations/${reservation.id}`,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        axios.request(config)
            .then((response) => {
                console.log(response);
                reservation = null;
                navigate('/');
                // console.log('preusmeravam');
                // navigate(`/users/${user.id}/reservations`);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="card mb-3" style={{ maxWidth: "540px;", marginTop: '0.3rem' }}>
            <div className="row g-0">
                <div className="col-md-4 ctn">
                    <img
                        src={reservation.hotel.photo_url}
                        alt="hotel image"
                        className="img-fluid rounded-start"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <p className="card-text">
                            {/* ID rezervacije: {reservation.id} */}
                        </p>
                        <h5 className="card-title">{reservation.hotel.name}</h5>
                        <p className="card-text">{reservation.date}</p>
                        <p className="card-text">Broj odraslih: {reservation.numberOfAdults}</p>
                        <p className="card-text">Broj dece: {reservation.numberOfChildren}</p>
                        <p className="card-text">Broj noćenja: {reservation.numberOfNights}</p>
                        <p className="card-text">
                            <small className="text-muted">Tip pansiona: {reservation.pansion}</small>
                            {/* <button type="button" className="btn btn-outline-info" >Rezerviši</button> */}
                        </p>
                        <p className="d-flex justify-content-end">
                            <div className="d-flex justify-content-end" style={{ backgroundColor: 'transparent' }} >
                                {/* <button type="button" className="btn btn-outline-info p-2 ms-auto" style={{ marginRight: '5%' }} onClick={izmeni}>Izmeni</button> */}
                                <button type="button" className="btn btn-outline-info p-2 ms-auto" style={{ marginRight: '5%' }} onClick={handleShow}>Obriši</button>
                            </div>
                        </p>
                        <Map address={reservation.hotel.address
                            //  + ',' + reservation.hotel.city.name
                        } />

                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Brisanje rezervacije</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Da li ste sigurni da želite da obrišete rezervaciju?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Nazad
                        </Button>
                        <Button variant="primary" onClick={() => {
                            handleClose();
                            obrisi();
                        }}>
                            Obriši
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default ReservationCard
