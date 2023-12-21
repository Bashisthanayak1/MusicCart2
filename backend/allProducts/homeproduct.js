import mongoose from "mongoose";
import AllProducts from "./productsData.js";
import "../db connection/mongoo.js";

const productScehma = new mongoose.Schema({
  ProdectImage: { type: String },
  Company: { type: String },
  Productprice: { type: Number },
  Heaadphonetype: { type: String },
});

const ProductModel = mongoose.model("allproducts", productScehma);

