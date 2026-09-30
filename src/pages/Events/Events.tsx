import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../../components/Elements/EventCard";
import FilterPopup from "../../components/Events/FilterPopup";
import SortPopup from "../../components/Events/SortPopup";

import { getEvents } from "../../store/events/eventsActions";
import type { AppDispatch, RootState } from "../../store/store";

import "./Events.css";

const emptyFilter = {
  city: "",
  hall: "",
  dateFrom: "",
  dateTo: "",
};

const Events = () => {
  const [filter, setFilter] = useState(emptyFilter);

  const [draftFilter, setDraftFilter] = useState(emptyFilter);

  const [pagination, setPagination] = useState({
    page: 1,
    sortBy: "startDate",
    sortOrder: "ASC" as "ASC" | "DESC",
    itemsPerPage: 5,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);

      setPagination((prev) => {
        if (prev.page === 1) {
          return prev;
        }

        return {
          ...prev,
          page: 1,
        };
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);


  useEffect(() => {
    dispatch(
      getEvents({
        filter: {
          city: filter.city || null,
          hall: filter.hall || null,
          dateFrom: filter.dateFrom || null,
          dateTo: filter.dateTo || null,
        },
        pagination,
        search: debouncedSearch || null,
      })
    );
  }, [dispatch, filter, pagination, debouncedSearch]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  const handleDraftFilterChange = (
    field: keyof typeof draftFilter,
    value: string
  ) => {
    setDraftFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenFilters = () => {
    setDraftFilter(filter);

    setIsFilterOpen(true);
    setIsSortOpen(false);
  };

  const handleApplyFilters = () => {
    setFilter(draftFilter);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));

    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setDraftFilter(emptyFilter);
    setFilter(emptyFilter);
  
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  
    setIsFilterOpen(false);
  };

  const handleSort = (
    sortBy: string,
    sortOrder: "ASC" | "DESC"
  ) => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
      sortBy,
      sortOrder,
    }));

    setIsSortOpen(false);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="events-page">
      <div className="events-page__header">
        <div>
          <h1 className="events-page__title">
            Upcoming Events
          </h1>

          <p className="events-page__subtitle">
            Discover events and book your tickets
          </p>
        </div>
      </div>

      <div className="events-toolbar">
        <div className="events-search">
          <input
            type="text"
            value={search}
            placeholder="Search events..."
            onChange={handleSearchChange}
          />
        </div>

        <div className="events-toolbar__actions">
          <div className="events-popup-wrapper">
            <button
              type="button"
              className="events-toolbar__button"
              onClick={() => {
                if (isFilterOpen) {
                  setIsFilterOpen(false);
                } else {
                  handleOpenFilters();
                }
              }}
            >
              Filters
            </button>

            {isFilterOpen && (
              <FilterPopup
                filter={draftFilter}
                onChange={handleDraftFilterChange}
                onClear={handleClearFilters}
                onApply={handleApplyFilters}
              />
            )}
          </div>

          <div className="events-popup-wrapper">
            <button
              type="button"
              className="events-toolbar__button"
              onClick={() => {
                setIsSortOpen((prev) => !prev);
                setIsFilterOpen(false);
              }}
            >
              Sort
            </button>

            {isSortOpen && (
              <SortPopup onSort={handleSort} />
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="events-error">
          {error}
        </div>
      )}

      {loading && (
        <p className="events-loading">
          Loading...
        </p>
      )}

      {!loading && !events?.data?.length && (
        <div className="events-empty">
          No events found.
        </div>
      )}

      {!!events?.data?.length && (
        <div className="events-grid">
          {events.data.map((event) => (
            <EventCard
              key={event.id}
              {...event}
            />
          ))}
        </div>
      )}

      {!!events?.totalPages && events.totalPages > 1 && (
        <div className="events-pagination">
          <button
            type="button"
            disabled={pagination.page === 1}
            onClick={() =>
              handlePageChange(pagination.page - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: events.totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              type="button"
              key={page}
              className={
                pagination.page === page
                  ? "active"
                  : ""
              }
              disabled={
                pagination.page === page
              }
              onClick={() =>
                handlePageChange(page)
              }
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={
              pagination.page === events.totalPages
            }
            onClick={() =>
              handlePageChange(pagination.page + 1)
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