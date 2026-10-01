import {
    createSlice,
    type PayloadAction,
  } from "@reduxjs/toolkit";
  
  export type CartItem = {
    ticketId: number;
    eventId: number;
    name: string;
    price: number;
    quantity: number;
  };
  
  export type CartState = {
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
            item.ticketId ===
            action.payload.ticketId
        );
  
        if (existingItem) {
          existingItem.quantity +=
            action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      },
  
      increaseQuantity: (
        state,
        action: PayloadAction<number>
      ) => {
        const item = state.items.find(
          (item) =>
            item.ticketId === action.payload
        );
  
        if (item) {
          item.quantity += 1;
        }
      },
  
      decreaseQuantity: (
        state,
        action: PayloadAction<number>
      ) => {
        const item = state.items.find(
          (item) =>
            item.ticketId === action.payload
        );
  
        if (!item) return;
  
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (item) =>
              item.ticketId !== action.payload
          );
  
          return;
        }
  
        item.quantity -= 1;
      },
  
      removeFromCart: (
        state,
        action: PayloadAction<number>
      ) => {
        state.items = state.items.filter(
          (item) =>
            item.ticketId !== action.payload
        );
      },

      hydrateCart: (
        state,
        action: PayloadAction<CartItem[]>
      ) => {
        state.items = action.payload;
      },
  
      resetCartState: (state) => {
        state.items = [];
      },
    },
  });
  
  export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    hydrateCart,
    resetCartState,
  } = cartSlice.actions;
  
  export default cartSlice.reducer;