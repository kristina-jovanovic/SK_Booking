import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader';

function Home() {
    let navigate = useNavigate();
    const [quote, setQuote] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (quote == null) {
            axios.defaults.baseURL = "";

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.api-ninjas.com/v1/quotes?category=happiness',
                headers: {
                    'X-Api-Key': 'UdbC3tkRaqQWsMxfVnMNpA==rLGHxy6NzB5H8Ygg'
                }
            };

            axios.request(config)
                .then((response) => {
                    // console.log(response);
                    // console.log(response.data[0]);
                    setQuote(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
            axios.defaults.baseURL = "http://127.0.0.1:8000/";
        }
        else {

            setLoading(false);
        }
    }, [quote]);
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
            {loading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ width: "100%" }}>
                    <Loader marginT="100px"></Loader>
                </div>
            ) : (

                <div className='d-flex justify-content-center align-items-center'
                    style={{ flexDirection: 'column' }}>
                    <h1 className="text-white" >Dobro došli na SK Booking!</h1>
                    {quote == null ? (<></>) : (<p className="text-white" style={{ textAlign: 'center' }}> {quote.quote} -{quote.author}</p>)}
                    <button type="button" className="btn btn-outline-info" onClick={() => (navigate('/hotels'))}>Pogledaj ponudu hotela</button>
                </div>
            )}
        </div>
        // <!-- Background image -->
    )
}

export default Home
