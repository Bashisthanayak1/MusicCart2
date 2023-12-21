import React from "react";
import BlankNavbar from "../../assets/images/mobileLoginNav.png";
import "./navbar.css";
import { Link } from "react-router-dom";
const NavWithoutLogin = () => {
  return (
    <div>
      <nav className="homePage--Navbar">
        <img src={BlankNavbar} alt="navWithoutLogin" />
      </nav>
      <div className="navInfo">
        <div className="mobileNumber">
          <i className="fa-solid fa-phone-volume"> </i>
          <span> 912121131313</span>
        </div>
        <div className="offAndShopNow">
          Get 50% off on selected items | shop now
        </div>
        <div>
          <span>
            {" "}
            <Link className="login--SignButton" to="/login">
              Login
            </Link>{" "}
          </span>{" "}
          |{" "}
          <span>
            <Link className="login--SignButton" to="/signup">
              Signup
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavWithoutLogin;
