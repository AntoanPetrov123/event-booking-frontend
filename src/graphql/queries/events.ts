import { gql } from "@apollo/client";

export const GET_EVENT = gql`
  query getEvent($id: Int!) {
    getEvent(id: $id) {
      id
      title
      hall
      city
      description
      startDate
      endDate
      startTime
      endTime
      image
      status
    }
  }
`;