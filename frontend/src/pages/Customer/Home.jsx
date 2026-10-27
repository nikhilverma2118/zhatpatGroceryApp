import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container-fluid bg-danger main-image">
        <div className="row">

          {/* button section */}
          <div className="auth-actions">
            <Link to="/register" className="btn get-started-btn p-2 text-light">
              Get Started
            </Link>

            <Link to="/login" className="btn login-btn border border-2 text-light">
              Login
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
