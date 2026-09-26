import { createAsyncThunk } from "@reduxjs/toolkit";

import { apolloClient } from "../../graphql/client";
import { GET_EVENT } from "../../graphql/queries/events.ts";

export const getEvent = createAsyncThunk(
    "events/getEvent",
    async (id: number) => {
      const { data }  = await apolloClient.query({
        query: GET_EVENT,
        variables: {
          id,
        },
        fetchPolicy: "network-only",
      });
  
      return data?.getEvent;
    }
);