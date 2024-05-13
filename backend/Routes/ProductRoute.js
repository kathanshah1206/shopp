import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = Router();

router.route("/products").get(getAllProducts);
// .get(isAuthenticatedUser, authorizeRoles("user"), getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/products/:id")
  .get(getProductDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
export { router };
