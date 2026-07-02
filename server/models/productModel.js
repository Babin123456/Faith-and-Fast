import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please specify the target category for the product"],
    },
    subcategory: {
      type: String,
    },
    // color: {
    //   type: [String],
    //   required: [true, "Please specify the target color for the product"],
    // },
    coloroptions: {
      type: [String],
      default: [],
    },
    size: {
      type: [String],
      required: [true, "Please specify the target size for the product"],
    },
    sizeoptions: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
          name: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

productSchema.index(
  { name: "text", description: "text" },
  { weights: { name: 10, description: 5 } }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
