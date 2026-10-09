import { gql } from "@apollo/client";

export const GET_USER_TICKETS = gql`
  query getUserTickets {
    getUserTickets {
      id
      ticketName
      quantity
      unitPrice

      event {
        id
        title
        city
        hall
        startDate
        startTime
        image
      }
    }
  }
`;
