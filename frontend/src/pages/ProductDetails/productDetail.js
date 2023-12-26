import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/navbar";
import BannerAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import BackToProductBUTTON from "../../assets/baackToProducts  Button/backToProduct.js";
import footerWEB from "../../assets/images/footerWEB.png";

import "./productDetails.css";

const ProductDetail = () => {
  //acessing the id we are getting from URL(from homepage product)
  const { _id } = useParams();

  const [ProductDetails, setProductDetails] = useState({
    productDetails: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ProductDetail URL ID: - ", _id);
        const result = await axios.get(
          `http://localhost:7000/productID/${_id}`
        );
        setProductDetails(result.data.product[0]);
        console.log(result.data.product[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <>
      <NavBar Logout={"Logout"} />
      <BannerAndCart
        ProductName={ProductDetails.Company}
        ProductModel={ProductDetails.Model}
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
            <button>Add cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  );
};

export default ProductDetail;
