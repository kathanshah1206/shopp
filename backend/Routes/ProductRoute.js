import { Router } from "express";
import { getAllProducts } from "../controllers/productController.js";
const router = Router();

router.route("/products").get(getAllProducts);
export { router };
