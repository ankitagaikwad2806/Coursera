import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=400',
          description: 'Produces oxygen and purifies indoor air efficiently.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=400',
          description: 'Filters pollutants such as formaldehyde and xylene.',
          cost: '$12',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?q=80&w=400',
          description: 'Calming aroma, perfect for stress relief and relaxation.',
          cost: '$18',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592729984859-9944365778a4?q=80&w=400',
          description: 'Sweet floral scent that freshens up any living space.',
          cost: '$20',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1567689265664-1c48de61db0b?q=80&w=400',
          description: 'Soothing gel used for skin burns and wellness.',
          cost: '$14',
        },
        {
          name: 'Mint',
          image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=400',
          description: 'Refreshing aromatic herb commonly used in culinary teas.',
          cost: '$10',
        },
      ],
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-brand" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
          <p>Where Green Meets Serenity</p>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryGroup.category}</h2>
              <div className="plant-cards-container">
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-desc">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

