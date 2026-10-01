import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../../store/store";
import { getEvent } from "../../store/events/eventsActions";

import "./EventDetails.css";
import CustomButton from "../../components/FormElements/Buttons/CustomButton";
import { addToCart } from "../../store/cart/cartSlice";

const EventDetails = () => {
  type TicketCount = {
    ticketId: number;
    ticketCount: number;
  };

  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [selectedTickets, setSelectedTickets] = useState<TicketCount[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(getEvent(Number(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!event?.tickets) return;

    const pendingTicketsRaw = sessionStorage.getItem("pendingTickets");

    const pendingData = pendingTicketsRaw
      ? JSON.parse(pendingTicketsRaw)
      : null;

      setSelectedTickets(
      event.tickets.map((ticket) => {
        const pendingTicket = pendingData?.tickets?.find(
          (item: { ticketId: number; ticketCount: number }) =>
            item.ticketId === ticket.id
        );

        return {
          ticketId: ticket.id,
          ticketCount:
            pendingData?.eventId === event.id
              ? pendingTicket?.ticketCount ?? 0
              : 0,
        };
      })
    );
  }, [event?.tickets]);

  const getTicketCount = (ticketId: number) => {
    return (
      selectedTickets.find((ticket) => ticket.ticketId === ticketId)
        ?.ticketCount ?? 0
    );
  };

  const increaseTicketCount = (
    ticketId: number,
    totalPlaces: number,
    usedPlaces: number
  ) => {
    const availablePlaces = totalPlaces - usedPlaces;

    setSelectedTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.ticketId !== ticketId) {
          return ticket;
        }

        if (ticket.ticketCount >= availablePlaces) {
          return ticket;
        }

        return {
          ...ticket,
          ticketCount: ticket.ticketCount + 1,
        };
      })
    );
  };

  const decreaseTicketCount = (ticketId: number) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.ticketId !== ticketId) {
          return ticket;
        }

        if (ticket.ticketCount <= 0) {
          return ticket;
        }

        return {
          ...ticket,
          ticketCount: ticket.ticketCount - 1,
        };
      })
    );
  };

  const handleAddToCart = () => {
    const tickets = selectedTickets.filter(
      (ticket) => ticket.ticketCount > 0
    );

    if (!tickets.length) {
      return;
    }

    if (!isAuthenticated) {
      sessionStorage.setItem(
        "pendingTickets",
        JSON.stringify({
          eventId: event.id,
          tickets: tickets,
        })
      );

      navigate("/login", {
        state: {
          redirectTo: `/events/${event.id}`,
        },
      });

      return;
    }

    tickets.forEach((selectedTicket) => {
      const ticket = event.tickets.find(
        (ticket) => ticket.id === selectedTicket.ticketId
      );

      if (!ticket) {
        return;
      }

      dispatch(
        addToCart({
          ticketId: ticket.id,
          eventId: event.id,
          name: ticket.name,
          price: ticket.discountPrice ?? ticket.price,
          quantity: selectedTicket.ticketCount,
        })
      );
    });

    setSelectedTickets([]);
    sessionStorage.removeItem("pendingTickets");
  };

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
          <span className="event-details__id">Event #{event.id}</span>

          <h1 className="event-details__title">{event.title}</h1>

          <div className="event-details__meta">
            <span>📍 {event.hall}</span>
            <span>{event.city}</span>
            <span>
              📅 {event.startDate} - {event.endDate}
            </span>
            <span>
              🕒 {event.startTime} - {event.endTime}
            </span>
          </div>
        </div>
      </div>

      <div className="event-details__content">
        <section className="event-details__section">
          <h2>About the event</h2>

          <p>{event.description}</p>
        </section>

        <section className="event-details__section">
          <div className="tickets-header">
            <h2>Tickets</h2>

            <CustomButton
              onClick={handleAddToCart}
              variant="primary"
              disabled={!selectedTickets.some((ticket) => ticket.ticketCount > 0)}
            >
              Add To Cart
            </CustomButton>
          </div>

          <div className="ticket-types">
            {event.tickets.map((ticket) => {
              const ticketCount = getTicketCount(ticket.id);

              const availablePlaces = Math.max(
                0,
                ticket.totalPlaces - ticket.usedPlaces
              );

              return (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-card__content">
                    <div>
                      <h3 className="ticket-card__title">{ticket.name}</h3>

                      <p className="ticket-card__description">
                        {ticket.description}
                      </p>
                    </div>

                    <div className="ticket-card__availability">
                      {availablePlaces > 0 ? (
                        <>
                          <span className="ticket-card__availability-dot" />
                          {availablePlaces} tickets available
                        </>
                      ) : (
                        <span className="ticket-card__sold-out">Sold out</span>
                      )}
                    </div>
                  </div>

                  <div className="ticket-card__footer">
                    <div className="ticket-card__price">
                      {ticket.discountPrice ? (
                        <>
                          <span className="ticket-card__price-old">
                            €{ticket.price}
                          </span>

                          <span className="ticket-card__price-current">
                            €{ticket.discountPrice}
                          </span>
                        </>
                      ) : (
                        <span className="ticket-card__price-current">
                          €{ticket.price}
                        </span>
                      )}
                    </div>
                    <div className="ticket-counter">
                      <button
                        type="button"
                        className="ticket-counter__button"
                        disabled={ticketCount === 0}
                        onClick={() => decreaseTicketCount(ticket.id)}
                      >
                        −
                      </button>

                      <span className="ticket-counter__value">
                        {ticketCount}
                      </span>

                      <button
                        type="button"
                        className="ticket-counter__button"
                        disabled={ticketCount >= availablePlaces}
                        onClick={() =>
                          increaseTicketCount(
                            ticket.id,
                            ticket.totalPlaces,
                            ticket.usedPlaces
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventDetails;
