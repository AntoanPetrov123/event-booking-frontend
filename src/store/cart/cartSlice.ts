import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  ticketId: number;
  eventId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<CartItem>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.ticketId === action.payload.ticketId
      );

      if (existingItem) {
        existingItem.quantity +=
          action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.ticketId !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;