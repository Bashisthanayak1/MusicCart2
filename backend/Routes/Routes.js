import express from "express";
import {
  signupRoute,
  loginRoute,
  addToCart,
  getUserDetails
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/jwt.js";
import {
  addAllProduct,
  filterProduct,
  productById,
} from "../controllers/allProducts.js";

const router = express.Router();

router.post("/login", loginRoute);

router.post("/signup", signupRoute);

// all product posing data route
router.post("/allproduct", addAllProduct);

// to get all products data
router.get("/getProduct", filterProduct);



// to add productsID in usercart
router.post("/addToCART/:userID", addToCart);

// checking if user logedin
router.post("/isAuthenticated", isAuthenticated);
// get product by id
router.get("/productID/:_id", productById);

// getting user by a user_id
router.get("/UserDetails/:_id", getUserDetails);


export default router;
