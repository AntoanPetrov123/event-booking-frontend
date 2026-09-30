import { createSlice } from "@reduxjs/toolkit";

import { 
    getEvent, 
    getEvents 
} from "./eventsActions";

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
  image: string | null;
  status: string;
};

export type EventItem = {
  id: number;
  title: string;
  hall: string;
  city: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  image: string | null;
};

type EventsState = {
  event: Event;
  events: {
    data: EventItem[];
    total: number;
    page: number; 
    itemsPerPage: number;
    totalPages: number;
  };
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
    image: null,
    status: '',
  },
  events: {
    data: [],
    total: null,
    page: null, 
    itemsPerPage: null,
    totalPages: null,
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
        // GET ONE EVENT
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
        state.error = action.error.message || "Failed to load event";
      })

       // GET ALL EVENTS
       .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events.data = action.payload.data;
        state.events.total = action.payload.total;
        state.events.page = action.payload.page;
        state.events.totalPages = action.payload.totalPages;
        state.events.itemsPerPage = action.payload.itemsPerPage;
      })
      
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load events";
      });
  },
});

export default eventsSlice.reducer;