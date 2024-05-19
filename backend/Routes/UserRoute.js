import { Router } from "express";
import {
  forgotPassword,
  registerUser,
  loginUser,
  logoutUser,
  getUserDetail,
  updatePassword,
  updateUser,
  getAllUser,
  getSingleUser,
  Deleteuser,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/userDetails").get(isAuthenticatedUser, getUserDetail);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUser);
// router.route("/updateUserDetail").put(updateUserDetails);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), Deleteuser);

export { router };
