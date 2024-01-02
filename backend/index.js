import express from "express";
import dotenv from "dotenv";
import router from "./Routes/Routes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json({ limit: "50mb" }));
// app.use(cors());
//to get details from frontend
app.use(
  cors({
    origin: ["*", "http://localhost:3000","https://music-cart-frontend-tmog.onrender.com"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(` app running on port ${PORT}!`));
