// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "razorpay"],
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: function () {
      return this.paymentMethod === "razorpay";
    },
  },
  razorpayOrderId: {
    type: String,
    required: function () {
      return this.paymentMethod === "razorpay";
    },
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default OrderModel;
