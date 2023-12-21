import React from "react";
import Logo from "../../assets/images/musicCartLogo.png";
import "./bannerLogo.css";
import Banner from "../../assets/images/homePageBanner.png";
const bannerLogo = () => {
  return (
    <div className="logo--and--banner">
      <div className="logo--div">
        <img src={Logo} alt="Logo" className="logo" />
        <p className="space"></p>
        <p> Home</p>
      </div>
      <div className="banner">
        <img src={Banner} alt="banner" />
      </div>
    </div>
  );
};

export default bannerLogo;
