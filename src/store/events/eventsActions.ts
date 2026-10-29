import { createAsyncThunk } from "@reduxjs/toolkit";

import { apolloClient } from "../../graphql/client";
import { GET_EVENT, GET_EVENTS } from "../../graphql/queries/events.ts";

type GetEventsFilter = {
  city?: string | null;
  hall?: string | null;
  status?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
};

type GetEventsPagination = {
  page: number;
  sortBy: string;
  sortOrder: string;
  itemsPerPage: number;
};

type GetEventsPayload = {
  listKey: string;
  filter: GetEventsFilter;
  pagination: GetEventsPagination;
  search: string;
};

export const getEvent = createAsyncThunk(
  "events/getEvent",
  async (id: number) => {
    const { data } = await apolloClient.query({
      query: GET_EVENT,
      variables: {
        id,
      },
      fetchPolicy: "network-only",
    });

    return data?.getEvent;
  }
);

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (payload: GetEventsPayload) => {
    const { data } = await apolloClient.query({
      query: GET_EVENTS,
      variables: {
        payload,
      },
      fetchPolicy: "network-only",
    });

    return data?.getEvents;
  }
);
