import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import jsPDF from 'jspdf';

function ReservationForm({ user, hotel, token }) {
    let navigate = useNavigate();
    if (user == null || hotel == null) {
        //korisnik mora biti ulogovan 
        navigate('/login');
    }
    const [reservationData, setReservationData] = useState({
        user_id: user.id,
        hotel_id: hotel.id,
        date: '',
        pansion: '',
        numberOfAdults: '1',
        numberOfChildren: '0',
        numberOfNights: 1
    });
    // console.log(reservationData);
    function handleInput(e) {
        // console.log(e);
        let newResData = reservationData;
        newResData[e.target.name] = e.target.value;
        console.log(newResData);
        setReservationData(newResData);
    }
    function generatePDF(res) {
        const doc = new jsPDF();

        doc.setFillColor(234, 243, 250);
        doc.setTextColor('navy');
        doc.setFont('Times New Roman');
        doc.setFontSize(15);

        doc.text("Rezervacija broj: " + res.id, 10, 10);
        doc.text("", 10, 20);
        doc.text("Hotel: " + res.hotel.name, 10, 25);
        doc.text("Pansion: " + res.pansion, 10, 30);
        doc.text("Datum prijave: " + res.date, 10, 35);
        doc.text("Broj nocenja: " + res.numberOfNights, 10, 40);
        doc.text("Broj odraslih: " + res.numberOfAdults, 10, 45);
        doc.text("Broj dece: " + res.numberOfChildren, 10, 50);
        doc.text("", 10, 55);
        doc.text("Hvala na poverenju! Vaš SK Booking ", 10, 60);

        doc.save("potvrda-rezervacije.pdf")
    }

    function rezervisi() {

        if (reservationData.date === '' || reservationData.pansion === '') {
            alert('Sva polja su obavezna!');
            return;
        }

        //post zahtev, dodajemo red u tabelu rezervations u bazi

        // const start_date = new Date(reservationData.date);
        const start_date = Date.parse(reservationData.date);
        console.log(start_date);
        const formattedDate = format(start_date, 'yyyy-MM-dd');
        console.log(formattedDate);

        let bodyFormData = new FormData();
        bodyFormData.append('date', formattedDate);
        bodyFormData.append('pansion', reservationData.pansion);
        bodyFormData.append('numberOfAdults', parseInt(reservationData.numberOfAdults, 10));
        bodyFormData.append('numberOfChildren', parseInt(reservationData.numberOfChildren, 10));
        bodyFormData.append('numberOfNights', parseInt(reservationData.numberOfNights, 10));
        bodyFormData.append('user_id', reservationData.user_id);
        bodyFormData.append('hotel_id', reservationData.hotel_id);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'api/reservations',
            data: bodyFormData,
            headers: {
                'Authorization': 'Bearer ' + token
            },
        };

        axios.request(config)
            .then((response) => {
                // console.log('uspesno sacuvano', response.data[1]);
                // alert("Rezervacija uspešna!");
                generatePDF(response.data[1]);
            })
            .catch((error) => {
                // console.log(error);
                alert(error);
            });

        navigate('/');
    }
    return (
        <section className="intro" style={{ height: '100vh', backgroundColor: '#eaf3fa' }}>
            <div className="bg-image h-100">
                <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f3f2f2;" }}>
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
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
                                                    <h4 className="fw-bold mb-4" style={{ color: "#92aad0;" }}>Rezervišite smeštaj u hotelu {hotel.name}</h4>
                                                    <hr />
                                                    <p className="mb-4" style={{ color: "#45526e;" }}>Unesite detalje rezervacije.</p>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" for="form2Example1">Tip pansiona:</label>
                                                        {/* 'room only', 'breakfast', 'half board', 'all inclusive' */}
                                                        <div class="radio">
                                                            <label><input type="radio" value="room only" onChange={handleInput} name='pansion' />  Najam</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" value="breakfast" onChange={handleInput} name='pansion' />  Noćenje sa doručkom</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" value="half board" onChange={handleInput} name='pansion' />  Polupansion</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label><input type="radio" value="all inclusive" onChange={handleInput} name='pansion' />  All inclusive</label>
                                                        </div>
                                                        {/* <input type="email" id="form2Example1" className="form-control" /> */}
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        {/* <label className="form-label" for="form2Example2">Password</label> */}
                                                        {/* <input type="password" id="form2Example2" className="form-control" /> */}
                                                        <div class="form-group">
                                                            <label for="sel1">Broj odraslih:</label>
                                                            <select class="form-control" id="sel1" onChange={handleInput} name='numberOfAdults'>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="sel2">Broj dece:</label>
                                                            <select class="form-control" id="sel2" onChange={handleInput} name='numberOfChildren'>
                                                                <option>0</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="sel2">Broj noćenja:</label>
                                                            <select class="form-control" id="sel2" onChange={handleInput} name='numberOfNights'>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>6</option>
                                                                <option>7</option>
                                                                <option>8</option>
                                                                <option>9</option>
                                                                <option>10</option>
                                                                <option>11</option>
                                                                <option>12</option>
                                                                <option>13</option>
                                                                <option>14</option>
                                                                <option>15</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-outline mb-4 form-group">
                                                        <label >Datum prijave:</label>
                                                        <input type="date" min="2024-07-15" style={{ width: '100%' }} onChange={handleInput} name='date' />

                                                    </div>

                                                    <div className="d-flex justify-content-end pt-1 mb-4">
                                                        <button className="btn btn-primary btn-rounded" type="button" style={{ backgroundColor: "#92aad0;" }}
                                                            onClick={rezervisi}>Rezerviši</button>
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
        </section>
    )
}

export default ReservationForm
