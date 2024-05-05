import express, { json } from "express";
import { router as products } from "./Routes/ProductRoute.js";
import errorMiddleware from "./middleware/error.js";
const app = express();
app.use(json());
app.use("/api/v1", products);
//Middleware
app.use(errorMiddleware);
export { app };
