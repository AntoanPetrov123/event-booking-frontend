import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import eventsReducer from "./events/eventsSlice";
import paymentsReducer from "./payments/paymentsSlice";
import usersReducer from "./users/usersSlice";

import cartReducer, {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  type CartState,
} from "./cart/cartSlice";

import { saveCart } from "./cart/cartStorage";

const cartListener = createListenerMiddleware();

cartListener.startListening({
  matcher: isAnyOf(
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  ),

  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as {
      auth: {
        user: {
          id: number;
        } | null;
      };

      cart: CartState;
    };

    const userId = state.auth.user?.id;

    if (!userId) {
      return;
    }

    saveCart(userId, state.cart.items);
  },
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    cart: cartReducer,
    payments: paymentsReducer,
    users: usersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
