import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuPage.css';


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          'https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968',
          {
            headers: {
              'X-Master-Key': '<YOUR_API_KEY_HERE>' // Add your API key here
            }
          }
        );
        setMenuItems(response.data.record);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching menu", error);
        setLoading(false); 
      }
    };
    fetchMenu();
  }, []);

  // Add item to order
  const addToOrder = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity < item.available_quantity) {
        setOrder(order.map((orderItem) =>
          orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        ));
      }
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  // Save order to localStorage
  const saveOrderToHistory = (newOrder) => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(newOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  };

  // Place the order
  const placeOrder = () => {
    if (tableNumber) {
      const newOrder = {
        tableNumber,
        contactNumber,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        items: order,
        totalPrice: order.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };
      saveOrderToHistory(newOrder);
      alert('Order placed successfully!');
      setOrder([]); // Clear current order
      setTableNumber('');
      setContactNumber('');
    } else {
      alert('Please enter table number.');
    }
  };

  return (
    <div>
      <h1>Menu</h1>

      {/* Order Details Form at the Top */}
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label>Table Number: </label>
          <input 
            value={tableNumber} 
            onChange={(e) => setTableNumber(e.target.value)} 
            placeholder="Enter table number"
          />
        </div>
        <div>
          <label>Contact Number (optional): </label>
          <input 
            value={contactNumber} 
            onChange={(e) => setContactNumber(e.target.value)} 
            placeholder="Enter contact number"
          />
        </div>
        <button 
          onClick={placeOrder} 
          style={{ marginTop: '10px', padding: '10px 15px' }}
          disabled={order.length === 0} // Disable if no items in order
        >
          Place Order
        </button>
      </div>

      {/* Your Current Order Summary */}
      {order.length > 0 ? (
        <div>
          <h2>Your Order</h2>
          {order.map((item) => (
            <div key={item.id}>
              {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
            </div>
          ))}
        </div>
      ) : <p>No items in order</p>}

      {/* Menu Items */}
      {loading ? (
        <p>Loading menu...</p>
      ) : (
        <div>
          {menuItems.length > 0 ? menuItems.map((item) => (
            <div key={item.id} className="menu-item" style={{ margin: '10px 0' }}>
              <img src={item.image_url} alt={item.name} style={{ width: '150px' }} />
              <h3>{item.name} - ₹{item.price}</h3>
              <p>Category: {item.category}</p>
              <p>Available: {item.available_quantity}</p>
              <button
                onClick={() => addToOrder(item)}
                disabled={item.available_quantity === 0}
              >
                {item.available_quantity === 0 ? 'Out of Stock' : 'Add to Order'}
              </button>
            </div>
          )) : <p>No items found.</p>}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
