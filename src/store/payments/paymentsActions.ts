import { createAsyncThunk } from "@reduxjs/toolkit";

import { apolloClient } from "../../graphql/client";
import { GET_PAYMENT_STATUS } from "../../graphql/queries/payments";



export const getPaymentStatus = createAsyncThunk(
  "payments/getPaymentStatus",
  async (sessionId: string) => {
    const { data } = await apolloClient.query({
      query: GET_PAYMENT_STATUS,
      variables: {
        sessionId,
      },
      fetchPolicy: "network-only",
    });

    return data.getPaymentStatus;
  }
);
