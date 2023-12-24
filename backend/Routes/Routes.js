import express from "express";
import { signupRoute, loginRoute } from "../controllers/userController.js";
// import isAuthenticated from "../middlewares/jwt.js";
import { addAllProduct, getProduct } from "../controllers/allProducts.js";

const router = express.Router();

router.post("/login", loginRoute);

router.post("/signup", signupRoute);

// all product posing data route
router.post("/allproduct", addAllProduct);

// to get all products data
router.get("/getProduct", getProduct);

export default router;
