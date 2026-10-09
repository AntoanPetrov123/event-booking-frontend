import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store/store";

import { getUserTickets } from "../../store/users/usersActions";

import "./MyTickets.css";

const MyTickets = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { tickets, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserTickets());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="my-tickets-page">
      <div className="my-tickets-page__header">
        <div>
          <h1>My Tickets</h1>

          <p>View your purchased tickets and event details.</p>
        </div>
      </div>

      {loading && <div className="my-tickets__loading">Loading tickets...</div>}

      {error && <div className="my-tickets__error">{error}</div>}

      {!loading && !error && !tickets?.length && (
        <div className="my-tickets__empty">You don't have any tickets yet.</div>
      )}

      {!!tickets?.length && (
        <div className="my-tickets__list">
          {tickets.map((ticket) => (
            <article key={ticket.id} className="my-ticket-card">
              <div className="my-ticket-card__image-wrapper">
                {ticket.event?.image ? (
                  <img
                    src={ticket.event.image}
                    alt={ticket.event.title}
                    className="my-ticket-card__image"
                  />
                ) : (
                  <div className="my-ticket-card__image-placeholder">Event</div>
                )}
              </div>

              <div className="my-ticket-card__content">
                <div className="my-ticket-card__top">
                  <div>
                    <span className="my-ticket-card__type">
                      {ticket.ticketName}
                    </span>

                    <h2 className="my-ticket-card__title">
                      {ticket.event?.title}
                    </h2>
                  </div>

                  <span className="my-ticket-card__quantity">
                    × {ticket.quantity}
                  </span>
                </div>

                <div className="my-ticket-card__details">
                  <div className="my-ticket-card__detail">
                    <span className="my-ticket-card__label">Location</span>

                    <span>
                      {ticket.event?.hall}
                      {ticket.event?.city && `, ${ticket.event.city}`}
                    </span>
                  </div>

                  <div className="my-ticket-card__detail">
                    <span className="my-ticket-card__label">Date</span>

                    <span>{ticket.event?.startDate}</span>
                  </div>

                  <div className="my-ticket-card__detail">
                    <span className="my-ticket-card__label">Time</span>

                    <span>{ticket.event?.startTime}</span>
                  </div>

                  <div className="my-ticket-card__detail">
                    <span className="my-ticket-card__label">Price</span>

                    <span>€{Number(ticket.unitPrice).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
