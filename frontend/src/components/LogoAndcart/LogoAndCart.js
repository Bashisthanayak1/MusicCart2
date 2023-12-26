import React from "react";
import Logo from "../../assets/images/musicCartLogo.png";
import "./LogoAndCart.css";
import Viewcart from "../../assets/images/viewCartImage.png";
import { Link } from "react-router-dom";

const bannerLogo = (props) => {
  return (
    <div className="logo--and--banner">
      <div className="logo--div">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
          <p className="space"></p>
          <Link to="/home" className="Link">
            Home
          </Link>
          {/* IF these details provied then show on page */}
          {props.ProductName && props.ProductModel && (
            <p>
              / {props.ProductName} {props.ProductModel}
            </p>
          )}
        </div>
        <div className="viewcart">
          <img src={Viewcart} alt="" />
        </div>
      </div>
    </div>
  );
};

export default bannerLogo;
