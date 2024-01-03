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
    origin: ["*"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(router);
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(` app running on port ${PORT}!`));