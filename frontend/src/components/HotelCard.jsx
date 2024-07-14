import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function HotelCard({ hotel, addHotel, user }) {
    let navigate = useNavigate();
    function reserve() {
        // navigate(`/hotels/id=${hotel.id}`)

        if (user == null) {
            //mora prvo da se prijavi ako nije prijavljen
            navigate('/login');
        }
        else {
            addHotel(hotel);
            navigate('/reservations');
        }

    }
    return (
        <div className="card mb-3" style={{ marginTop: '0.3rem' }}>
            <div className='container' style={{ paddingLeft: 0, paddingRight: 0 }}>
                <img src={hotel.photo_url} className="card-img-top image" alt="hotel image"
                    style={{
                        maxHeight: '400px',
                        //maxWidth: '200px' 
                    }} />
                <div className='middle'>
                    <button type="button" className="btn btn-outline-info" onClick={reserve}>Rezerviši</button>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title"><b>{hotel.name}</b></h5>
                <p className="card-text">{hotel.description}
                </p>
                <ul>
                    {hotel.restrictions.map(res => (
                        res === 'none' ? (<></>) : (<span className="badge rounded-pill bg-primary" key={res}
                            style={{ marginRight: '10px' }}>{res}</span>)

                    ))}
                </ul>
                <ul>
                    {hotel.facilities.map(fac => (
                        <span className="badge bg-info" key={fac}
                            style={{ marginRight: '10px' }}>{fac}</span>
                    ))}
                </ul>
                <p className="card-text">
                    <small className="text-muted">{hotel.address}, {hotel.city.name}, {hotel.city.state}</small>
                    <br />
                    <small className="text-muted">{hotel.email}</small>
                </p>
            </div>
        </div>
    )

}

export default HotelCard
