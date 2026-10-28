
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './App.css';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function App() {
  const [page, setPage] = useState('home');

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    alert('Coming Soon - Checkout functionality will be available soon!');
  };

  const goToHome = () => {
    setPage('home');
  };

  const goToProducts = () => {
    setPage('products');
  };

  const goToCart = () => {
    setPage('cart');
  };

  return (
    <div className="app">
      {/* Shared navigation */}
      <nav className="navbar home-nav">
        <button
          type="button"
          className="brand-button"
          onClick={goToHome}
        >
          🌿 Paradise Nursery
        </button>

        <div className="home-nav-actions">
          <button
            type="button"
            className="nav-button"
            onClick={goToHome}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={goToProducts}
          >
            Plants
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={goToCart}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Landing page */}
      {page === 'home' && (
        <>
          <main>
            <section className="landing-page background-image">
              <div className="landing-overlay">
                <div className="hero-content">
                  <p className="eyebrow">
                    GROW SOMETHING BEAUTIFUL
                  </p>

                  <h1>Welcome to Paradise Nursery</h1>

                  <h2>
                    Find Your Perfect Green Companion
                  </h2>

                  <p className="hero-description">
                    Discover beautiful indoor plants and bring
                    freshness, nature, and happiness into your home.
                    Explore our collection and find the perfect plant
                    for your space.
                  </p>

                  <button
                    type="button"
                    className="get-started-button"
                    onClick={goToProducts}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </section>

            <AboutUs />
          </main>

          <footer className="site-footer">
            <p>
              © {new Date().getFullYear()} Paradise Nursery
            </p>
            <p>Grow happiness, one plant at a time.</p>
          </footer>
        </>
      )}

      {/* Plant listing page */}
      {page === 'products' && (
        <ProductList
          onViewCart={goToCart}
          onBackToHome={goToHome}
        />
      )}

      {/* Shopping cart page */}
      {page === 'cart' && (
        <CartItem
          onContinueShopping={goToProducts}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default App;
