import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); 

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");  
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");
    localStorage.removeItem("appointmentData");

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    });

    setIsLoggedIn(false);
    setUserName(""); 
    navigate("/"); 
  };

  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    console.log("Stored Name in Navbar:", storedName); // ✅ Debugging

    if (storedName && storedName !== "undefined" && storedName !== "null") { 
      setIsLoggedIn(true);
      setUserName(storedName);
    } else {
      setUserName("User"); // ✅ Default if name is missing
    }
  }, []);

  return (
    <header>
      <nav className="nav">
        <div className="nav__logo">
          <Link to="/">
            StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
          </Link>
          <span>.</span>
        </div>
        <div className="nav__icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
        <ul className={click ? "nav__links active" : "nav__links"}>
          <li className="link">
            <Link to="/Home">Home</Link>
          </li>
          <li className="link">
            <Link to="/BookingConsultation">Appointments</Link>
          </li>
          <li className="link">
            <Link to="/Healthblog">Health Blog</Link>
          </li>
          <li className="link">
            <Link to="/ReviewForm">Reviews</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="link welcome-user" onClick={() => setShowDropdown(!showDropdown)}>
                Welcome, {userName}
                {showDropdown && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/ProfileCard">Your Profile</Link>
                    </li>
                    <li>
                      <Link to="/ReportsLayout">Your Reports</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="link">
                <button type="button" className="btn2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="link mr">
                <Link to="/signup">
                  <button type="button" className="btn1">Sign Up</button>
                </Link>
              </li>
              <li className="link">
                <Link to="/login">
                  <button type="button" className="btn1">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
