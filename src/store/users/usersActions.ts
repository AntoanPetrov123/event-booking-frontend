import { createAsyncThunk } from "@reduxjs/toolkit";

import { apolloClient } from "../../graphql/client";
import { GET_USER_TICKETS } from "../../graphql/queries/users";



export const getUserTickets = createAsyncThunk(
  "users/getUserTickets",
  async () => {
    const { data } = await apolloClient.query({
      query: GET_USER_TICKETS,
      variables: {},
      fetchPolicy: "network-only",
    });

    return data.getUserTickets;
  }
);