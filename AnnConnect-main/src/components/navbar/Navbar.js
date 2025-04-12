import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../firebaseFile/AuthProvider";
import Logout from "../loginfile/logout";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

export default function Navbar({ title = "Send title Prop" }) {
  const navigate = useNavigate();

  const { currentUser, loading } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        {title}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Our Initiative
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Contact Us
            </a>
          </li>
        </ul>
        {!loading && !currentUser && (
          <>
            <p>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/Login")}
                type="submit"
              >
                Login/SignUp
              </button>
            </p>
          </>
        )}
        {!loading && currentUser && (
          <>
            <h6 className="email">{currentUser.email}</h6>
            <Logout />
          </>
        )}
      </div>
    </div>
  </nav>
  );
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
};


