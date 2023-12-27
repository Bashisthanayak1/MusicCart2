import React from "react";
import "./backToProduct.css";
import { Link } from "react-router-dom";
const backToProduct = () => {
  return (
    <>
      <button className="Back--to--products">
        {" "}
        <Link to="/home" className="Link">
          Back to products
        </Link>{" "}
      </button>
    </>
  );
};

export default backToProduct;
