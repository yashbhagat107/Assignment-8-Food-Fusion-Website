import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      if(window.confirm("Remove item from cart?")) {
        dispatch(removeFromCart(item.id));
      }
    } else {
      dispatch(decreaseItemQuantity(item.id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center" style={{padding: '50px'}}>
        <h2>Your Cart is Empty 😔</h2>
        <p>Hungry? Go grab some food!</p>
        <Link to="/menu" className="btn-primary">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">Your Food Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>Unit Price: ₹{item.price}</p>
              
              <div className="qty-container" style={{margin: '10px 0 0 0'}}>
                <button onClick={() => handleDecrease(item)} className="qty-btn">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseItemQuantity(item.id))} className="qty-btn">+</button>
              </div>
            </div>

            <div className="cart-actions">
              <span className="total-price">₹{item.totalPrice}</span>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="btn-remove">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Total Amount: ₹{totalAmount}</h3>
        <div style={{marginTop: '20px'}}>
            <button onClick={() => dispatch(clearCart())} className="btn-clear">Clear Cart</button>
            <button onClick={() => navigate('/checkout')} className="btn-checkout">
              Proceed to Checkout
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;