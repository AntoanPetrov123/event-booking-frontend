import CustomButton from "../FormElements/Buttons/CustomButton";

import "./EventCard.css";

type EventCardProps = {
  id: number;
  image: string | null;
  title: string;
  city: string;
  hall: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
};

const EventCard = ({
  id,
  image,
  title,
  city,
  hall,
  startTime,
  endTime,
  startDate,
  endDate,
}: EventCardProps) => {
  return (
    <div className="event-card">
      <img
        className="event-card__image"
        src={image || "https://placehold.co/600x400?text=Event"}
        alt={title}
      />

      <div className="event-card__content">
        <h2 className="event-card__title">{title}</h2>

        <div className="event-card__info">
          <p className="event-card__info-item">
            📍 {city} / {hall}
          </p>
          <p className="event-card__info-item">
            📅 {startDate} - {endDate}
          </p>

          <p className="event-card__info-item">
            🕒 {startTime} - {endTime}
          </p>
        </div>

        <div className="event-card__footer">
          <CustomButton
            to={`/events/${id}`}
            variant="primary"
            fullWidth
          >
            View Details
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default EventCard;