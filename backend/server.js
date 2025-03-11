
// import express from "express";

// import cors from 'cors';
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import cartRouter from "./routes/cartRoute.js"; // Import delivery agent routes

// // import paymentRoute from './routes/paymentRoute.js';
// import 'dotenv/config';

// import dotenv from 'dotenv';
// import router from "./routes/deliveryAgent.js";
// import OrderRouter from "./routes/orderRoute.js";
// dotenv.config();


// // App configuration 
// const app = express();
// const port = 4000;


// // Middleware 
// app.use(express.json());
// app.use(cors());

// // Database connection
// connectDB();

// // API endpoints 
// app.use("/api/food", foodRouter);
// app.use("/images", express.static('uploads'));
// app.use("/api/order", OrderRouter);
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/DeliveryAgent", router); // Add delivery agent routes here
// app.use("/photos", express.static('uploads'));
// // app.use('/api/payment',paymentRoute);

// app.get('/', (req, res) => {
//     res.send("It's working");
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is listening at port number ${port}`);
// });


import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"; 
import OrderRouter from "./routes/orderRoute.js";
import deliveryAgentRouter from "./routes/deliveryAgent.js"; 
import paymentRouter from "./routes/paymentRoute.js"; 
import dotenv from "dotenv";
import Razorpay from "razorpay"; // Import Razorpay

dotenv.config();

// App configuration 
const app = express();
const port = 4000;

// Middleware 
app.use(express.json());
app.use(cors());

// Database connection
connectDB();



app.use((req, res, next) => {
  req.razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  next();
});

// API endpoints 
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/order", OrderRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/deliveryAgent", deliveryAgentRouter); 
app.use("/photos", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("It's working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at port number ${port}`);
});
