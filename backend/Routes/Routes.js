import express from "express";
import {
  signupRoute,
  loginRoute,
  addToCart,
  getUserDetails,
  updateQuantity,
  emptyCart,
  test
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/jwt.js";
import {
  filterProduct,
  productById,
} from "../controllers/allProducts.js";

const router = express.Router();

router.get("/", test);

router.post("/login", loginRoute);

router.post("/signup", signupRoute);



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

// geting user by id and updating its cart item Quentity
router.patch("/UpdateQuantity/:_id", updateQuantity);

// removing all items in user cart
router.patch("/emptyCart/:_id", emptyCart);

export default router;
