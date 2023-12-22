import AllProductModel from "../model/allProducts.js";
import "../db connection/mongoo.js";

// Posting all products
const addAllProduct = async (req, res) => {
  try {
    const arr = req.body;
    // console.log(arr);
    arr.map(async (obj, index) => {
      await AllProductModel.create({
        ProdectImage: obj.ProdectImage,
        Company: obj.Company,
        Model: obj.Model,
        Productprice: obj.Productprice,
        ProductColor: obj.ProductColor,
        ProductColor: obj.ProductColor,
        Heaadphonetype: obj.Heaadphonetype,
      });
    });
    res.status(200).send({
      message: "all products data has been added",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "all products data has not been added",
    });
  }
};

// getting all products
const getAllProduct = async (req, res) => {
  try {
    const getdata = await AllProductModel.find();
    if (getdata) {
      res.status(200).send(getdata);
    } else {
      return res.status(400).send({
        message: "unable to get allproduct data",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({
      message: "api error cant get data ",
    });
  }
};

export { addAllProduct, getAllProduct };
