import axios from 'axios';
import React from 'react'
import { Outlet } from 'react-router-dom';

function NavBar({ token }) {
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
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        SK Booking
                    </a>
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
                            <a className="nav-link active" aria-current="page" href="/hotels">
                                Hoteli
                            </a>
                            {/* dva jednako pokrivaju i null i not defined, a tri jednako bi pokrivalo samo null */}
                            {token == null ? (<a className="nav-link active" aria-current="page" href="/login">
                                Login
                            </a>) : (<a className="nav-link active" aria-current="page" href="/" onClick={handleLogout}>
                                Logout
                            </a>)}
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar
