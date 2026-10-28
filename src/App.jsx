
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
    alert(
      'Thank you for choosing Paradise Nursery! ' +
      'Checkout is a demonstration feature.'
    );
  };

  if (page === 'products') {
    return (
      <ProductList
        onViewCart={() => setPage('cart')}
        onBackToHome={() => setPage('home')}
      />
    );
  }

  if (page === 'cart') {
    return (
      <CartItem
        onContinueShopping={() => setPage('products')}
        onCheckout={handleCheckout}
      />
    );
  }

  return (
    <div className="app">
      <header className="home-nav">
        <button
          className="brand-button"
          onClick={() => setPage('home')}
        >
          🌿 Paradise Nursery
        </button>

        <div className="home-nav-actions">
          <button
            className="nav-button"
            onClick={() => setPage('products')}
          >
            Shop Plants
          </button>

          <button
            className="nav-button"
            onClick={() => setPage('cart')}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </header>

      <main>
        <section className="landing-page">
          <div className="landing-overlay">
            <div className="hero-content">
              <p className="eyebrow">BRING NATURE HOME</p>

              <h1>Paradise Nursery</h1>

              <h2>Find Your Perfect Green Companion</h2>

              <p className="hero-description">
                Discover beautiful indoor plants and create a
                refreshing, peaceful space in your home.
              </p>

              <button
                className="get-started-button"
                onClick={() => setPage('products')}
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        <AboutUs />
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Paradise Nursery</p>
        <p>Grow happiness, one plant at a time.</p>
      </footer>
    </div>
  );
}

export default App;
