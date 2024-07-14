import React from 'react'

function UserCard({ user }) {
    return (
        <div className="card mb-3" style={{ marginTop: '0.3rem' }}>
            {/* <div className='container' style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <img src={hotel.photo_url} className="card-img-top image" alt="hotel image"
                        style={{
                            maxHeight: '400px',
                            //maxWidth: '200px' 
                        }} />
                    <div className='middle'>
                        <button type="button" className="btn btn-outline-info" onClick={reserve}>Rezerviši</button>
                    </div>
                </div> */}
            <div className="card-body">
                <h5 className="card-title"><b>Korisnik broj: {user.id}</b></h5>
                <p className="card-text"><b>Broj napravljenih rezervacija: {user.reservation_count}</b></p>
                <p className="card-text">Kontakt:
                    <br />
                    <small className="text-muted"> {user.email}</small>
                    <br />
                    <small className="text-muted">{user.phone_number}</small>
                </p>
            </div>
        </div>
    )
}

export default UserCard
