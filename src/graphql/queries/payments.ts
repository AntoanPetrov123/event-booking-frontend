import { gql } from "@apollo/client";

export const GET_PAYMENT_STATUS = gql`
  query getPaymentStatus($sessionId: String!) {
    getPaymentStatus(sessionId: $sessionId) {
      id
      status
      paymentStatus
      totalAmount
    }
  }
`;
