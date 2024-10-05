import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const { state } = useLocation(); // Access the state passed through the Link
  const orders = state?.orders || []; // Get orders from the state
  const [tableNumber, setTableNumber] = useState(''); // State for table number
  const [contactName, setContactName] = useState(''); // State for contact name
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [orderTime, setOrderTime] = useState(new Date().toISOString().split('T')[1].split('.')[0]); // Default to current time
  const navigate = useNavigate(); // Initialize navigate

  const handleConfirmOrder = () => {
    // You can now process the order with the table number and name
    // For now, we'll just log it or redirect to a success page
    console.log('Confirmed Order:', { tableNumber, contactName, orderDate, orderTime, orders });
    // Redirect to a success page or clear orders
    alert("Order confirmed!"); // For demonstration
    // Optionally navigate back to Menu or another page
    navigate('/'); // Navigate to home or another appropriate page
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h4>Item: {order.name}</h4>
              <p>Price: ${order.price.toFixed(2)}</p>
              <p>Quantity: {order.quantity}</p> {/* Show quantity if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed yet.</p>
      )}
      {orders.length > 0 && (
        <div>
          <h3>Confirm Your Order</h3>
          <input 
            type="text" 
            placeholder="Table Number" 
            value={tableNumber} 
            onChange={(e) => setTableNumber(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Contact Name" 
            value={contactName} 
            onChange={(e) => setContactName(e.target.value)} 
          />
          <p>Date: {orderDate}</p>
          <p>Time: {orderTime}</p>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
