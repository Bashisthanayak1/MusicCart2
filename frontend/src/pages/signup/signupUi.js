import React, { useState } from "react";
import "./signup.css";
import { enterDetails, submitForm } from "./signupFunction";
import MusicLogo from "../../assets/images/musicCartLogo.png";
import footerWEB from "../../assets/images/footerWEB.png";
import mobilenav from "../../assets/images/mobileLoginNav.png";
import MusicLogoMobile from "../../assets/images/musicLogoMobile.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const [UserDetails, setUserdetails] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleEnterDetails = (e) => enterDetails(e, setUserdetails);
  const handleSubmitForm = async (event) => {
    try {
      const result = await submitForm(event, UserDetails);
      console.log("result from function to ui:- ", result.message);

      if (result.message === "User has been created") {
        await toast.success("User has been created", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await sessionStorage.setItem(
          "jwttoken",
          JSON.stringify(result.jwttoken)
        );

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
      <center className="signup--center">
        <img src={MusicLogo} alt="MusicLogo" />
      </center>
      <h2 className="signup--welcome--mobile">welcome</h2>
      <form action="" className="singup--form" onSubmit={handleSubmitForm}>
        <div className="singup--container">
          <h3 className="Create--Account">Create Account</h3>

          <label>Your name </label>
          <input
            type="text"
            name="name"
            required
            onChange={handleEnterDetails}
            value={UserDetails.name}
          />
          <label>Mobile number </label>
          <input
            type="number"
            name="mobile"
            required
            onChange={handleEnterDetails}
            value={UserDetails.mobile}
          />
          <label>Email id </label>
          <input
            type="email"
            name="email"
            required
            onChange={handleEnterDetails}
            value={UserDetails.email}
          />
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            onChange={handleEnterDetails}
            value={UserDetails.password}
          />

          <p className="enrolling--message">
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>

          <button type="submit" className="signup--button">
            Continue
          </button>
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

export default Signup;
