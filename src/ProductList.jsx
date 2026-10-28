
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const plants = [
  {
    id: 1,
    name: 'Snake Plant',
    category: 'Easy Care Plants',
    price: 299,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7e?w=600&q=80',
    description: 'A hardy plant for a fresh, green home.',
  },
  {
    id: 2,
    name: 'ZZ Plant',
    category: 'Easy Care Plants',
    price: 349,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80',
    description: 'Glossy leaves and very easy maintenance.',
  },
  {
    id: 3,
    name: 'Golden Pothos',
    category: 'Easy Care Plants',
    price: 249,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80',
    description: 'Beautiful trailing vines for shelves.',
  },
  {
    id: 4,
    name: 'Spider Plant',
    category: 'Easy Care Plants',
    price: 279,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    description: 'A popular plant with arching green leaves.',
  },
  {
    id: 5,
    name: 'Jade Plant',
    category: 'Easy Care Plants',
    price: 199,
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80',
    description: 'A compact succulent with fleshy leaves.',
  },
  {
    id: 6,
    name: 'Peace Lily',
    category: 'Easy Care Plants',
    price: 399,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&q=80',
    description: 'Elegant foliage for indoor spaces.',
  },
  {
    id: 7,
    name: 'Areca Palm',
    category: 'Air-Friendly Plants',
    price: 599,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
    description: 'A tropical plant with graceful fronds.',
  },
  {
    id: 8,
    name: 'Rubber Plant',
    category: 'Air-Friendly Plants',
    price: 449,
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80',
    description: 'Bold leaves that make a statement.',
  },
  {
    id: 9,
    name: 'Boston Fern',
    category: 'Air-Friendly Plants',
    price: 329,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80',
    description: 'Full, delicate foliage for shaded corners.',
  },
  {
    id: 10,
    name: 'Aloe Vera',
    category: 'Air-Friendly Plants',
    price: 229,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80',
    description: 'A useful succulent with upright leaves.',
  },
  {
    id: 11,
    name: 'Dracaena',
    category: 'Air-Friendly Plants',
    price: 379,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    description: 'A striking upright plant for the home.',
  },
  {
    id: 12,
    name: 'Bamboo Palm',
    category: 'Air-Friendly Plants',
    price: 549,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
    description: 'A lush palm with tropical character.',
  },
  {
    id: 13,
    name: 'Echeveria',
    category: 'Succulents and Cacti',
    price: 179,
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80',
    description: 'A rosette-shaped succulent for sunny spaces.',
  },
  {
    id: 14,
    name: 'Haworthia',
    category: 'Succulents and Cacti',
    price: 189,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80',
    description: 'A compact succulent with distinctive leaves.',
  },
  {
    id: 15,
    name: 'Barrel Cactus',
    category: 'Succulents and Cacti',
    price: 219,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
    description: 'A sculptural cactus for bright locations.',
  },
  {
    id: 16,
    name: 'String of Pearls',
    category: 'Succulents and Cacti',
    price: 299,
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600&q=80',
    description: 'Trailing stems with bead-like green leaves.',
  },
  {
    id: 17,
    name: 'Gasteria',
    category: 'Succulents and Cacti',
    price: 199,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80',
    description: 'A small succulent with thick patterned leaves.',
  },
  {
    id: 18,
    name: 'Mini Aloe',
    category: 'Succulents and Cacti',
    price: 159,
    image: 'https://images.unsplash.com/photo-1509423350716-97f2360af7e4?w=600&q=80',
    description: 'A compact succulent for a sunny windowsill.',
  },
];

const categories = [
  'Easy Care Plants',
  'Air-Friendly Plants',
  'Succulents and Cacti',
];

function ProductList({ onViewCart, onBackToHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <main className="product-page">
      <header className="product-header">
        <div>
          <p className="eyebrow">GROW SOMETHING BEAUTIFUL</p>
          <h1>Our Plants</h1>
          <p>Find the perfect green companion for your home.</p>
        </div>

        <div className="product-actions">
          {onBackToHome && (
            <button className="secondary-button" onClick={onBackToHome}>
              Home
            </button>
          )}

          {onViewCart && (
            <button className="primary-button" onClick={onViewCart}>
              View Cart ({cartCount})
            </button>
          )}
        </div>
      </header>

      {categories.map((category) => (
        <section className="product-category" key={category}>
          <h2>{category}</h2>

          <div className="product-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <article className="product-card" key={plant.id}>
                  <img
                    className="product-card-image"
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />

                  <div className="product-info">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">
                      ₹{plant.price.toFixed(2)}
                    </p>

                    <button
                      className="primary-button"
                      onClick={() => handleAddToCart(plant)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
