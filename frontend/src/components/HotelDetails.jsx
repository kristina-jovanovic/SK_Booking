import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function HotelDetails({ hotel, token }) {

    const [hotelData, setHotelData] = useState({
        id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        photo_url: hotel.photo_url,
        email: hotel.email,
        address: hotel.address,
        restrictions: hotel.restrictions,
        facilities: hotel.facilities,
        city_id: hotel.city.id
    });
    const [loading, setLoading] = useState(true);
    function handleInput(e) {
        // console.log(e);
        let newHotelData = hotelData;
        newHotelData[e.target.name] = e.target.value;
        // console.log(newHotelData);
        setHotelData(newHotelData);
    }
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Greska');
    function update(e) {
        e.preventDefault();
        if (hotelData.name === '' || hotelData.email === '' || hotelData.description === '' || hotelData.photo_url === '') {
            setMessage('Sva polja su obavezna!');
            handleShow();
        }
        else if (hotelData.name === hotel.name && hotelData.email === hotel.email && hotelData.description === hotel.description && hotelData.photo_url === hotel.photo_url) {
            setMessage('Niste napravili nikakve izmene!');
            handleShow();
        }
        // else if (hotelData.description.length > 200) {
        //     setMessage('Opis je predugacak!');
        //     handleShow();
        // }
        else {
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `api/hotels/${hotel.id}`,
                data: hotelData,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(response);
                    if (response.data[0] === 'Hotel is successfuly updated.') {
                        setMessage("Hotel je uspesno izmenjen!");
                        setTitle('Potvrda');
                    }
                    else {
                        setMessage(response.data[0]);
                    }
                    handleShow();
                })
                .catch((error) => {
                    setMessage(error.message);
                    handleShow();
                });

        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <section className="intro" style={{
            minHeight: '100vh', backgroundColor: '#eaf3fa',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="bg-image h-100">
                <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f3f2f2;" }}>
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                            <div className="col-12 col-lg-9 col-xl-8" style={{ width: '80%' }}>
                                <div className="card" style={{ borderRadius: "1rem;" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 d-none d-md-block ctn">
                                            <img
                                                src={hotel.photo_url}
                                                alt="login form"
                                                className="img-fluid" style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem;' }}
                                            />
                                        </div>
                                        <div className="col-md-8 d-flex align-items-center">
                                            <div className="card-body py-5 px-4 p-md-5">

                                                <form action="">
                                                    <h4 className="fw-bold mb-4" style={{ color: "#92aad0;" }}>Izmenite hotel {hotel.name}</h4>
                                                    <hr />
                                                    <p className="mb-4" style={{ color: "#45526e;" }}>Unesite detalje.</p>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" for="form2Example2" >Ime hotela</label>
                                                        <input type="text" id="form2Example1" className="form-control" onInput={handleInput} name='name' placeholder={hotel.name} />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" for="form2Example2">Email adresa hotela</label>
                                                        <input type="email" id="form2Example2" className="form-control" onInput={handleInput} name='email' placeholder={hotel.email} />
                                                    </div>

                                                    <div className="form-outline mb-4 form-group">
                                                        <label className="form-label" for="form2Example2" >Opis hotela</label>
                                                        <textarea
                                                            id="form2Example3"
                                                            className="form-control"
                                                            onChange={handleInput}
                                                            name="description"
                                                            placeholder={hotel.description} // Bind the state value to the textarea
                                                            rows="4" // You can specify the number of visible rows
                                                            cols="50" // You can specify the number of visible columns
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" for="form2Example2">URL fotografije hotela</label>
                                                        <input type="url" id="form2Example2" className="form-control" onInput={handleInput} name='photo_url' placeholder={hotel.photo_url} />
                                                    </div>

                                                    <div className="d-flex justify-content-end pt-1 mb-4">
                                                        <button className="btn btn-primary btn-rounded" type="button" style={{ backgroundColor: "#92aad0;" }}
                                                            onClick={update}>Sačuvaj izmene</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose();
                        if (title === 'Potvrda') {
                            navigate('/');
                        }
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>

    )
}

export default HotelDetails
