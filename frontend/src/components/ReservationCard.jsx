import React from 'react'

function ReservationCard({ reservation }) {
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
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationCard
