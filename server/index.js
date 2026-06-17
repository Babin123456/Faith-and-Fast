import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import errorMiddleware from "./middleware/error.js";
dotenv.config();

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2000,
  message: "Too many requests, please try again later.",
});

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_WWW_URL,
  "http://localhost:5173"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(limiter);
app.use(morgan("combined"));
app.use(errorMiddleware);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Server is running: " + PORT);
});

//routes
import addressRouter from "./route/addressRoute.js";
import cartRouter from "./route/cartRoute.js";
import categoryRouter from "./route/categoryRoute.js";
import discountRouter from "./route/discountRoutes.js";
import orderRouter from "./route/orderRoute.js";
import paymentSettingsRouter from "./route/paymentSettingsRoute.js";
import productRouter from "./route/productRoute.js";
import userRouter from "./route/userRoute.js";
import wishListRouter from "./route/wishListRoute.js";

app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use("/api/discount", discountRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment-settings", paymentSettingsRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlist", wishListRouter);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
