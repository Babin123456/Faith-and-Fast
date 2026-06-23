import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: [true, "Address is required"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity should be at least 1"],
        },
        price: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
        images: [
          {
            public_id: {
              type: String,
            },
            url: {
              type: String,
            },
          },
        ],
        selectedColor: {
          type: String,
          default: "",
        },
        selectedSize: {
          type: String,
          default: "",
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      default: "",
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE", "STRIPE"],
      default: "COD",
    },
    upiReference: {
      type: String,
      default: "",
    },
    paymentScreenshot: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    stripePaymentIntentId: {
      type: String,
      default: "",
    },
    paymentVerifiedAt: {
      type: Date,
    },
    paymentRejectionReason: {
      type: String,
      default: "",
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    orderHistory: {
      type: [
        {
          status: {
            type: String,
            enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
          },
          changedAt: {
            type: Date,
            default: Date.now,
          },
          changedBy: {
            type: String,
          },
          notes: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },
    deliveryDate: { type: String, default: "To be delivered" },
    trackingId: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  this.totalAmountWithGST = this.totalAmount + (this.gst || 0);
  this.totalAmountWithShipping = this.totalAmountWithGST + (this.shipping || 0);
  next();
});

orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
