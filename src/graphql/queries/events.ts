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
      tickets {
        id
        name
        description
        price
        discountPrice
        totalPlaces
        usedPlaces
        reservedPlaces
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query getEvents($payload: GetEventsPayload!) {
    getEvents(payload: $payload) {
      data {
        id
        title
        hall
        city
        startDate
        endDate
        startTime
        endTime
        image
      }
      total
      page
      itemsPerPage
      totalPages
      listKey
    }
  }
`;