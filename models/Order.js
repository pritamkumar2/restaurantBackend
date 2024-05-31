import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userTable: { type: String },
    cartItems: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    name: { type: String },
    razorpayOrder: { type: String },
    phone: { type: String },

    status: {
      type: String,
      enum: ["pending", "success", "incomplete"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
