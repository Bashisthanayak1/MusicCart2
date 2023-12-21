import express from "express";
import { signupRoute, loginRoute } from "../controllers/userController.js";
// import isAuthenticated from "../middlewares/jwt.js";
import addAllProduct from "../controllers/allProducts.js";

const router = express.Router();

router.post("/login", loginRoute);

router.post("/signup", signupRoute);

// all product data route
router.post("/allproduct", addAllProduct);

export default router;
