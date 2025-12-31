import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { orderHistory } = useSelector(state => state.orders);

  if (orderHistory.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '50px' }}>
        <h2>No Orders Yet 🤷‍♂️</h2>
        <p>You haven't placed any orders. Try our delicious menu!</p>
        <Link to="/menu" className="btn-primary">Order Now</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">My Orders</h2>
      <div className="orders-container">
        {orderHistory.map((order) => (
          <div key={order.orderId} className="order-card">
            
            <div className="order-header">
              <div>
                <h3>Order ID: #{order.orderId}</h3>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-status">
                <span className="badge-success">Delivered</span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                   <span>{item.quantity} x {item.name}</span>
                   <span>₹{item.totalPrice}</span>
                </div>
              ))}
            </div>

            <hr />
            
            <div className="order-footer">
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><small>Delivered to: {order.address}</small></p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;