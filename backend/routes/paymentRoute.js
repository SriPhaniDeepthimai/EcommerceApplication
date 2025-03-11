import express from "express";
import Razorpay from "razorpay";

import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const paymentRouter = express.Router();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create a Razorpay order
paymentRouter.post("/payment/", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // Amount in paise
    currency: "INR",
    receipt: "receipt_order_74394", // Optional receipt ID
  };

  try {
    const order = await req.razorpay.orders.create(options);
    res.json({ key: process.env.RAZORPAY_KEY_ID, orderId: order.id });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send("Error creating Razorpay order");
  }
});

export default paymentRouter;
