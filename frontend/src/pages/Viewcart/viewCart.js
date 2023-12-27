import React from "react";
import NavBar from "../../components/NavBar/navbar";
import BannerAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import BackToProductBUTTON from "../../assets/baackToProducts  Button/backToProduct.js";
import MyCartImage from "../../assets/images/MyCartIMAGE.png";
import footerWEB from "../../assets/images/footerWEB.png";

import "./viewCart.css";
const viewCart = () => {
  const productIMAGE =
    "data:image/jpeg;base64,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";
  return (
    <>
      <NavBar Logout={"Logout"} />
      <BannerAndCart ViewCart={"/View Cart"} />
      <BackToProductBUTTON />
      <div className="MyCartIMAGE--div">
        <img src={MyCartImage} alt="" />
      </div>

      <div className="cart--details--container">
        {/* *START* */}

        <div className="products--full--detail--div">
          <div id="NumberOF--Product">
            <div className="each--product--div">
              <div className="product--image--div">
                <img src={productIMAGE} alt="productIMAGE" />
              </div>
              <div className="product--modelColor--div">
                <h5>Sony WH-CH720N</h5>
                <p className="color">Colour :Black</p>
                <p>In Stock</p>
              </div>
              <div className="product--price--div">
                <h5>Price</h5>
                <p>₹ 3500</p>
              </div>
              <div className="product--quantity--div">
                <h5>Quantity</h5>
                <select name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="2">5</option>
                  <option value="3">6</option>
                  <option value="4">7</option>
                </select>
              </div>
              <div className="product--total--div">
                <h5>Total</h5>
                <p>₹ 3500</p>
              </div>
            </div>

            <div className="each--product--div">
              <div className="product--image--div">
                <img src={productIMAGE} alt="productIMAGE" />
              </div>
              <div className="product--modelColor--div">
                <h5>Sony WH-CH720N</h5>
                <p className="color">Colour :Black</p>
                <p>In Stock</p>
              </div>
              <div className="product--price--div">
                <h5>Price</h5>
                <p>₹ 3500</p>
              </div>
              <div className="product--quantity--div">
                <h5>Quantity</h5>
                <select name="" id="" >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="2">5</option>
                  <option value="3">6</option>
                  <option value="4">7</option>
                </select>
              </div>
              <div className="product--total--div">
                <h5>Total</h5>
                <p>₹ 3500</p>
              </div>
            </div>
          </div>

          {/* *** */}

          <div id="middelbar"></div>

          {/* *** */}
          <div className="ProductDetails">
            <h4>PRICE DETAILS</h4>
            <div>
              {" "}
              <p>Total MRP</p>
              <p>₹ 3500</p>
            </div>
            <div>
              {" "}
              <p>Discount on MRP</p>
              <p>₹0</p>
            </div>
            <div>
              {" "}
              <p>Convenience Fee</p>
              <p>₹ 45</p>
            </div>
          </div>
        </div>

        <div className="Number--of--item--total">
          <div className="item--price">
            <span>1 item</span>
            <p>₹ 350</p>
          </div>
          <div className="total--amount">
            <p>Total Amount</p>
            <p>₹ 3045</p>
          </div>
        </div>
        {/* *END* */}
      </div>
      <div className="Place--order">
        <button> Place Order </button>
      </div>
      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  );
};

export default viewCart;
