import React, { useState } from "react";
import HomeIcon from "../../assets/images/HomeIcon.png";
import CartIcon from "../../assets/images/CartIcon.png";
import LogOutIcon from "../../assets/images/LogoutIcon.png";
import "./footerForMobile.css";
import { useNavigate } from "react-router-dom";

const FooterMobile = (props) => {
  const [selectedDiv, setSelectedDiv] = useState("Home");
  const Navigate = useNavigate();

  //   function triggers when we click any div ********
  function clickDIV(event) {
    const clickedName = event.currentTarget.dataset.name;
    console.log("event.currentTarget dataset:", clickedName);
    setSelectedDiv(clickedName);
    clickedName === "Cart" && Navigate("/viewCart");
    (clickedName === "Logout" || clickedName === "Login") && Navigate("/Login");
  }
  return (
    <div className="footer--forMobile">
      <div
        onClick={clickDIV}
        data-name="Home"
        className={selectedDiv === "Home" ? "selected" : ""}
      >
        <img src={HomeIcon} alt="HomeIcon" />
        <p>Home</p>
      </div>
      <div
        onClick={clickDIV}
        data-name="Cart"
        className={selectedDiv === "Cart" ? "selected" : ""}
      >
        <img src={CartIcon} alt="CartIcon" />
        <p>Cart</p>
      </div>
      <div
        onClick={clickDIV}
        data-name={props.isLoggedIn ? "Logout" : "Login"}
        className={
          selectedDiv === "Logout" || selectedDiv === "Login" ? "selected" : ""
        }
      >
        {" "}
        <img src={LogOutIcon} alt="LogOutIcon" />{" "}
        {!props.isLoggedIn && <span>!</span>}
        <p className="login--or--logout">
          {" "}
          {props.isLoggedIn ? "Logout" : "Login"}
        </p>
      </div>
    </div>
  );
};

export default FooterMobile;
