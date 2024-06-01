import React, { useState } from "react";
import "./navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink ,useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faPlay,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = () => {
    // Close the navbar when a link is clicked
    setShowMediaIcons(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <NavLink to="/" onClick={handleNavLinkClick}>
            <h2>MovieFlix</h2>
          </NavLink>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/" onClick={handleNavLinkClick}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/search" onClick={handleNavLinkClick}>Search</NavLink>
            </li>
            <li>
              <NavLink to="/publicPlaylist" onClick={handleNavLinkClick}>Public</NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={handleNavLinkClick}>Profile</NavLink>
            </li>

            <li>
            <button className="btn btn-danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
           
            </button>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          {/* hamburger menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu className="ham" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
