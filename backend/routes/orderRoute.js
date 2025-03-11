
import express from "express";
import { placeOrder, getAllOrders } from "../controllers/orderController.js";
import Razorpay from "razorpay"; // Import Razorpay

const OrderRouter = express.Router();


OrderRouter.post("/placeorder", placeOrder);
OrderRouter.get("/fetchorder", getAllOrders);

export default OrderRouter;
