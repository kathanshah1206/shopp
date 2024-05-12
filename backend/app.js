import express, { json } from "express";
import cookieParser from "cookie-parser";
import { router as products } from "./Routes/ProductRoute.js";
import { router as user } from "./Routes/UserRoute.js";
import errorMiddleware from "./middleware/error.js";
const app = express();
app.use(json());
app.use(cookieParser());
app.use("/api/v1", products);
app.use("/api/v1", user);
//Middleware
app.use(errorMiddleware);
export { app };
