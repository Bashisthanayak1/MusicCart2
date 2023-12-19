import express from "express";
import { signupRoute, loginRoute } from "../controllers/userController.js";
const router = express.Router();

router.get("/login", loginRoute);
router.get("/signup", signupRoute);

export default router;
