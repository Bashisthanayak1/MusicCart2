import React, { useState } from "react";
import NavWithoutLogin from "../../components/NavWithoutLogin/navWithoutLogin";
import BannerLogo from "../../components/bannerAndLogo/bannerLogo";
import "./home.css";
import searchicon from "../../assets/images/searchicon.png";
import GridBLACK from "../../assets/images/gridBLACK.png";
import GridWHITE from "../../assets/images/gridWHITE.png";
import LineWHITE from "../../assets/images//lineWHITE.png";
import LineBLACK from "../../assets/images/lineBLACK.png";
const img =
  "data:image/webp;base64,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";
const Home = () => {
  const [gridBLACK, setGridImage] = useState(true);
  const [lineWHITE, setLineImage] = useState(true);

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

  return (
    <>
      <NavWithoutLogin />
      <BannerLogo />

      <div className="search--div">
        <img src={searchicon} className="searchicon" alt="searchicon" />
        <input type="search" name="" id="" placeholder="Search Product" />{" "}
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
        <div className="Asingle--Product--div">
          <div className="blueColor">
            <img src={img} alt="" srcset="" />
          </div>
          <p className="productName--model">
            <span className="productName">boAt</span>
            <span className="model">Rockerz 551 ANC</span>
          </p>
          <p className="price">
            Price- ₹<span>3,000</span>
          </p>
          <p className="color--and--type">
            <span className="color">Blue</span>
            <span className="color">| On-ear headphone</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
