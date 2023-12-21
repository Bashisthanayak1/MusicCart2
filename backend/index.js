import express from "express";
import dotenv from "dotenv";
import router from "./Routes/Routes.js";
import cors from "cors"

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(` app running on port ${PORT}!`));
