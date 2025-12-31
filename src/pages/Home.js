import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Food-Fusion</h1>
        <p>Experience the best fusion of flavors delivered to your doorstep.</p>
        <Link to="/menu" className="btn-primary">Order Now</Link>
      </div>
    </div>
  );
};

export default Home;