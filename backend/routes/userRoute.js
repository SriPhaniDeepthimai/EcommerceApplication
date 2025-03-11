// import express from "express";
// import { loginUser,registerUser } from "../controllers/userController.js";

// const userRouter=express.Router()

// userRouter.post("/register",registerUser)
// userRouter.post("/login",loginUser)

// export default userRouter


import express from "express";
import { loginUser, registerUser, verifyOtp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOtp); // New route to verify OTP
userRouter.post("/login", loginUser);

export default userRouter;
;