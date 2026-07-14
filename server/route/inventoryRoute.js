import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import { requirePermission } from "../middleware/permission.js";
import {
  getInventoryOverview,
  bulkUpdateStock,
} from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

// Admin-only inventory overview with health buckets and totals.
inventoryRouter.get("/overview", auth, admin, getInventoryOverview);

// Admin-only bulk stock update.
inventoryRouter.put("/bulk-update", auth, requirePermission("inventory:write"), bulkUpdateStock);

export default inventoryRouter;
