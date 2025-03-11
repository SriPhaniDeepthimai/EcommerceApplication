
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "" // Added otp field to store user input for OTP
  });
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [otpVerified, setOtpVerified] = useState(false); // State to track if OTP is verified

  // Handle input change for name, email, password, and OTP fields
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // Handle login or registration form submission
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    // If user is in login state
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } 
    // If in registration state
    else if (currState === "Sign Up" && !isOtpSent) {
      newUrl += "/api/user/register"; // Register and send OTP if OTP not yet sent
    } 
    // If OTP has been sent, proceed to verify OTP
    else if (currState === "Sign Up" && isOtpSent) {
      newUrl += "/api/user/verify-otp"; // Verify OTP endpoint
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        // Handle OTP sent case
        if (currState === "Sign Up" && !isOtpSent) {
          setIsOtpSent(true); // Set OTP sent flag
          setError("OTP sent to your email. Please check and verify.");
        } 
        // Handle OTP verified case
        else if (currState === "Sign Up" && isOtpSent) {
          setOtpVerified(true);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false); // Close login popup
        } 
        // Handle login success
        else {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false); // Close login popup
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && !isOtpSent && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter Your Password"
            required
          />

          {/* OTP Input Field: Only show if OTP has been sent */}
          {isOtpSent && (
            <input
              name="otp"
              onChange={onChangeHandler}
              value={data.otp}
              type="text"
              placeholder="Enter OTP"
              required
            />
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {currState === "Sign Up" && !isOtpSent ? "Create Account" : isOtpSent ? "Verify OTP" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

