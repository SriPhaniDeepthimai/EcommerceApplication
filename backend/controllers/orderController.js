// controllers/orderController.js
import OrderModel from "../models/orderModel.js";

const placeOrder = async (req, res) => {
  const {
    customerName,
    email,
    address,
    city,
    state,
    pinCode,
    country,
    phone,
    items,
    totalAmount,
    paymentMethod,
    razorpayPaymentId,
    razorpayOrderId,
  } = req.body;

  try {
    const newOrder = new OrderModel({
      customerName,
      email,
      address,
      city,
      state,
      pinCode,
      country,
      phone,
      items,
      totalAmount,
      paymentMethod,
      razorpayPaymentId: paymentMethod === "razorpay" ? razorpayPaymentId : undefined,
      razorpayOrderId: paymentMethod === "razorpay" ? razorpayOrderId : undefined,
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("items.foodId");
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

export { placeOrder, getAllOrders };
