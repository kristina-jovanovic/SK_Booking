import React from 'react'

function LoginPage() {
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://img.freepik.com/free-vector/online-app-tourism-traveler-with-mobile-phone-passport-booking-buying-plane-ticket_74855-10966.jpg?t=st=1720387199~exp=1720390799~hmac=7458b9f295273dca51b7f7fc3082ec1b6838338d878bec4e6faca1a4558b5dc8&w=1380"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="form1Example13" className="form-control form-control-lg" />
                                <label className="form-label" for="form1Example13">Email address</label>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="form1Example23" className="form-control form-control-lg" />
                                <label className="form-label" for="form1Example23">Password</label>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">Sign in</button>

                                </p>
                            </div>

                            <div className="d-flex justify-content-around align-items-center mb-4">
                                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!" className="link-danger">Register</a></p>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
