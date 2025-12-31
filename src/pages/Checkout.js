import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { placeOrder } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { totalAmount, cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '',
    cardName: '', cardNumber: '', exp: '', cvv: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if(formData.cardNumber.length < 16) {
        alert("Please enter a valid card number");
        return;
    }


    const newOrder = {
      orderId: Math.floor(Math.random() * 1000000), 
      date: new Date().toLocaleString(), 
      items: cartItems,
      totalAmount: totalAmount,
      address: `${formData.address}, ${formData.city}`,
      status: 'Delivered'
    };


    dispatch(placeOrder(newOrder));
    

    dispatch(clearCart());
    
    alert(`Order Placed Successfully! Redirecting to My Orders...`);
    
    navigate('/orders');
  };

  
  if(cartItems.length === 0) {
      navigate('/menu');
      return null;
  }

  return (

    <div className="container">
        <h2 className="section-title">Checkout</h2>
        <div className="checkout-container">
            <div className="order-summary-box">
                <h3>Order Summary</h3>
                <p>Total Items: {cartItems.length}</p>
                <p>Total Bill: <strong>₹{totalAmount}</strong></p>
            </div>
            <form onSubmit={handlePlaceOrder} className="checkout-form">
                <h4>📍 Delivery Address</h4>
                <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                <input type="text" name="address" placeholder="House No, Street Area" required onChange={handleChange} />
                <div className="form-row">
                    <input type="text" name="city" placeholder="City" required onChange={handleChange} />
                    <input type="text" name="zip" placeholder="Zip Code" required onChange={handleChange} />
                </div>
                <h4 style={{marginTop: '20px'}}>💳 Payment Details</h4>
                <input type="text" name="cardNumber" placeholder="Card Number" maxLength="16" required onChange={handleChange} />
                <div className="form-row">
                    <input type="text" name="exp" placeholder="MM/YY" required onChange={handleChange} />
                    <input type="password" name="cvv" placeholder="CVV" maxLength="3" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '20px'}}>
                    Pay ₹{totalAmount} & Place Order
                </button>
            </form>
        </div>
    </div>
  );
};

export default Checkout;