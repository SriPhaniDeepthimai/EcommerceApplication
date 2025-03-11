// // import React from 'react'
// // import './Orders.css'
// // const Orders = () => {
// //   return (
// //     <div>
// //       orders
// //     </div>
// //   )
// // }

// // export default Orders

// // src/pages/Orders/Orders.jsx

// import React, { useEffect, useState } from 'react';
// import './Orders.css';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('/api/order'); // Adjust the URL as necessary
//         if (!response.ok) {
//           throw new Error('Failed to fetch orders');
//         }
//         const data = await response.json();
//         setOrders(data.orders); // Assuming your API returns an object with an 'orders' array
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="orders-container">
//       <h1>Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders available.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <h2>Order ID: {order._id}</h2>
//             <p>Name: {order.firstName} {order.lastName}</p>
//             <p>Email: {order.email}</p>
//             <p>Address: {order.street}, {order.city}, {order.state}, {order.country}, {order.pinCode}</p>
//             <p>Phone: {order.phone}</p>
//             <p>Total Amount: &#8377;{order.totalAmount}</p>
//             <p>Payment Method: {order.paymentMethod}</p>
//             <p>Status: {order.status || 'Pending'}</p> {/* Assuming there's a status field */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;

// src/pages/Orders/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order/fetchorder'); // Adjust the URL if needed
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders); // Assuming your API returns an object with an 'orders' array
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h2>Order ID: {order._id}</h2>
            <p>Name: {order.customerName}</p>
            <p>Email: {order.email}</p>
            <p>Address: {order.address}, {order.city}, {order.state}, {order.country}, {order.pinCode}</p>
            <p>Phone: {order.phone}</p>
            <p>Total Amount: &#8377;{order.totalAmount}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Status: {order.orderStatus || 'Pending'}</p> {/* Assuming there's a status field */}
            <p>Items:</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.foodId.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
