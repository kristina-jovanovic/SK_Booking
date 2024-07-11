import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function NavBar({ token, addToken, addUser, user }) {
    let navigate = useNavigate();

    function handleLogout() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'api/logout',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.sessionStorage.setItem("auth_token", null);
                addToken(null);
                addUser(null);
            })
            .catch((error) => {
                console.log(error);
            });
        navigate('/');
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"
            // style={{
            //     backgroundColor: 'linear-gradient(to right, #004e85 0%, #c9f9fa 100%)',
            //     position: 'fixed' 
            // }}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        SK Booking
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse show"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/hotels">
                                Hoteli
                            </Link>
                            {/* {user === null ? (<></>) : (
                                user.role === 'user' ? (<Link className="nav-link active" aria-current="page" to='/'>Rezervacije</Link>) : (<></>)
                            )} */}
                            {user?.role === 'user' ? (<Link className="nav-link active" aria-current="page" to={{ pathname: `users/${user.id}/reservations` }}>Rezervacije</Link>) : (<></>)}
                            {/* dva jednako pokrivaju i null i not defined, a tri jednako bi pokrivalo samo null */}
                            {token == null ? (<Link className="nav-link active" aria-current="page" to="/login">
                                Login
                            </Link>) : (<Link className="nav-link active" aria-current="page" to="/" onClick={handleShow}>
                                Logout
                            </Link>)}
                        </div>
                    </div>
                </div>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Odjavljivanje</Modal.Title>
                </Modal.Header>
                <Modal.Body>Da li ste sigurni da želite da se odjavite?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nazad
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose();
                        handleLogout();
                    }}>
                        Odjavi se
                    </Button>
                </Modal.Footer>
            </Modal>

            <Outlet />
        </div>
    )
}

export default NavBar
