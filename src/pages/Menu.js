import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const price = parseInt(item.idMeal.slice(-2)) * 10 + 50; 

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: item.idMeal,
      name: item.strMeal,
      image: item.strMealThumb,
      price: price,
      quantity: qty
    }));
    alert(`${qty} x ${item.strMeal} added to cart!`);
    setQty(1);
  };

  return (
    <div className="food-card">
      <img src={item.strMealThumb} alt={item.strMeal} />
      <div className="food-info">
        <h3>{item.strMeal}</h3>
        <p className="price">₹{price}</p>
        
        <div className="qty-container">
          <button onClick={() => setQty(q => (q > 1 ? q - 1 : 1))} className="qty-btn">-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="qty-btn">+</button>
        </div>

        <button onClick={handleAddToCart} className="btn-add">Add to Cart</button>
      </div>
    </div>
  );
};

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        setFoods(response.data.meals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchFood();
  }, []);

  if (loading) return <h2 className="text-center" style={{marginTop:'20px'}}>Loading Indian Delicacies...</h2>;

  return (
    <div className="container">
      <h2 className="section-title">Authentic Indian Menu</h2>
      <div className="food-grid">
        {foods.map((item) => (
          <FoodCard key={item.idMeal} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;