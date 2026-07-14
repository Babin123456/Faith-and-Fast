import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import { requirePermission } from "../middleware/permission.js";
import {
  createDiscount,
  applyDiscount,
  getAllDiscounts,
  deleteDiscount,
  updateDiscount,
} from "../controllers/discountController.js";

const router = express.Router();

router.post("/create", auth, requirePermission("discounts:write"), createDiscount);
router.post("/apply", applyDiscount); // user apply is public
router.get("/all", auth, admin, getAllDiscounts);
router.put("/update/:discountId", auth, requirePermission("discounts:write"), updateDiscount);
router.delete("/delete/:discountId", auth, requirePermission("discounts:write"), deleteDiscount);

export default router;
