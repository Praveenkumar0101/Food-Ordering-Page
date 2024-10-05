import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css';


const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(storedOrders);
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {orderHistory.length > 0 ? (
        <div>
          {orderHistory.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Order on {order.date} at {order.time}</h3>
              <p>Table Number: {order.tableNumber}</p>
              {order.contactNumber && <p>Contact Number: {order.contactNumber}</p>}
              <h4>Items Ordered:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total Price:</strong> ₹{order.totalPrice.toFixed(2)}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : <p>No orders found.</p>}
    </div>
  );
};

export default OrderHistoryPage;
