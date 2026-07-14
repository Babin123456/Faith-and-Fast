import express from "express";
import auth from "../middleware/auth.js";
import {
  cancelOrder,
  createOrder,
  deleteAllOrders,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrderStatus,
  uploadPaymentScreenshot,
  verifyPayment,
} from "../controllers/orderController.js";
import admin from "../middleware/Admin.js";
import upload from "../middleware/multer.js";
import { getOrderAnalytics } from "../controllers/analyticsController.js";
import { requirePermission } from "../middleware/permission.js";

const orderRouter = express.Router();

orderRouter.post("/create", auth, createOrder);

orderRouter.post(
  "/upload-payment-screenshot",
  auth,
  upload.single("screenshot"),
  uploadPaymentScreenshot
);

orderRouter.put(
  "/admin/verify-payment/:orderId",
  auth,
  requirePermission("orders:update"),
  verifyPayment
);

orderRouter.get("/myorder", auth, myOrders);

orderRouter.get("/get/admin", auth, admin, getAllOrders);

orderRouter.get("/admin/analytics", auth, admin, getOrderAnalytics);

orderRouter.get("/get/:orderId", auth, getSingleOrder);

orderRouter.put("/admin/update/:orderId", auth, requirePermission("orders:update"), updateOrderStatus);

orderRouter.put("/cancel/:orderId", auth, cancelOrder);

orderRouter.delete("/admin/delete/:orderId", auth, requirePermission("orders:update"), deleteOrder);

orderRouter.delete("/admin/delete-all", auth, requirePermission("orders:update"), deleteAllOrders);

export default orderRouter;
