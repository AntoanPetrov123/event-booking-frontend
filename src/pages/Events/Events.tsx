import EventCard from "../../components/Elements/EventCard";

import "./Events.css";

const Events = () => {
  const events = [
    {
      id: 1,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/070/868/532/small/crowd-silhouette-under-stage-lights-celebrating-event-free-photo.jpg",
      title: "First Event",
      location: "Sofia",
      startTime: "19:30",
      endTime: "22:00",
      startDate: "02-12-2026",
      endDate: "02-12-2026"
    },
    {
      id: 2,
      image: "",
      title: "New Year Event",
      location: "Plovdiv",
      startTime: "20:00",
      endTime: "01:00",
      startDate: "31-12-2026",
      endDate: "01-01-2027"
    },
  ];

  return (
    <div className="events-page">
      <div className="events-page__header">
        <h1 className="events-page__title">
          Upcoming Events
        </h1>

        <p className="events-page__subtitle">
          Discover events and book your tickets
        </p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;