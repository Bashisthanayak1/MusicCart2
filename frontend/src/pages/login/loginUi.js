import React, { useState } from "react";
import "./login.css";
import { enterDetails, submitForm } from "./loginFunction";
import MusicLogo from "../../assets/images/musicCartLogo.png";
import footerWEB from "../../assets/images/footerWEB.png";
import mobilenav from "../../assets/images/mobileLoginNav.png";
import MusicLogoMobile from "../../assets/images/musicLogoMobile.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // clearing session storage
  sessionStorage.removeItem("jwttoken");

  const Navigate = useNavigate();
  const [UserDetails, setUserdetails] = useState({
    mobileORemail: "",
    password: "",
  });

  const handleEnterDetails = (e) => enterDetails(e, setUserdetails);

  const handleSubmitForm = async (event) => {
    try {
      const result = await submitForm(event, UserDetails);
      console.log("result from function to ui:- ", result.message);

      if (result.message === "User loggedin") {
        await toast.success("login successful", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // saving jwt token in session storage
        sessionStorage.setItem("jwttoken", JSON.stringify(result.jwttoken));

        setTimeout(() => {
          Navigate("/home");
        }, 2000);
      } else {
        toast.error(result.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <img src={mobilenav} alt="mobilenav" className="mobilenav" />
      <img
        src={MusicLogoMobile}
        alt="MusicLogoMobile"
        className="music--Logo--ForMobile"
      />
      <center className="loginPage--centerTag">
        <img src={MusicLogo} alt="MusicLogo" />
      </center>
      <h2 className="welcome--mobile">welcome</h2>
      <form action="" id="login--form" onSubmit={handleSubmitForm}>
        <div className="login--container">
          <h3 className="SignIn">SignIn</h3>
          <label>Enter your email or mobile number </label>
          <input
            type="text"
            name="mobileORemail"
            required
            onChange={handleEnterDetails}
            value={UserDetails.mobile}
          />
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            onChange={handleEnterDetails}
            value={UserDetails.password}
          />
          <button type="submit" className="login--button">
            Continue
          </button>
          <p className="privacy--notice">
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </form>

      <div className="new--to--cart">
        <p className="line1"></p>
        <p>New to Musiccart</p>
        <p className="line2"></p>
      </div>
      <div className="create--your--account--button">
        <p>
          {" "}
          <Link to="/signup" className="LinkTag">
            {" "}
            Create your Musicart account
          </Link>{" "}
        </p>
      </div>
      <div className="footerWEB">
        <img src={footerWEB} alt="footerWEB" />
      </div>
    </div>
  );
};

export default Login;
