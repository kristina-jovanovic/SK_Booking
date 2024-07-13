import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Footer() {
    let navigate = useNavigate();

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        // document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        // <!-- Remove the container if you want to extend the Footer to full width. -->
        // <div className="container my-5">

        <section className="">
            {/* <!-- Footer --> */}
            {/* linear-gradient(to right, #f8f9fb 0%, #f8f9fb 100%) */}
            <footer className="text-center text-black" style={{ backgroundColor: "#11caf7" }}>
                {/* <!-- Grid container --> */}
                <div className="container p-4 pb-0">
                    {/* <!-- Section: CTA --> */}
                    <section className="">
                        <p className="d-flex justify-content-center align-items-center">
                            <span className="me-3" style={{ color: 'white' }}>Hvala na poverenju! </span>
                            <button type="button" className="btn btn-outline-light btn-rounded" onClick={() => { topFunction(); }}>
                                Nazad na vrh stranice
                            </button>
                            {/* <button onclick={topFunction} id="myBtn" title="Go to top">Top</button> */}
                        </p>
                    </section>
                    {/* <!-- Section: CTA --> */}
                </div>
                {/* <!-- Grid container --> */}

                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2024 Copyright  <Link className="text-black nav-link active" onClick={() => { topFunction(); }} to="/" style={{ display: 'inline' }}>SK Booking</Link>
                </div>
                {/* <!-- Copyright --> */}
            </footer>
            {/* <!-- Footer --> */}
        </section>

        // </div>
        // <!-- End of .container -->
    )
}

export default Footer
