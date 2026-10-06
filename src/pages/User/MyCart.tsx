import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store/store";
import { increaseQuantity, decreaseQuantity } from "../../store/cart/cartSlice";
import CustomButton from "../../components/FormElements/Buttons/CustomButton";

import "./MyCart.css";
import { Link } from "react-router-dom";
import { createCheckoutSession } from "../../store/cart/cartActions";

const MyCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalTickets = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const checkoutItems = items.map((item) => ({
      ticketId: item.ticketId,
      quantity: item.quantity,
    }));

    const result = await dispatch(createCheckoutSession(checkoutItems));

    if (createCheckoutSession.fulfilled.match(result)) {
      window.location.href = result.payload.checkoutUrl;
    }
  };

  if (!items.length) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h1>Your cart is empty</h1>

          <p>You haven't added any tickets yet.</p>

          <CustomButton variant="primary" to="/events">
            Browse Events
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1>Your Cart</h1>

          <p>Review your selected tickets before continuing.</p>
        </div>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-items__header">
            <span>Ticket</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {items.map((ticket) => (
            <div key={ticket.ticketId} className="cart-item">
              <div className="cart-item__info">
                <Link
                  to={`/events/${ticket.eventId}`}
                  className="cart-item__event"
                >
                  Event #{ticket.eventId}
                </Link>

                <h3>{ticket.name}</h3>
              </div>

              <div className="cart-item__price">
                {ticket.price.toFixed(2)} лв.
              </div>

              <div className="cart-item__quantity">
                <div className="cart-quantity">
                  <button
                    type="button"
                    className="cart-quantity__button"
                    onClick={() => dispatch(decreaseQuantity(ticket.ticketId))}
                  >
                    −
                  </button>

                  <span className="cart-quantity__value">
                    {ticket.quantity}
                  </span>

                  <button
                    type="button"
                    className="cart-quantity__button"
                    onClick={() => dispatch(increaseQuantity(ticket.ticketId))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item__total">
                €{(ticket.price * ticket.quantity).toFixed(2)}{" "}
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Tickets</span>
              <span>{totalTickets}</span>
            </div>

            <div className="cart-summary__row">
              <span>Subtotal</span>

              <span>€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="cart-summary__total">
            <span>Total</span>

            <span>€{totalPrice.toFixed(2)}</span>
          </div>

          <CustomButton variant="primary" fullWidth onClick={handleCheckout}>
            Continue to Checkout
          </CustomButton>

          <CustomButton variant="text" fullWidth to="/events">
            Continue Shopping
          </CustomButton>
        </aside>
      </div>
    </div>
  );
};

export default MyCart;
