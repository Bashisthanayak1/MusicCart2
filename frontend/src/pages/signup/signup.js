import React from "react";
import "./signup.css";
import MusicLogo from "../../assets/images/musicCartLogo.png";
import footerWEB from "../../assets/images/footerWEB.png";
import mobilenav from "../../assets/images/mobileLoginNav.png";
import MusicLogoMobile from "../../assets/images/musicLogoMobile.png";
import { Link } from "react-router-dom";

const signup = () => {
  return (
    <div>
      <img src={mobilenav} alt="mobilenav" className="mobilenav" />
      <img
        src={MusicLogoMobile}
        alt="MusicLogoMobile"
        className="music--Logo--ForMobile"
      />
      <center className="signup--center">
        <img src={MusicLogo} alt="MusicLogo" />
      </center>
      <h2 className="welcome--mobile">welcome</h2>
      <form action="" className="singup--form">
        <div className="singup--container">
          <h3 className="Create--Account">Create Account</h3>

          <label>Your name </label>
          <input type="text" name="name" required />
          <label>Mobile number </label>
          <input type="text" name="Mobile" required />
          <label>Email id </label>
          <input type="email" name="email" required />
          <label>Password </label>
          <input type="Password" name="Password" required />

          <p className="enrolling--message">
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>

          <button type="submit" className="signup--button">Continue</button>
          <p className="privacy--notice">
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </form>

      <center>
        <h4>
          Already have an account? <Link to="/login">Sign in</Link>{" "}
        </h4>
      </center>

      <div className="footerWEB">
        <img src={footerWEB} alt="footerWEB" />
      </div>
    </div>
  );
};

export default signup;
