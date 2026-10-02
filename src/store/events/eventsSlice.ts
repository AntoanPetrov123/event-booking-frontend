import { createSlice } from "@reduxjs/toolkit";

import { getEvent, getEvents } from "./eventsActions";

export type EventTicket = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  totalPlaces: number;
  usedPlaces: number;
};

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
  tickets: EventTicket[];
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

type EventsListData = {
  data: Event[];
  total: number | null;
  page: number | null;
  itemsPerPage: number | null;
  totalPages: number | null;

  loading: boolean;
  error: string | null;
};

type EventsState = {
  event: Event;
  events: {
    lists: Record<string, EventsListData>;
  };
  loading: boolean;
  error: string | null;
};

const initialState: EventsState = {
  event: {
    id: null,
    title: "",
    hall: "",
    city: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    image: null,
    status: "",
    tickets: [],
  },
  events: {
    lists: {
      upcoming: {
        data: [],
        total: null,
        page: null,
        itemsPerPage: null,
        totalPages: null,
        loading: false,
        error: null,
      },
      sofia: {
        data: [],
        total: null,
        page: null,
        itemsPerPage: null,
        totalPages: null,
        loading: false,
        error: null,
      },
    },
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
      .addCase(getEvents.pending, (state, action) => {
        const listKey = action.meta.arg.listKey;
      
        state.events.lists[listKey].loading = true;
        state.events.lists[listKey].error = null;
      })

      .addCase(getEvents.fulfilled, (state, action) => {
        const { listKey, data } = action.payload;
        
        state.events.lists[listKey] = {
          ...state.events.lists[listKey],
      
          data,
          total: data.total,
          page: data.page,
          totalPages: data.totalPages,
          itemsPerPage: data.itemsPerPage,
      
          loading: false,
          error: null,
        };
      })

      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load events";
      });
  },
});

export default eventsSlice.reducer;
