import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resendOtp,
  resetPassword,
  updateUserDetails,
  updateUserRole,
  updateUserStatus,
  uploadAvatar,
  verifyEmailOtp,
  verifyOtp,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import admin from "../middleware/Admin.js";
import authRateLimiter from "../middleware/authRateLimiter.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/verify-email", verifyEmailOtp);

userRouter.post("/resend-otp", resendOtp);

userRouter.post("/login", authRateLimiter, loginUser);

userRouter.get("/logout", logoutUser);

userRouter.put("/upload-avatar", upload.single("avatar"), auth, uploadAvatar);

userRouter.put("/forgot-password", authRateLimiter, forgotPassword);

userRouter.put("/verify-otp", authRateLimiter, verifyOtp);

userRouter.put("/reset-password", authRateLimiter, resetPassword);

userRouter.get("/me", auth, getUserDetails);

userRouter.put(
  "/update-user",
  auth,
  upload.single("avatar"),
  updateUserDetails
);

userRouter.get("/admin/get", auth, admin, getAllUsers);

userRouter.get("/admin/get/:id", auth, admin, getSingleUser);

userRouter.put("/admin/update", auth, admin, updateUserRole);

userRouter.delete("/admin/delete/:id", auth, admin, deleteUser);

userRouter.patch("/admin/:id/status", auth, admin, updateUserStatus);

export default userRouter;
