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
  const direct_buy_id = sessionStorage.getItem("directBuy");
  console.log("direct_buy_id:- ", direct_buy_id);

  const Navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Usercart, setUsercart] = useState([]);
  const [UserID, setUserID] = useState(null);
  const [userName, setUserName] = useState("Akash Patel");

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
        isTokenValid && setUserName(isTokenValid.data.userInfo.name);
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
        const res = direct_buy_id
          ? await axios.get(`${serverUrl}/productID/${direct_buy_id}`)
          : await axios.get(`${serverUrl}/UserDetails/${UserID}`);
        const usercart = direct_buy_id
          ? await res.data.product
          : await res.data.User.mycart;
        setUsercart(usercart);

        console.log("fetchDATA res:-", usercart);
      } catch (error) {
        console.log("error in fetchDATA:- ", error);
      }
    };
    UserID && fetchDATA();
  }, [UserID, direct_buy_id]);

  // click place order function  +++++++++++++++++++
  async function placeOrder() {
    try {
      // Navigate("/successfulPage")
      if (!direct_buy_id) {
        const isEmptyDone = await axios.patch(
          `${serverUrl}/emptyCart/${UserID}`
        );
        console.log("isEmptyDone:- ", isEmptyDone.data.message);
        isEmptyDone && Navigate("/successfulPage");
      } else {
        Navigate("/successfulPage");
      }
    } catch (error) {
      console.log("placeOrder error:- ", error);
    }
  }
  //============================================== FUNCTION END ===========================================

  return isLoggedIn ? (
    <>
      <NavBar Logout={"Logout"} />
      <BannerAndCart Checkout={"/ Checkout"} />
      <BackToProductBUTTON />
      <center>
        <u className="Checkout--heading">Checkout</u>{" "}
      </center>
      {direct_buy_id || Usercart.length > 0 ? (
        <div className="container">
          <div className="product--Side">
            <div className="delivery--address--div">
              <h4 className="address--text">1. Delivery address</h4>
              <div className="address--detail">
                <p>{userName}</p>
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
                  {Usercart.map((obj, i) => (
                    <div key={i}>
                      <img src={obj.ProdectImage} alt="ProdectImage" />
                      <h6>
                        {direct_buy_id ? obj.Company : obj.ProductCompany}{" "}
                        {direct_buy_id ? obj.Model : obj.ProductModel}
                      </h6>
                      <p>Colour: {obj.ProductColor}</p>
                      <p>
                        {direct_buy_id ? obj.Available : obj.ProductAvailable}
                      </p>
                    </div>
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
            <button onClick={placeOrder}>Place your order</button>
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
                    (item) =>
                      (direct_buy_id ? 1 : item.quantity) * item.Productprice
                  ).reduce((sum, price) => sum + price, 0)}
                </p>
                <p>₹45.00</p>
              </div>
            </div>
            <div className="Order--Total--div">
              <h4>Order Total:</h4>
              <h4>
                ₹
                {Usercart.map(
                  (item) =>
                    (direct_buy_id ? 1 : item.quantity) * item.Productprice
                ).reduce((sum, price) => sum + price, 0) + 45}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <center>empty</center>
      )}

      {(direct_buy_id || Usercart.length > 0) && (
        <div className="placeOrder--bottom">
          <div>
            <button onClick={placeOrder}>Place your order</button>
          </div>
          <div>
            <h5>
              Order Total : ₹
              {Usercart.map(
                (item) =>
                  (direct_buy_id ? 1 : item.quantity) * item.Productprice
              ).reduce((sum, price) => sum + price, 0) + 45}{" "}
            </h5>
            <p>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use
            </p>
          </div>
        </div>
      )}

      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  ) : null;
};

export default CheckOut;
