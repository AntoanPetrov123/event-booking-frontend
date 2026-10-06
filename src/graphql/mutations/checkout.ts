import { gql } from "@apollo/client";

export const CREATE_CHECKOUT_SESSION = gql`
  mutation createCheckoutSession($input: [CheckoutItemInput!]!) {
    createCheckoutSession(input: $input) {
        checkoutUrl
    }
  }
`;