import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using React Router

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
            <img src = '/Users/snguy/OneDrive/Desktop/F1Hack/UPSEED/images/2.png' alt="logo"/>
            </li>
        <li className="nav-item">
          <Link to="/PostList" className="nav-link">
           SproutHub
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;