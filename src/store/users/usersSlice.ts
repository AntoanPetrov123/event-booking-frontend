import { createSlice } from "@reduxjs/toolkit";
import { getUserTickets } from "./usersActions";

type Event = {
    id: number;
    title: string;
    city: string;
    hall: string;
    startDate: string;
    startTime: string;
    image: string;
};

type Ticket = {
    id: number;
    ticketName: string;
    quantity: number;
    unitPrice: number;

    event: Event
};

type TicketsState = {
  tickets: Ticket[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: TicketsState = {
  tickets: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
        state.error = null;
      })

      .addCase(getUserTickets.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message ?? "Failed to get user's tickets";
      });
  },
});

export default usersSlice.reducer;
