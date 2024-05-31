import { Router } from "express";
import { newOrder, getAllorders } from "../controllers/orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = Router();
router.route("/createOrder").post(isAuthenticatedUser, newOrder);
router.route("/getAllOrders").get(getAllorders);
export { router };
