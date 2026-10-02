import EventsList from "../../components/Events/EventsList/EventsList";

import "./Events.css";

const Events = () => {
  return (
    <>
      <div className="events-page">
        <EventsList
          listKey="upcoming"
          title="Upcoming Events"
          subtitle="Discover events and book your tickets"
          showSearch
          showFilters
          showSort
          itemsPerPage={4}
        />
      </div>
      <div className="events-page">
        <EventsList
          listKey="sofia"
          title="Events in Sofia"
          showSearch={false}
          showFilters={false}
          showSort={false}
          itemsPerPage={4}
          initialFilters={{
            city: "Sofia",
          }}
        />
      </div>
    </>
  );
};

export default Events;
