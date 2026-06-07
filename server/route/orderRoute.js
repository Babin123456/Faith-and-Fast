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
} from "../controllers/orderController.js";
import admin from "../middleware/Admin.js";
import { getOrderAnalytics } from "../controllers/analyticsController.js";

const orderRouter = express.Router();

orderRouter.post("/create", auth, createOrder);

orderRouter.get("/myorder", auth, myOrders);

orderRouter.get("/get/admin", auth, admin, getAllOrders);

orderRouter.get("/admin/analytics", auth, admin, getOrderAnalytics);

orderRouter.get("/get/:orderId", auth, getSingleOrder);

orderRouter.put("/admin/update/:orderId", auth, admin, updateOrderStatus);

orderRouter.put("/cancel/:orderId", auth, cancelOrder);

orderRouter.delete("/admin/delete/:orderId", auth, admin, deleteOrder);

orderRouter.delete("/admin/delete-all", deleteAllOrders);

export default orderRouter;
