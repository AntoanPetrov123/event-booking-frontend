import { createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "../../graphql/client";
import { CREATE_CHECKOUT_SESSION } from "../../graphql/mutations/checkout";

type OrderInput = {
    ticketId: number;
    quantity: number;
}

export const createCheckoutSession = createAsyncThunk(
    "cart/createCheckoutSession",
    async (input: OrderInput[]) => {
        const { data } = await apolloClient.mutate({
            mutation: CREATE_CHECKOUT_SESSION,
            variables: {
                input,
            },
        });

        return data?.createCheckoutSession;
    }
);