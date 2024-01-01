import React from "react";
import LogoAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import Successfulimage from "../../assets/images/successfulIMAGE.png";
import footerWEB from "../../assets/images/footerWEB.png";

import "./successfull.css";
import { Link } from "react-router-dom";

const successful = () => {
  sessionStorage.removeItem("directBuy");
  return (
    <div>
      <div className="successfulPAGE--logo--div">
        {" "}
        <LogoAndCart showHome={false} />
      </div>

      <div className="successful--div">
        <img src={Successfulimage} alt="Successfulimage" />
        <div>
          <h2>Order is placed successfully!</h2>
          <p>You will be receiving a confirmation email with order details</p>
        </div>
        <Link className="Link" to="/home">
          Go back to Home page
        </Link>{" "}
      </div>
      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </div>
  );
};

export default successful;
