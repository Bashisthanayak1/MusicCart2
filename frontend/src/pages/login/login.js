import React from "react";
import MusicLogo from "../../assets/images/musicCartLogo.png";
import footerWEB from "../../assets/images/footerWEB.png";
import mobilenav from "../../assets/images/mobileLoginNav.png";
import MusicLogoMobile from "../../assets/images/musicLogoMobile.png";
import "./login.css";

const login = () => {
  return (
    <div>
    <img src={mobilenav} alt="mobilenav" className="mobilenav" />
    <img src={MusicLogoMobile} alt="MusicLogoMobile" className="music--Logo--ForMobile" />
      <center className="loginPage--centerTag">
        <img src={MusicLogo} alt="MusicLogo" />
      </center>
      <h2 className="welcome--mobile">welcome</h2>
      <form action="" id="login--form">
        <div className="login--container">
          <h3 className="SignIn">SignIn</h3>
          <label>Enter your email or mobile number </label>
          <input type="text" name="username" required />
          <label>Password </label>
          <input type="password" name="password" required />
          <button type="submit" className="login--button">Continue</button>
          <p className="privacy--notice">
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </form>

      <div className="new--to--cart">
        <p className="line1"></p>
        <p >New to Musiccart</p>
        <p className="line2"></p>
      </div>
      <div className="create--your--account--button">
        <p>Create your Musicart account</p>
      </div>
      <div className="footerWEB">
        <img src={footerWEB} alt="footerWEB"/>
      </div>
    </div>
  );
};

export default login;
