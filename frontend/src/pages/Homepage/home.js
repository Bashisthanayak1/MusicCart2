import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/navbar.js";
import BannerAndCart from "../../components/LogoAndcart/LogoAndCart.js";
import searchicon from "../../assets/images/searchicon.png";
import GridBLACK from "../../assets/images/gridBLACK.png";
import GridWHITE from "../../assets/images/gridWHITE.png";
import LineWHITE from "../../assets/images//lineWHITE.png";
import LineBLACK from "../../assets/images/lineBLACK.png";
import axios from "axios";
import serverUrl from "../../config.js";
import footerWEB from "../../assets/images/footerWEB.png";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/images/homePageBanner.png";
import { ToastContainer, toast } from "react-toastify";
import "./home.css";

const Home = () => {
  const Navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gridBLACK, setGridImage] = useState(true);
  const [lineWHITE, setLineImage] = useState(true);
  const [AllData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState({
    Select_Headphone_Type: "",
    Company: "",
    Colour: "",
    Price: "",
    Sort_by: "",
  });

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
        isTokenValid && setIsLoggedIn(true);
      } catch (error) {
        console.error("Error checking token validity:", error);
        setIsLoggedIn(false);
      }
    }

    test();
  }, [jwttoken]);

  // Create a ref for the input element ++++++++++++++++++++++++++++++++
  const inputRef = useRef();

  // +++++++++++++++++++++++++++++++++++++++++++++++++
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

  // get all product data  +++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    // Fetch all product data when the component mounts
    const fetchData = async () => {
      try {
        const result = await axios.get(`${serverUrl}/getProduct`);
        setAllData(result.data);
        // console.log("Getdata-", result.data);
      } catch (error) {
        console.log("Getdata error:- ", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  /// Function to fetch data based on search input+++++++++++++++++++++++++++++
  const getData = async (input) => {
    try {
      const result = await axios.get(`${serverUrl}/getProduct`, {
        params: { all: input },
      });
      setAllData(result.data);
      console.log("getData-", result.data);
    } catch (error) {
      console.log("getData error:- ", error);
    }
  };

  // Function triggers when the form is submitted+++++++++++++++++++++++++++++
  const SubmitForm = (event) => {
    event.preventDefault();
    let inputValue = inputRef.current.value;
    console.log("inputValue:-", inputValue);
    getData({ Company: inputValue });
    console.log("SubmitForm", inputValue);
    inputRef.current.value = "";
  };

  // Function triggers when filters are selected+++++++++++++++++++++++++++++
  const SelectFilters = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilteredData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Log the filteredData when it changes +++++++++++++++++++++++++++++
  useEffect(() => {
    if (
      filteredData.Select_Headphone_Type !== "" ||
      filteredData.Company !== "" ||
      filteredData.Colour !== "" ||
      filteredData.Price !== "" ||
      filteredData.Sort_by !== ""
    ) {
      console.log("filteredData:- ", filteredData);
      getData(filteredData);
    }
  }, [filteredData]);

  // function triggers when we click on a product +++++++++++++++++++++++++++++
  function clickAproduct(_id) {
    Navigate(`/productDetail/${_id}`);
  }

  // click AddToCart +++++++++++++++++++++++++++++
  function AddToCart(event) {
    event.stopPropagation();
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
  }
  // =========================================== END ==================================================>

  return (
    <>
      <ToastContainer />
      <NavBar
        Login={!isLoggedIn && "Login"}
        Signup={!isLoggedIn && "Signup"}
        Logout={isLoggedIn && "Logout"}
      />
      <BannerAndCart isLoggedIn={isLoggedIn ? "true" : "false"} />

      <div className="banner">
        <img src={Banner} alt="banner" />
      </div>

      <div className="search--div">
        <img src={searchicon} className="searchicon" alt="searchicon" />
        <form action="" onSubmit={SubmitForm}>
          {" "}
          <input
            type="search"
            name="search"
            placeholder="Search Product"
            ref={inputRef}
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
          <select
            name="Select_Headphone_Type"
            value={filteredData.Select_Headphone_Type}
            onChange={SelectFilters}
          >
            <option value="featured" disabled>
              Featured
            </option>
            <option selected>Select Headphone Type</option>
            <option value="In-ear headphone">In-ear headphone</option>
            <option value="On-ear headphone">On-ear headphone</option>
            <option value="Over-ear headphone">Over-ear headphone</option>
          </select>
        </div>
        <div className="Company">
          <select
            name="Company"
            value={filteredData.Company}
            onChange={SelectFilters}
          >
            <option value="featured" disabled>
              Featured
            </option>
            <option value="">Company</option>
            <option value="JBL">JBL</option>
            <option value="Sony">Sony</option>
            <option value="Boat">Boat</option>
            <option value="Zebronics">Zebronics</option>
            <option value="Marshall">Marshall</option>
            <option value="Ptron">Ptron</option>
          </select>
        </div>
        <div className="Colour">
          <select
            name="Colour"
            value={filteredData.Colour}
            onChange={SelectFilters}
          >
            <option value="featured" disabled>
              Featured
            </option>
            <option selected>Colour</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Brown">Brown</option>
          </select>
        </div>
        <div className="Price">
          <select
            name="Price"
            value={filteredData.Price}
            onChange={SelectFilters}
          >
            <option value="featured" disabled>
              Featured
            </option>
            <option selected>Price</option>
            <option value="0-1000">₹0 - ₹1,000</option>
            <option value="1000-10000">₹1,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
          </select>
        </div>
        <div className="Sort">
          <select
            name="Sort_by"
            value={filteredData.Sort_by}
            onChange={SelectFilters}
          >
            <option value="featured" disabled>
              Featured
            </option>
            <option selected>Sort by : Feature</option>
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
          </select>
        </div>
      </div>
      <div className="allProduct--container">
        <div
          className={
            gridBLACK ? "allProduct--container--Child" : "LineView--Activate"
          }
        >
          {AllData.map((obj, i) => (
            <>
              <d
                iv
                className="Asingle--Product--div"
                key={obj._id}
                storekey={obj._id}
                onClick={() => clickAproduct(obj._id)}
              >
                <div className="blueColor" key={obj._id}>
                  <img src={obj.ProdectImage} alt="productImg" />
                  <div
                    className="cartDIV"
                    style={{ display: !isLoggedIn && "none" }}
                  >
                    <i
                      className="fa-solid fa-cart-plus"
                      onClick={AddToCart}
                    ></i>
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
                  <p className="HeadLine">{obj.Productheadline}</p>
                  <button className="Details">Details</button>
                </div>
              </d>
            </>
          ))}
        </div>
      </div>

      <img src={footerWEB} alt="footerWEB" className="footerWEB--IMAGE" />
    </>
  );
};

export default Home;
