import mongoose from "mongoose";


const productScehma = new mongoose.Schema({
  ProdectImage: { type: String },
  Company: { type: String },
  Productprice: { type: Number },
  Heaadphonetype: { type: String },
});

const ProductModel = mongoose.model("allproducts", productScehma);
export default ProductModel;