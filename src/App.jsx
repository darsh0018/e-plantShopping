
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function App() {
  const [page, setPage] = useState('home');

  const cartItems = useSelector(
    (state) => state.cart.items ?? []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const handleCheckout = () => {
    alert(
      'Thank you for choosing Paradise Nursery! ' +
      'Checkout is a demonstration feature.'
    );
  };

  const handleHome = () => {
    setPage('home');
  };

  const handlePlants = () => {
    setPage('products');
  };

  const handleCart = () => {
    setPage('cart');
  };

  return (
    <div className="app">
      <header className="home-nav">
        <button
          type="button"
          className="brand-button"
          onClick={handleHome}
        >
          🌿 Welcome to Paradise Nursery
        </button>

        <nav
          className="home-nav-actions"
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="nav-button"
            onClick={handleHome}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={handlePlants}
          >
            Plants
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={handleCart}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {page === 'home' && (
        <main>
          <section className="landing-page">
            <div className="landing-overlay">
              <div className="hero-content">
                <p className="eyebrow">
                  BRING NATURE HOME
                </p>

                <h1>Welcome to Paradise Nursery</h1>

                <h2>
                  Find Your Perfect Green Companion
                </h2>

                <p className="hero-description">
                  Discover beautiful indoor plants and create
                  a refreshing, peaceful space in your home.
                </p>

                <button
                  type="button"
                  className="get-started-button"
                  onClick={handlePlants}
                >
                  Get Started
                </button>
              </div>
            </div>
          </section>

          <AboutUs />
        </main>
      )}

      {page === 'products' && (
        <ProductList
          onViewCart={handleCart}
          onBackToHome={handleHome}
        />
      )}

      {page === 'cart' && (
        <CartItem
          onContinueShopping={handlePlants}
          onCheckout={handleCheckout}
        />
      )}

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Paradise Nursery
        </p>

        <p>
          Grow happiness, one plant at a time.
        </p>
      </footer>
    </div>
  );
}

export default App;
