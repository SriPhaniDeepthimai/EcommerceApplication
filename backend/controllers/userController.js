// // import userModel from "../models/userModel.js";
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcrypt";
// // import validator from "validator";

// // //login user 
// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.json({ success: false, message: "User not exists!" });
// //     }
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.json({ success: false, message: "Invalid credentials!" });
// //     }

// //     const token = createToken(user._id);
// //     res.json({ success: true, token });
// //   } catch (error) {
// //     console.log(error);
// //     return res.json({ success: false, message: "Error!" });
// //   }
// // };

// // const createToken = (userId) => {
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
// // };

// // //register user
// // const registerUser = async (req, res) => {
// //   const { name, password, email } = req.body;
// //   try {
// //     //checking with existing email user
// //     const exists = await userModel.findOne({ email });
// //     if (exists) {
// //       return res.json({ success: false, message: "User already exists!" });
// //     }

// //     // validating email formatting and strong password
// //     if (!validator.isEmail(email)) {
// //       return res.json({ success: false, message: "Enter Email in correct Format!" });
// //     }

// //     //check password 
// //     if (password.length < 8) {
// //       return res.json({ success: false, message: "Password is too short!" });
// //     }

// //     //hash user password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashPassword = await bcrypt.hash(password, salt);

// //     const newUser = new userModel({
// //       name: name,
// //       email: email,
// //       password: hashPassword
// //     });
// //     const user = await newUser.save();

// //     const token = createToken(user._id);
// //     res.json({ success: true, token });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error!" });
// //   }
// // };

// // export { loginUser, registerUser };





// // import userModel from "../models/userModel.js";
// // import Otp from "../models/Otp.js"; // You'll need a model for storing OTPs
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcrypt";
// // import validator from "validator";
// // import nodemailer from "nodemailer";
// // import crypto from "crypto";

// // // Email transporter setup using nodemailer
// // const transporter = nodemailer.createTransport({
// //   service: 'Gmail',
// //   auth: {
// //     user: process.env.EMAIL_USER, // Your Gmail account
// //     pass: process.env.EMAIL_PASS  // App password generated from Google
// //   }
// // });

// // // Helper function to create a JWT token
// // const createToken = (userId) => {
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
// // };

// // // Register user and send OTP
// // const registerUser = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     // Check if user already exists
// //     const exists = await userModel.findOne({ email });
// //     if (exists) {
// //       return res.json({ success: false, message: "User already exists!" });
// //     }

// //     // Validate email and password
// //     if (!validator.isEmail(email)) {
// //       return res.json({ success: false, message: "Enter a valid email format!" });
// //     }
// //     if (password.length < 8) {
// //       return res.json({ success: false, message: "Password is too short!" });
// //     }

// //     // Hash the password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashPassword = await bcrypt.hash(password, salt);

// //     // Generate OTP
// //     const otp = crypto.randomInt(100000, 999999).toString();

// //     // Save OTP in the database with an expiry of 5 minutes
// //     await Otp.findOneAndUpdate(
// //       { email },
// //       { otp, expiration: Date.now() + 5 * 60000 }, // OTP expires in 5 minutes
// //       { upsert: true, new: true }
// //     );

// //     // Send OTP email
// //     const mailOptions = {
// //       from: process.env.EMAIL_USER,
// //       to: email,
// //       subject: 'Your OTP for Email Verification',
// //       text: `Your OTP is ${otp}. It will expire in 5 minutes.`
// //     };

// //     await transporter.sendMail(mailOptions);

// //     // Save user temporarily, waiting for OTP verification
// //     const newUser = new userModel({
// //       name: name,
// //       email: email,
// //       password: hashPassword,
// //       isVerified: false // User is not verified yet
// //     });
// //     await newUser.save();

// //     res.json({ success: true, message: "OTP sent to your email. Verify to complete registration." });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error occurred during registration." });
// //   }
// // };

// // // Verify OTP and complete registration
// // const verifyOtp = async (req, res) => {
// //   const { email, otp } = req.body;

// //   try {
// //     const otpEntry = await Otp.findOne({ email });
// //     if (!otpEntry || otpEntry.otp !== otp || otpEntry.expiration < Date.now()) {
// //       return res.json({ success: false, message: "Invalid or expired OTP!" });
// //     }

// //     // OTP is valid, update user to verified
// //     await userModel.findOneAndUpdate({ email }, { isVerified: true });

// //     // Remove OTP entry
// //     await Otp.deleteOne({ email });

// //     res.json({ success: true, message: "OTP verified. You can now log in." });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error occurred during OTP verification." });
// //   }
// // };

// // // User login
// // const loginUser = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await userModel.findOne({ email });
// //     if (!user) {
// //       return res.json({ success: false, message: "User does not exist!" });
// //     }

// //     // Check if the user is verified
// //     if (!user.isVerified) {
// //       return res.json({ success: false, message: "Please verify your email before logging in." });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.json({ success: false, message: "Invalid credentials!" });
// //     }

