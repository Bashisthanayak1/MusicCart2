import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/navbar";
import BannerAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import BackToProductBUTTON from "../../assets/baackToProducts  Button/backToProduct.js";
import footerWEB from "../../assets/images/footerWEB.png";
import serverUrl from "../../config.js";
import { ToastContainer, toast } from "react-toastify";

import "./productDetails.css";

const ProductDetail = () => {
  const Navigate = useNavigate();
  //acessing the id we are getting from URL(from homepage product)
  const { _id } = useParams();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ProductDetails, setProductDetails] = useState({
    productDetails: "",
  });
  const [user_id, setUser_id] = useState(null);

  // checking if user logged or not  ++++++++++++++++++++++++++++++++
  const jwttoken = sessionStorage.getItem("jwttoken");

  useEffect(() => {
    async function test() {
      if (!jwttoken) {
        return;
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
        console.log("isTokenValid:- ", isTokenValid);
        isTokenValid && setUser_id(isTokenValid.data.userInfo._id);
        isTokenValid && setIsLoggedIn(true);
      } catch (error) {
        console.error("Error checking token validity:", error);
        setIsLoggedIn(false);
      }
    }

    test();
  }, [jwttoken]);

  

  // clicked product details fetching ++++++++++++++++++++++++++++++++

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ProductDetail URL ID: - ", _id);
        const result = await axios.get(`${serverUrl}/productID/${_id}`);
        setProductDetails(result.data.product[0]);
        console.log("ProductDetails:- ", result.data.product[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  // function triggers when we click add to cart ++++++++++++++++++++++++++++++++
  let count = 0;
  async function ClickAddToCart() {
    try {
      console.log("AddToCart clicked user_id:- ", user_id);
      count++;

      const obj = {
        productID: _id,
        quantity: count,
        ProductCompany: ProductDetails.Company,
        ProductModel: ProductDetails.Model,
        ProdectImage: ProductDetails.ProdectImage,
        Productprice: ProductDetails.Productprice,
        ProductColor: ProductDetails.ProductColor,
        ProductAvailable: ProductDetails.Available,
      };

      const idProductAdded = await axios.post(
        `${serverUrl}/addToCART/${user_id}`,
        obj
      );

      idProductAdded &&
        toast.success("Product added to cart", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    } catch (error) {
      console.log("ClickAddToCart:- ", error);
    }
  }

  return (
    <>
      <ToastContainer />

      <NavBar
        Login={!isLoggedIn && "Login"}
        Signup={!isLoggedIn && "Signup"}
        Logout={isLoggedIn && "Logout"}
      />
      <BannerAndCart
        ProductName={ProductDetails.Company}
        ProductModel={ProductDetails.Model}
        isLoggedIn={isLoggedIn ? "true" : "false"}
      />
      <BackToProductBUTTON />
      <h4 className="Productheadline">{ProductDetails.Productheadline}</h4>
      <div className="PhotoANDdetails">
        <div className="productPhoto">
          <img src={ProductDetails.ProdectImage} alt="ProdectImage" />
          <div className="ThreeIMG">
            <img src={ProductDetails.ProdectImage} alt="ProdectImage" />
            <img src={ProductDetails.ProdectImage} alt="ProdectImage" />
            <img src={ProductDetails.ProdectImage} alt="ProdectImage" />
          </div>
        </div>
        <div className="productdetails">
          <h3>
            {ProductDetails.Company} {ProductDetails.Model}
          </h3>
          <div className="RatingsIcon--div">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <p> (50 Customer reviews)</p>
          </div>

          <h3 className="price">Price - ₹ {ProductDetails.Productprice}</h3>
          <p className="ProductColor--name">
            {ProductDetails.ProductColor} | {ProductDetails.Heaadphonetype}
          </p>
          <p>About this item </p>
          <div className="Aboutitem">
            {ProductDetails.Aboutitem &&
              ProductDetails.Aboutitem.match(/-[^.]+\./g)
                .map((sentence) => ({
                  feature: sentence.trim(),
                }))
                .map((obj, i) => <li>{obj.feature}</li>)}
          </div>
          <div className="Available">
            <h4>Available - </h4>
            <p> {ProductDetails.Available}</p>
          </div>
          <div className="Brand">
            <h4>Brand - </h4>
            <p> {ProductDetails.Company}</p>
          </div>

          <div className="Button">
            {isLoggedIn ? (
              <>
                <button onClick={ClickAddToCart}>Add cart</button>
                <button>Buy Now</button>
              </>
            ) : (
              <button onClick={() => Navigate("/login")}>Login</button>
            )}
          </div>
        </div>
      </div>
      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  );
};

export default ProductDetail;
