import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUtensils } from 'react-icons/fa';

const Header = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <FaUtensils /> Food-Fusion
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            <span className="badge">{totalQuantity}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;