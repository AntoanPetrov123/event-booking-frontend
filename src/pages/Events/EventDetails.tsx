import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store/store";
import { getEvent } from "../../store/events/eventsActions";

import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    if (id) {
      dispatch(getEvent(Number(id)));
    }
  }, [id, dispatch]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-details">
      <div className="event-details__hero">
        <img
          src={event.image}
          alt={event.title}
          className="event-details__image"
        />

        <div className="event-details__header">
          <span className="event-details__id">
            Event #{event.id}
          </span>

          <h1 className="event-details__title">
            {event.title}
          </h1>

          <div className="event-details__meta">
            <span>📍 {event.hall}</span>
            <span>{event.city}</span>
            <span>📅 {event.startDate} - {event.endDate}</span>
            <span>🕒 {event.startTime} - {event.endTime}</span>
          </div>
        </div>
      </div>

      <div className="event-details__content">
        <section className="event-details__section">
          <h2>About the event</h2>

          <p>{event.description}</p>
        </section>

        <section className="event-details__section">
          <h2>Tickets</h2>

          {/* <div className="ticket-types">
            {event.tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="ticket-card"
              >
                <div>
                  <h3>{ticket.name}</h3>
                  <p>Taken seats: {ticket.usedPlaces} / {ticket.totalPlaces}</p>
                  <p>{ticket.description}</p>
                </div>

                <div className="ticket-card__bottom">
                  <span className="ticket-card__price">
                    €{ticket.price}
                  </span>

                  <CustomButton variant="primary">
                    Select Ticket
                  </CustomButton>
                </div>
              </div>
            ))}
          </div> */}
        </section>
      </div>
    </div>
  );
};

  // const event = {
  //   id: 1,
  //   title: "First Event",
  //   hall: "Arena Sofia",
  //   city: "Sofia",
  //   startDate: "02-12-2026",
  //   endDate: "02-12-2026",
  //   startTime: "19:30",
  //   endTime: "22:00",
  //   description:
  //     "A live event with music, entertainment and special guests. Doors open 1 hour before the event starts.",
  //   image:
  //     "https://static.vecteezy.com/system/resources/thumbnails/070/868/532/small/crowd-silhouette-under-stage-lights-celebrating-event-free-photo.jpg",
  //   tickets: [
  //     {
  //       id: 1,
  //       name: "Front Rows",
  //       description: "Rows 1-4",
  //       price: 120,
  //       totalPlaces: 20,
  //       usedPlaces: 20,
  //     },
  //     {
  //       id: 2,
  //       name: "Middle Rows",
  //       description: "Rows 5-8",
  //       price: 80,
  //       totalPlaces: 30,
  //       usedPlaces: 30,
  //     },
  //     {
  //       id: 3,
  //       name: "Back Rows",
  //       description: "Rows 9-12",
  //       price: 50,
  //       totalPlaces: 50,
  //       usedPlaces: 24,
  //     },
  //   ],
  // };

  

export default EventDetails;