// //     const token = createToken(user._id);
// //     res.json({ success: true, token });
// //   } catch (error) {
// //     console.log(error);
// //     return res.json({ success: false, message: "Error!" });
// //   }
// // };

// // export { loginUser, registerUser, verifyOtp };


// import userModel from "../models/userModel.js";
// import Otp from "../models/Otp.js"; // You'll need a model for storing OTPs
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import nodemailer from "nodemailer";
// import dotenv from 'dotenv';


// import crypto from "crypto";

// dotenv.config(); // Load environment variables from .env file

// // Email transporter setup using nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail account
//     pass: process.env.EMAIL_PASS  // App password generated from Google
//   }
// });

// // Test the transporter by sending a test email
// const testMailOptions = {
//   from: process.env.EMAIL_USER,
//   to: 'sivapeketi176@gmail.com', // Replace with an actual recipient
//   subject: 'Test Email',
//   text: 'This is a test email to check if Nodemailer is working.'
// };

// transporter.sendMail(testMailOptions)
//   .then(() => {
//     console.log("Test email sent successfully");
//   })
//   .catch((error) => {
//     console.error("Error sending test email:", error);
//   });

// // Helper function to create a JWT token
// const createToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
// };

// // Register user and send OTP
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Check if user already exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: "User already exists!" });
//     }

//     // Validate email and password
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: "Enter a valid email format!" });
//     }
//     if (password.length < 8) {
//       return res.json({ success: false, message: "Password is too short!" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // Generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();

//     // Save OTP in the database with an expiry of 5 minutes
//     await Otp.findOneAndUpdate(
//       { email },
//       { otp, expiration: Date.now() + 5 * 60000 }, // OTP expires in 5 minutes
//       { upsert: true, new: true }
//     );

//     // Send OTP email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Your OTP for Email Verification',
//       text: `Your OTP is ${otp}. It will expire in 5 minutes.`
//     };

//     await transporter.sendMail(mailOptions)
//       .then(() => {
//         console.log("OTP email sent successfully to:", email);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP email:", error);
//       });

//     // Save user temporarily, waiting for OTP verification
//     const newUser = new userModel({
//       name: name,
//       email: email,
//       password: hashPassword,
//       isVerified: false // User is not verified yet
//     });
//     await newUser.save();

//     res.json({ success: true, message: "OTP sent to your email. Verify to complete registration." });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error occurred during registration." });
//   }
// };

// // Verify OTP and complete registration
// const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const otpEntry = await Otp.findOne({ email });
//     if (!otpEntry || otpEntry.otp !== otp || otpEntry.expiration < Date.now()) {
//       return res.json({ success: false, message: "Invalid or expired OTP!" });
//     }

//     // OTP is valid, update user to verified
//     await userModel.findOneAndUpdate({ email }, { isVerified: true });

//     // Remove OTP entry
//     await Otp.deleteOne({ email });

//     res.json({ success: true, message: "OTP verified. You can now log in." });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error occurred during OTP verification." });
//   }
// };

// // User login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User does not exist!" });
//     }

//     // Check if the user is verified
//     if (!user.isVerified) {
//       return res.json({ success: false, message: "Please verify your email before logging in." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials!" });
//     }

//     const token = createToken(user._id);
//     res.json({ success: true, token });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: "Error!" });
//   }
// };

// export { loginUser, registerUser, verifyOtp };


import userModel from "../models/userModel.js";
import Otp from "../models/Otp.js"; // Model for storing OTPs
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Email transporter setup using nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail account
    pass: process.env.EMAIL_PASS  // App password generated from Google
  }
});

// Helper function to create a JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user and send OTP
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email format!" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password is too short!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP in the database with an expiry of 5 minutes
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiration: Date.now() + 5 * 60000 }, // OTP expires in 5 minutes
      { upsert: true, new: true }
    );

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Email Verification',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    // Save user temporarily, waiting for OTP verification
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      isVerified: false // User is not verified yet
    });
    await newUser.save();

    res.json({ success: true, message: "OTP sent to your email. Verify to complete registration." });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.json({ success: false, message: "Error occurred during registration." });
  }
};

// Verify OTP and complete registration
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email });
    if (!otpEntry || otpEntry.otp !== otp || otpEntry.expiration < Date.now()) {
      return res.json({ success: false, message: "Invalid or expired OTP!" });
    }

    // OTP is valid, update user to verified
    await userModel.findOneAndUpdate({ email }, { isVerified: true });

    // Remove OTP entry
    await Otp.deleteOne({ email });

    res.json({ success: true, message: "OTP verified. You can now log in." });
  } catch (error) {
    console.error("Error occurred during OTP verification:", error);
    res.json({ success: false, message: "Error occurred during OTP verification." });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist!" });
    }

    // Check if the user is verified
    // if (!user.isVerified) {
    //   return res.json({ success: false, message: "Please verify your email before logging in." });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.json({ success: false, message: "Error occurred during login." });
  }
};

export { loginUser, registerUser, verifyOtp };

