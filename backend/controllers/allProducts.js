import AllProductModel from "../model/allProducts.js";
import "../db connection/mongoo.js";

const addAllProduct = async (req, res) => {
  try {
    const arr = req.body;
    // console.log(arr);
    arr.map(async (obj, index) => {
      await AllProductModel.create({
        ProdectImage: obj.ProdectImage,
        Company: obj.Company,
        Productprice: obj.Productprice,
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
export default addAllProduct;
