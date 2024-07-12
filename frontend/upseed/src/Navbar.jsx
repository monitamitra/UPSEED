/* Navbar.jsx */
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using React Router
import img1 from './images/upSeedLogo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
            <img src = {img1} alt="logo"/>
            </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
          SPROUTHUB
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            PROFILE
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            LOGIN
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            SIGNUP
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;