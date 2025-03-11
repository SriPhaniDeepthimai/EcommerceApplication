import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // Default payment method

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Gather the order details from the form inputs
    const orderDetails = {
      customerName: `${e.target[0].value} ${e.target[1].value}`,
      email: e.target[2].value,
      address: e.target[3].value,
      city: e.target[4].value,
      state: e.target[5].value,
      pinCode: e.target[6].value,
      country: e.target[7].value,
      phone: e.target[8].value,
      totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2), // Include delivery fee
      paymentMethod, // "cash" or "razorpay"
    };

    if (paymentMethod === "cash") {
      try {
        // Send the order details to the backend to save in the database
        const response = await fetch("http://localhost:4000/api/order/placeorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails), // Send the order details to the backend
        });

        if (response.ok) {
          const data = await response.json();
          toast.success("Order placed successfully with Cash on Delivery!");

          // Optionally, reset the form or redirect to an order confirmation page
        } else {
          toast.error("Failed to place order. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error placing the order. Please try again.");
      }
    } else {
      // Razorpay payment logic
      console.log("Proceed to Razorpay payment");

      try {
        const response = await fetch("http://localhost:4000/api/payment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: orderDetails.totalAmount }),
        });

        const data = await response.json(); // Ensure the response is valid JSON
        if (!data) throw new Error("Invalid response from server");

        const { key, orderId } = data; // Assuming your backend returns Razorpay key and order ID
        if (!key || !orderId) throw new Error("Missing key or orderId");

        const options = {
          key: key, // Enter the API key ID from Razorpay
          amount: orderDetails.totalAmount * 100, // Amount is in paise
          currency: "INR",
          name: "Local Leaf",
          description: "Test Transaction",
          order_id: orderId, // Use the id created by Razorpay
          handler: async function (response) {
            try {
              // Call your backend to save the order details
              await fetch("http://localhost:4000/api/order/placeorder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...orderDetails,
                  razorpayPaymentId: response.razorpay_payment_id,
                }),
              });

              toast.success("Payment successful! Order placed.");
            } catch (error) {
              console.error("Error saving order:", error);
              toast.error("Failed to save order after payment.");
            }
          },
          prefill: {
            name:  `${e.target[0].value} ${e.target[1].value}`,
            email:  e.target[2].value,
            contact:e.target[8].value,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Error processing payment. Please try again.");
      }
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Pin code" required />
          <input type="text" placeholder="Country" required />
        </div>
        <input type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>&#8377;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={handlePaymentMethodChange}
              />
              Pay via Razorpay
            </label>
            <label>
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              Cash on Delivery
            </label>
          </div>
          <button type="submit">
            {paymentMethod === "cash" ? "PLACE ORDER" : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Notification container for showing toast messages */}
    </form>
  );
};

export default PlaceOrder;
