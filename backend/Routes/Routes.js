import express from "express";
import {
  signupRoute,
  loginRoute,
  addToCart,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/jwt.js";
import { addAllProduct, getProduct, ById } from "../controllers/allProducts.js";

const router = express.Router();

router.post("/login", loginRoute);

router.post("/signup", signupRoute);

// all product posing data route
router.post("/allproduct", addAllProduct);

// to get all products data
router.get("/getProduct", getProduct);

// get product by id
router.get("/productID/:_id", ById);

// to add productsID in usercart
router.post("/addToCART/:userID", addToCart);

// checking if user logedin
router.post("/isAuthenticated", isAuthenticated);

export default router;
