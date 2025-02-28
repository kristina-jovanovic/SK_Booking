import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RegisterPage({ token }) {
    let navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Greska');

    useEffect(() => {
        if (token != null) {
            navigate('/');
        }
    })
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        role: 'user'
    });


    function handleInput(e) {
        // console.log(e);
        let newUserData = userData;
        newUserData[e.target.name] = e.target.value;
        //console.log(newUserData);
        setUserData(newUserData);
    }

    function handleRegister(e) {

        e.preventDefault();
        if (userData.name === '' || userData.email === '' || userData.password === '' || userData.phone_number === '') {
            // alert('Sva polja su obavezna!');
            // return;
            setMessage('Sva polja su obavezna!');
            handleShow();
            // console.log(show);
        }
        else if (userData.password.length < 8) {
            // alert('Lozinka mora imati najmanje 8 karaktera!');
            // return;
            setMessage('Lozinka mora imati najmanje 8 karaktera!');
            handleShow();
        }
        else if (/^[0-9]*$/.test(userData.phone_number) != true) {
            // alert('Broj telefona moze da sadrzi samo cifre!');
            // return;
            setMessage('Broj telefona moze da sadrzi samo cifre!');
            handleShow();
        }
        else if (userData.phone_number.length < 9) {
            // alert('Broj telefona mora da sadrzi najmanje 9 cifara!');
            // return;
            setMessage('Broj telefona mora da sadrzi najmanje 9 cifara!');
            handleShow();
        }
        else {
            axios.post("/api/register", userData).then((response) => {
                console.log(response.data);

                //kad se registruje, prebaci ga na login stranicu
                // alert('Registracija uspešna');
                setMessage('Registracija uspesna');
                setTitle('Potvrda');
                handleShow();
                // navigate("/login");
            }).catch((error) => {
                console.log(error);
                // alert('Registracija neuspesna');
                setMessage(error);
                handleShow();
            });
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100 log-ctr">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://img.freepik.com/free-vector/online-app-tourism-traveler-with-mobile-phone-passport-booking-buying-plane-ticket_74855-10966.jpg?t=st=1720387199~exp=1720390799~hmac=7458b9f295273dca51b7f7fc3082ec1b6838338d878bec4e6faca1a4558b5dc8&w=1380"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={handleRegister}>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="name" id="form1Example13" className="form-control form-control-lg"
                                    placeholder='Unesi ime i prezime' onInput={(e) => handleInput(e)} name="name" />
                                <label className="form-label" for="form1Example13">Ime i prezime</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="form1Example13" className="form-control form-control-lg"
                                    placeholder='Unesi email adresu' onInput={(e) => handleInput(e)} name="email" />
                                <label className="form-label" for="form1Example13">Email adresa</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="form1Example23" className="form-control form-control-lg"
                                    placeholder='Unesi lozinku' onInput={(e) => handleInput(e)} name="password" />
                                <label className="form-label" for="form1Example23">Lozinka</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="phone_number" id="form1Example13" className="form-control form-control-lg"
                                    placeholder='Unesi broj telefona' onInput={(e) => handleInput(e)} name="phone_number" />
                                <label className="form-label" for="form1Example13">Broj telefona</label>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Registruj se</button>

                                </p>
                            </div>

                        </form>
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
                        if(title==='Potvrda'){
                            navigate('/login');
                        }
                    }}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default RegisterPage
