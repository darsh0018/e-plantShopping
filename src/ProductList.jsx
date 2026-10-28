
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const plantsArray = [
  {
    category: 'Easy Care Plants',
    plants: [
      { id: 1, name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7e?w=600&q=80', cost: '$15' },
      { id: 2, name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80', cost: '$18' },
      { id: 3, name: 'Golden Pothos', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80', cost: '$12' },
      { id: 4, name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', cost: '$14' },
      { id: 5, name: 'Jade Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80', cost: '$10' },
      { id: 6, name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&q=80', cost: '$20' },
    ],
  },
  {
    category: 'Air-Friendly Plants',
    plants: [
      { id: 7, name: 'Areca Palm', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80', cost: '$25' },
      { id: 8, name: 'Rubber Plant', image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80', cost: '$22' },
      { id: 9, name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80', cost: '$16' },
      { id: 10, name: 'Aloe Vera', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80', cost: '$11' },
      { id: 11, name: 'Dracaena', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', cost: '$19' },
      { id: 12, name: 'Bamboo Palm', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80', cost: '$24' },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { id: 13, name: 'Echeveria', image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80', cost: '$9' },
      { id: 14, name: 'Haworthia', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80', cost: '$10' },
      { id: 15, name: 'Barrel Cactus', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80', cost: '$13' },
      { id: 16, name: 'String of Pearls', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80', cost: '$17' },
      { id: 17, name: 'Gasteria', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', cost: '$12' },
      { id: 18, name: 'Mini Aloe', image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80', cost: '$8' },
    ],
  },
];

// Shared navigation used by the application.
export function Navbar({
  onHomeClick,
  onPlantsClick,
  onCartClick,
  totalItems = 0,
}) {
  return (
    <nav className="navbar home-nav">
      <button
        type="button"
        className="brand-button"
        onClick={onHomeClick}
      >
        🌿 Paradise Nursery
      </button>

      <div className="home-nav-actions">
        <button
          type="button"
          className="nav-button"
          onClick={onHomeClick}
        >
          Home
        </button>

        <button
          type="button"
          className="nav-button"
          onClick={onPlantsClick}
        >
          Plants
        </button>

        <button
          type="button"
          className="nav-button cart-icon"
          onClick={onCartClick}
          aria-label={`Shopping cart, ${totalItems} items`}
        >
          🛒 Cart ({totalItems})
        </button>
      </div>
    </nav>
  );
}

function ProductList({
  onViewCart,
  onBackToHome,
  onHomeClick,
  onCartClick,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Track plants already added during this product-list visit.
  const [addedToCart, setAddedToCart] = useState({});

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const goHome = onHomeClick || onBackToHome;
  const goCart = onCartClick || onViewCart;

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));
  };

  return (
    <main className="product-page">
      <header className="product-header">
        <div>
          <p className="eyebrow">GROW SOMETHING BEAUTIFUL</p>
          <h1>Our Plants</h1>
          <p>Find the perfect green companion for your home.</p>
        </div>
      </header>

      {plantsArray.map((category) => (
        <section className="product-category" key={category.category}>
          <h2>{category.category}</h2>

          <div className="product-grid">
            {category.plants.map((plant) => {
              const alreadyInCart = cart.some(
                (item) => item.name === plant.name
              );

              const isAdded =
                Boolean(addedToCart[plant.name]) || alreadyInCart;

              return (
                <article className="product-card" key={plant.id}>
                  <img
                    className="product-card-image"
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="product-info">
                    <h3>{plant.name}</h3>

                    <p className="product-price">{plant.cost}</p>

                    <button
                      type="button"
                      className="primary-button"
                      disabled={isAdded}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <div className="product-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={goHome}
        >
          Home
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={goCart}
        >
          View Cart ({totalItems})
        </button>
      </div>
    </main>
  );
}

export default ProductList;
