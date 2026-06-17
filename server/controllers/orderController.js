import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";
import sendEmail from "../config/sendEmail.js";
import generateReceiptHTML from "../utils/generateReceipt.js";

export const createOrder = catchAsyncErrors(async (req, res) => {
  try {
    const {
      userId,
      addressId,
      products,
      paymentMethod,
      totalAmount,
      couponCode,
      discountAmount,
    } = req.body;

    let { deliveryDate } = req.body;

    const createdAt = new Date();
    deliveryDate = new Date(createdAt);
    deliveryDate.setDate(createdAt.getDate() + 5);
    const newOrder = new OrderModel({
      user: userId,
      address: addressId,
      products,
      totalAmount,
      couponCode: couponCode || "",
      discountAmount: discountAmount || 0,
      paymentMethod,
      orderStatus: "PENDING",
      paymentStatus: "PENDING",
      deliveryDate,
    });

    await newOrder.save();

    const populatedOrder = await OrderModel.findById(newOrder._id)
      .populate("user", "name email")
      .populate("products.product", "name price images");

    const receiptHTML = generateReceiptHTML(populatedOrder);
    const user = await UserModel.findById(userId);

    sendEmail({
      sendTo: user.email,
      subject: "Order Confirmation",
      html: receiptHTML,
    });

    res.status(201).json({ success: true, order: populatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const getSingleOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId)
      .populate("user", "name email")
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name price images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const myOrders = catchAsyncErrors(async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await OrderModel.find({ user: userId })
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name price images")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin
export const getAllOrders = catchAsyncErrors(async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name email")
      .populate("address", "address_line city pincode state country mobile")
      .populate("products.product", "name price images")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Admin
export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, trackingId, notes, deliveryDate } = req.body;
    const adminId =
      req.user && req.user._id ? req.user._id.toString() : "Unknown";

    console.log("Request Body:", req.body);

    const validStatuses = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;
    if (trackingId) order.trackingId = trackingId;

    if (orderStatus === "DELIVERED") {
      order.deliveryDate = new Date();
    } else if (deliveryDate) {
      order.deliveryDate = new Date(deliveryDate);
    }

    order.orderHistory.push({
      status: orderStatus,
      changedAt: new Date(),
      changedBy: adminId.toString(),
      notes: notes || "",
    });

    if (orderStatus === "SHIPPED") {
      for (const item of order.products) {
        await updateStock(item.product, item.quantity);
      }
    }

    await order.save();
    console.log("Updated Order:", order);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

async function updateStock(productId, quantity) {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  if (product.stock < quantity) {
    throw new Error(`Insufficient stock for product ${productId}`);
  }

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

export const cancelOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await OrderModel.findById(orderId)
      .populate("products.product")
      .populate("user");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    if (
      order.user._id.toString() !== userId.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this order",
      });
    }

    if (order.orderStatus === "SHIPPED" || order.orderStatus === "DELIVERED") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an order that is already shipped or delivered",
      });
    }

    order.orderStatus = "CANCELLED";

    for (const item of order.products) {
      await updateCancelStock(item.product._id, item.quantity);
    }

    order.orderHistory.push({
      status: "CANCELLED",
      changedAt: new Date(),
      changedBy: userId.toString(),
      notes: "Order cancelled by user",
    });

    await order.save();

    const emailSent = await sendEmail({
      sendTo: order.user.email,
      subject: "Your Order Has Been Cancelled - Faith AND Fast",
      html: `
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333;">
                <div style="background-color: #fff; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #e91e63; text-align: center;">Order Cancellation Confirmation</h2>
                  <p style="font-size: 16px;">Dear ${order.user.name},</p>
                  <p style="font-size: 16px;">We are writing to confirm that your order <strong>#${
                    order._id
                  }</strong> has been successfully cancelled.</p>
                  <p style="font-size: 16px;">Here are the details of your order:</p>
                  <ul style="font-size: 16px;">
                    ${order.products
                      .map(
                        (item) =>
                          `<li><strong>Product:</strong> ${item.product.name} | <strong>Quantity:</strong> ${item.quantity}</li>`
                      )
                      .join("")}
                  </ul>
                  <p style="font-size: 16px;"><strong>Order Created:</strong> ${
                    order.createdAt
                  }</p>
                  <p style="font-size: 16px;">If you have any concerns or questions, feel free to contact our support team at <strong>support@faithandfast.com</strong>.</p>
                  <p style="font-size: 16px; text-align: center;">
                    <a href="https://www.faithandfast.com" style="color: #fff; background-color: #e91e63; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Visit Faith AND Fast</a>
                  </p>
                  <p style="font-size: 16px; text-align: center;">Best regards,<br>Faith AND Fast Team</p>
                </div>
              </body>
            </html>
          `,
    });

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      emailSent,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

async function updateCancelStock(productId, quantity) {
  const product = await ProductModel.findById(productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  product.stock += quantity;

  await product.save({ validateBeforeSave: false });
}

export const deleteOrder = catchAsyncErrors(async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId).populate(
      "products.product"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (req.user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this order",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export const deleteAllOrders = catchAsyncErrors(async (req, res) => {
  try {
    await OrderModel.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All orders deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});