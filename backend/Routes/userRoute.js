import express from "express";
import { signupRoute, loginRoute } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/jwt.js";

const router = express.Router();

router.post("/login", loginRoute);

router.post("/signup", signupRoute);

export default router;
