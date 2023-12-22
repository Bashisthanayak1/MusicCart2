import React, { useEffect, useState } from "react";
import NavWithoutLogin from "../../components/NavWithoutLogin/navWithoutLogin";
import BannerLogo from "../../components/bannerAndLogo/bannerLogo";
import "./home.css";
import searchicon from "../../assets/images/searchicon.png";
import GridBLACK from "../../assets/images/gridBLACK.png";
import GridWHITE from "../../assets/images/gridWHITE.png";
import LineWHITE from "../../assets/images//lineWHITE.png";
import LineBLACK from "../../assets/images/lineBLACK.png";
import axios from "axios";
import serverUrl from "../../config.js";
import footerWEB from "../../assets/images/footerWEB.png";

// const img =
//   "data:image/jpeg;base64,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";
const Home = () => {
  const [gridBLACK, setGridImage] = useState(true);
  const [lineWHITE, setLineImage] = useState(true);
  const [allData, setAllData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function clickGrid() {
    console.log("grid clicked");
    setGridImage((pre) => !pre);
    setLineImage((pre) => !pre);
  }
  function clickLine() {
    console.log("line clicked");
    setLineImage((pre) => !pre);
    setGridImage((pre) => !pre);
  }
  // get all product data
  useEffect(() => {
    async function getdata() {
      try {
        const result = await axios.get(`${serverUrl}/allproduct`);
        setAllData(result.data);
        console.log("result", result.data);
      } catch (error) {
        console.log("getdata error:- ", error);
      }
    }
    getdata();
  }, []);

  // search input onchange function
  function submitSearch(event) {
    event.preventDefault();
    console.log(searchValue);
  }
  return (
    <>
      <NavWithoutLogin />
      <BannerLogo />

      <div className="search--div">
        <img src={searchicon} className="searchicon" alt="searchicon" />
        <form action="" onSubmit={submitSearch}>
          {" "}
          <input
            type="search"
            name="search"
            placeholder="Search Product"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </form>
      </div>

      <div className="filtersANDSortings">
        <div>
          <img
            src={gridBLACK ? GridBLACK : GridWHITE}
            alt="GridBLACK"
            onClick={clickGrid}
          />
        </div>
        <div>
          <img
            src={lineWHITE ? LineWHITE : LineBLACK}
            alt="LineWHITE"
            onClick={clickLine}
          />
        </div>
        <div className="Headphone--type">
          <select name="" id="">
            <option value="" disabled selected hidden>
              Select Headphone Type
            </option>
            <optgroup>
              <option value="featured">Featured</option>
              <option value="in-ear">In-ear headphone</option>
              <option value="on-ear">On-ear headphone</option>
              <option value="over-ear">Over-ear headphone</option>
            </optgroup>
          </select>
        </div>
        <div className="Company">
          <select name="" id="">
            <option value="" disabled selected hidden>
              Company
            </option>
            <optgroup>
              <option value="featured" disabled>
                Featured
              </option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Beat">Beat</option>
              <option value="Zebronics">Zebronics</option>
              <option value="Marshall">Marshall</option>
              <option value="Ptron">Ptron</option>
            </optgroup>
          </select>
        </div>
        <div className="Colour">
          <select name="" id="">
            <option value="" disabled selected hidden>
              Colour
            </option>
            <optgroup>
              <option value="featured" disabled>
                Featured
              </option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </optgroup>
          </select>
        </div>
        <div className="Price">
          <select name="" id="">
            <option value="" disabled selected hidden>
              Price
            </option>
            <optgroup>
              <option value="featured" disabled>
                Featured
              </option>
              <option value="0-100">₹0 - ₹1,000</option>
              <option value="1000-10000">₹1,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
            </optgroup>
          </select>
        </div>
        <div className="Sort">
          <select name="" id="">
            <option value="" disabled selected hidden>
              Sort by : Feature
            </option>
            <optgroup>
              <option value="featured" disabled>
                Featured
              </option>
              <option value="Lowest">
                <span>Price: </span> Lowest
              </option>
              <option value="Highest">
                <span>Price: </span>Highest
              </option>
              <option value="A-Z">
                <span>Name:</span>(A-Z)
              </option>
              <option value="Z-A">
                <span>Name:</span>(Z-A)
              </option>
            </optgroup>
          </select>
        </div>
      </div>
      <div className="allProduct--container">
        <div
          className={
            gridBLACK ? "allProduct--container--Child" : "LineView--Activate"
          }
        >
          {allData.map((obj, i) => (
            <>
              <div className="Asingle--Product--div" key={obj._id}>
                <div className="blueColor" key={obj._id}>
                  <img src={obj.ProdectImage} alt="productImg" />
                  <div className="cartDIV" style={{ display: "none" }}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </div>
                <div className="productDetails" key={i}>
                  <p className="productName--model">
                    <span className="productName">{obj.Company}</span>
                    <span className="model"> {obj.Model} </span>
                  </p>
                  <p className="price">
                    Price- ₹<span> {obj.Productprice}</span>
                  </p>
                  <p className="color--and--type">
                    <span className="color">{obj.ProductColor} </span>
                    <span className="color">| {obj.Heaadphonetype}</span>
                  </p>
                  <button className="Details">Details</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="footerWEB ">
        <img src={footerWEB} alt="footerWEB" />
      </div>
    </>
  );
};

export default Home;
