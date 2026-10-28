
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  // Supports the cost format used by ProductList, such as "$15".
  const getCost = (item) => {
    const value = item.cost ?? item.price ?? 0;

    if (typeof value === 'number') {
      return value;
    }

    return Number(String(value).replace(/[^0-9.]/g, '')) || 0;
  };

  const formatMoney = (amount) => `$${amount.toFixed(2)}`;

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalCost = cart.reduce(
    (total, item) => total + getCost(item) * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      alert('Coming Soon - Checkout functionality will be available soon!');
    }
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
          type="button"
          className="get-started-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </header>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some beautiful plants to get started.</p>

          <button
            type="button"
            className="get-started-button"
            onClick={onContinueShopping}
          >
            Explore Plants
          </button>
        </section>
      ) : (
        <>
          <div className="cart-container">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>

                  <p>Price: {formatMoney(getCost(item))}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>

                    <span>Quantity: {item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <p className="item-subtotal">
                    Subtotal:{' '}
                    {formatMoney(getCost(item) * item.quantity)}
                  </p>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className="cart-summary">
            <h2>Order Summary</h2>

            <p>Total items: {totalQuantity}</p>

            <p className="cart-total">
              Total: {formatMoney(totalCost)}
            </p>

            <button
              type="button"
              className="primary-button checkout-button"
              onClick={handleCheckout}
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
