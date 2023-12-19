import express from "express";
import "./db connection/mongoo.js";
import dotenv from "dotenv";
import router from "./Routes/userRoute.js";

const app = express();
dotenv.config();
app.use(router);
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(` app running on port ${PORT}!`));
