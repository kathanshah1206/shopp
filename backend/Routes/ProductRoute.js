import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
const router = Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router
  .route("/products/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);
export { router };
