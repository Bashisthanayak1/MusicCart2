import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/navbar";
import BannerAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import BackToProductBUTTON from "../../assets/baackToProducts  Button/backToProduct.js";
import footerWEB from "../../assets/images/footerWEB.png";
import serverUrl from "../../config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./checkOut.css";

const CheckOut = () => {
  const Navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Usercart, setUsercart] = useState([]);
  const [UserID, setUserID] = useState(null);

  // checking if user logged or not  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const jwttoken = sessionStorage.getItem("jwttoken");
  useEffect(() => {
    async function loginAuth() {
      if (!jwttoken) {
        Navigate("/login");
      }

      try {
        const isTokenValid = await axios.post(
          `${serverUrl}/isAuthenticated`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${jwttoken}`,
            },
          }
        );

        console.log(
          "isTokenValid and cart:- ",
          isTokenValid.data.userInfo.mycart
        );
        isTokenValid && setIsLoggedIn(true);
        isTokenValid && setUserID(isTokenValid.data.userInfo._id);
      } catch (error) {
        console.error("Error checking token validity:", error);
        setIsLoggedIn(false);
        Navigate("/login");
      }
    }

    loginAuth();
  }, [jwttoken, setIsLoggedIn, Navigate]);

  // getting usercart  by user _id +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    const fetchDATA = async () => {
      try {
        const res = await axios.get(`${serverUrl}/UserDetails/${UserID}`);
        const UserCart = await res.data.User.mycart;
        console.log("fetchDATA res:-", UserCart);
        setUsercart(UserCart);
      } catch (error) {
        console.log("error in fetchDATA:- ", error);
      }
    };
    UserID && fetchDATA();
  }, [UserID]);

  //============================================== FUNCTION END ===========================================

  return !isLoggedIn || isLoggedIn ? (
    <>
      <NavBar Logout={"Logout"} />
      <BannerAndCart Checkout={"/ Checkout"} />
      <BackToProductBUTTON />
      <center>
        <u className="Checkout--heading">Checkout</u>{" "}
      </center>

      <div className="container">
        <div className="product--Side">
          <div className="delivery--address--div">
            <h4 className="address--text">1. Delivery address</h4>
            <div className="address--detail">
              <p>Akash Patel</p>
              <p>104</p>
              <p>kk hh nagar ,Lucknow</p>
              <p>Uttar Pradesh,226025</p>
            </div>
          </div>
          <div className="payment--method--div">
            <h4 className="payment--text">2. Payment method</h4>
            <div className="pay--on--del--text">
              <p>Pay on delivery ( Cash/Card)</p>
            </div>
          </div>
          <div className="review--item--div">
            <h4 className="Review--items--text">
              3. Review items and delivery
            </h4>
            <div className="product--img-etc">
              <div className="img--and--detail">
                {Usercart.map((obj) => (
                  <>
                    <img src={obj.ProdectImage} alt="ProdectImage" />
                    <h6>
                      {obj.ProductCompany} {obj.ProductModel}
                    </h6>
                    <p>Colour: {obj.ProductColor}</p>
                    <p>{obj.ProductAvailable}</p>
                  </>
                ))}
              </div>

              <h6 className="Estimated--delivery">
                <p>Estimated delivery : </p>
                <p>Monday — FREE Standard Delivery</p>
              </h6>
            </div>
          </div>
        </div>
        <div className="Placeorder--Side">
          <button onClick={() => Navigate("/successfulPage")}>
            Place your order
          </button>
          <p>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
          <h4>Order Summary</h4>
          <div className="item--and--delivery">
            <div>
              <p>Items:</p>
              <p>Delivery:</p>
            </div>
            <div>
              <p>
                ₹
                {Usercart.map(
                  (item) => item.quantity * item.Productprice
                ).reduce((sum, price) => sum + price, 0)}
              </p>
              <p>₹45.00</p>
            </div>
          </div>
          <div className="Order--Total--div">
            <h4>Order Total:</h4>
            <h4>
              ₹
              {Usercart.map((item) => item.quantity * item.Productprice).reduce(
                (sum, price) => sum + price,
                0
              ) + 45}
            </h4>
          </div>
        </div>
      </div>

      <div className="placeOrder--bottom">
        <div>
          <button onClick={() => Navigate("/successfulPage")}>
            Place your order
          </button>
        </div>
        <div>
          <h5>
            Order Total : ₹
            {Usercart.map((item) => item.quantity * item.Productprice).reduce(
              (sum, price) => sum + price,
              0
            ) + 45}{" "}
          </h5>
          <p>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use
          </p>
        </div>
      </div>

      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  ) : null;
};

export default CheckOut;
