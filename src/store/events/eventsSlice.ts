// store/events/eventsSlice.ts

import { createSlice } from "@reduxjs/toolkit";

import { getEvent } from "./eventsActions";

export type Event = {
  id: number;
  title: string;
  hall: string;
  city: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  image: string;
  status: string;
};

type EventsState = {
  event: Event;
  loading: boolean;
  error: string | null;
};

const initialState: EventsState = {
  event: {
    id: null,
    title: '',
    hall: '',
    city: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    image: '',
    status: '',
  },
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })

      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load events";
      });
  },
});

export default eventsSlice.reducer;