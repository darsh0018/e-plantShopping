
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const changeQuantity = (item, quantity) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <main className="cart-page">
      <header className="cart-header">
        <div>
          <p className="eyebrow">YOUR GREEN PICKS</p>
          <h1>Shopping Cart</h1>
          <p>Review your plants before checking out.</p>
        </div>

        <button
          className="secondary-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </header>

      {items.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover a plant you'll love and add it to your cart.</p>
          <button
            className="primary-button"
            onClick={onContinueShopping}
          >
            Explore Plants
          </button>
        </section>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price.toFixed(2)} each</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        changeQuantity(item, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>Quantity: {item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        changeQuantity(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="item-subtotal">
                    Subtotal: ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className="cart-summary">
            <h2>Order Summary</h2>
            <p>
              Total items: {items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            </p>
            <p className="cart-total">
              Total: ₹{total.toFixed(2)}
            </p>

            <button
              className="primary-button checkout-button"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;
