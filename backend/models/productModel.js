import mongoose from "mongoose";

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pleae enter correct product name"],
      trim: true,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    image: [
      {
        public_id: {
          type: String,
          requiredL: true,
        },
        url: {
          type: String,
          requiredL: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, "Pleae enter correct scedctiption name"],
    },
    // reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "Pleae enter correct price name"],
    },
    category: {
      type: String,
      required: true,
    },
    Stock: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
