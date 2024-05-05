import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/productController.js";
const router = Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
export { router };
