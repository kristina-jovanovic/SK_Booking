import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
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
        <div className="card mb-3" style={{ maxWidth: "540px;" }}>
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
                        {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.3970177635297!2d20.47284641553438!3d44.77271077909886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a705762332ab5%3A0x422a527f1ff25cac!2z0IjQvtCy0LUg0JjQu9C40ZvQsCAxNTQsINCR0LXQvtCz0YDQsNC0IDExMDAw!5e0!3m2!1ssr!2srs!4v1641907422919!5m2!1ssr!2srs"
                            width="100%" height="80%" style={{ border: 0 }} allowfullscreen="" loading="lazy" ></iframe> */}

                        {/* <iframe width="100%" height="300px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={{ url: `https://maps.google.com/maps?width=100%25&amp;height=80%25&amp;hl=en&amp;q=Balkanska%201,%20Beograd,%20Srbija+(Hotel%20Moskva)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}}><a href="https://www.gps.ie/">gps trackers</a></iframe> */}
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
