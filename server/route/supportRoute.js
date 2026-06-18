import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
import {
  submitContactMessage,
  getContactMessages,
} from "../controllers/contactController.js";

const supportRouter = express.Router();

// Public — anyone (logged in or not) can submit a support message.
supportRouter.post("/contact", submitContactMessage);

// Admin — list submitted support messages.
supportRouter.get("/contact", auth, admin, getContactMessages);

export default supportRouter;
