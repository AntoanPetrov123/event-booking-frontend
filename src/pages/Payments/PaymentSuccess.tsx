import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import type { AppDispatch } from "../../store/store";

import { clearCart } from "../../store/cart/cartSlice";

import { getPaymentStatus } from "../../store/payments/paymentsActions";

import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const checkPayment = async () => {
      const result = await dispatch(getPaymentStatus(sessionId));

      if (
        getPaymentStatus.fulfilled.match(result) &&
        result.payload.paymentStatus === "PAID"
      ) {
        dispatch(clearCart());
      }
    };

    checkPayment();
  }, [dispatch, sessionId]);

  return (
    <div className="payment-success-page">
      <div className="payment-success-card">
        <div className="payment-success-card__icon">✓</div>

        <h1 className="payment-success-card__title">Payment Successful</h1>

        <p className="payment-success-card__text">
          Your payment was completed successfully and your tickets are ready.
        </p>

        <div className="payment-success-card__actions">
          <Link to="/user/tickets" className="payment-success-card__primary">
            View My Tickets
          </Link>

          <Link to="/events" className="payment-success-card__secondary">
            Browse More Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
