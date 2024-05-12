import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = Router();

router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/products/new").post(createProduct);
router
  .route("/products/:id")
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);
export { router };
