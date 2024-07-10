import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    let navigate = useNavigate();
    return (
        // <!-- Background image -->
        <div
            className="bg-image d-flex justify-content-center align-items-center"
            style={{
                backgroundImage: 'url(https://www.travelplusstyle.com/wp-content/uploads/2023/04/bodrum-hotel-arrival-deck-day-01.jpg)',
                height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className='d-flex justify-content-center align-items-center'
                style={{ flexDirection: 'column' }}>
                <h1 className="text-white" >Dobro došli na SK Booking!</h1>
                <button type="button" className="btn btn-outline-info" onClick={() => (navigate('/hotels'))}>Pogledaj ponudu hotela</button>
            </div>
        </div>
        // <!-- Background image -->
    )
}

export default Home
