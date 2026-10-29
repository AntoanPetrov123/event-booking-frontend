import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getEvents } from "../../store/events/eventsActions";
import type { AppDispatch, RootState } from "../../store/store";

import "./Events.css";

const Events = () => {
  const dispatch = useDispatch<AppDispatch>();

  const eventsList = useSelector(
    (state: RootState) => state.events.events.lists.adminEvents
  );

  const events = eventsList ?? {
    data: [],
    total: null,
    page: null,
    itemsPerPage: null,
    totalPages: null,
    loading: false,
    error: null,
  };

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] = useState({
    city: "",
    hall: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    sortBy: "startDate",
    sortOrder: "ASC" as "ASC" | "DESC",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);

      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(
      getEvents({
        listKey: "adminEvents",

        search: debouncedSearch.trim().toLowerCase() || null,

        filter: {
          city: filters.city.trim().toLowerCase() || null,

          hall: filters.hall.trim().toLowerCase() || null,

          status: filters.status || null,

          dateFrom: filters.dateFrom || null,

          dateTo: filters.dateTo || null,
        },

        pagination,
      })
    );
  }, [dispatch, debouncedSearch, filters, pagination]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleSort = (sortBy: string) => {
    setPagination((prev) => ({
      ...prev,

      page: 1,

      sortBy,

      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === "ASC" ? "DESC" : "ASC",
    }));
  };

  return (
    <div className="admin-events">
      <div className="admin-events__header">
        <div>
          <h1>Events</h1>

          <p>Manage all events in the system.</p>
        </div>

        <Link to="/admin/events/create" className="admin-events__create">
          + Create Event
        </Link>
      </div>

      <div className="admin-events__filters">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
        />

        <input
          type="text"
          name="hall"
          placeholder="Hall"
          value={filters.hall}
          onChange={handleFilterChange}
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All statuses</option>

          <option value="ACTIVE">Active</option>

          <option value="INACTIVE">Inactive</option>

          <option value="CANCELLED">Cancelled</option>
        </select>

        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleFilterChange}
        />

        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleFilterChange}
        />
      </div>

      {events.loading && <p>Loading...</p>}

      {events.error && <p className="admin-events__error">{events.error}</p>}

      {!events.loading && (
        <div className="admin-events__table-wrapper">
          <table className="admin-events__table">
            <thead>
              <tr>
                <th>ID</th>

                <th onClick={() => handleSort("title")}>Event</th>

                <th onClick={() => handleSort("city")}>City</th>

                <th>Hall</th>

                <th onClick={() => handleSort("startDate")}>Date</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.data.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>

                  <td>
                    <div className="admin-events__event">
                      {event.image && (
                        <img src={event.image} alt={event.title} />
                      )}

                      <span>{event.title}</span>
                    </div>
                  </td>

                  <td>{event.city}</td>

                  <td>{event.hall}</td>

                  <td>
                    {event.startDate} {event.startTime}
                  </td>

                  <td>
                    <span
                      className={`admin-events__status admin-events__status--${event.status.toLowerCase()}`}
                    >
                      {event.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-events__actions">
                      <Link to={`/admin/events/${event.id}/edit`}>Edit</Link>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("delete", event.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!events.data.length && (
                <tr>
                  <td colSpan={7} className="admin-events__empty">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!!events.totalPages && events.totalPages > 1 && (
        <div className="admin-events__pagination">
          <button
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {events.totalPages}
          </span>

          <button
            disabled={pagination.page === events.totalPages}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
