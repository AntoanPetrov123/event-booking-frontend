import { createSlice } from "@reduxjs/toolkit";

import { getPaymentStatus } from "./paymentsActions";

type PaymentOrder = {
  id: number;
  status: string;
  paymentStatus: string;
  totalAmount: number;
};

type PaymentsState = {
  order: PaymentOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: PaymentsState = {
  order: null,
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })

      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message ?? "Failed to get payment status";
      });
  },
});

export const { resetPaymentState } = paymentsSlice.actions;

export default paymentsSlice.reducer;
