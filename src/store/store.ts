import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;