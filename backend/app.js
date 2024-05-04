import express, { json } from "express";
import { router as products } from "./Routes/ProductRoute.js";
const app = express();
app.use(json());
app.use("/api/v1", products);

export { app };
