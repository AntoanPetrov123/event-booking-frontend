import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../../Elements/EventCard";
import FilterPopup from "../FilterPopup";
import SortPopup from "../SortPopup";
import CustomButton from "../../FormElements/Buttons/CustomButton";

import { getEvents } from "../../../store/events/eventsActions";
import type {
  AppDispatch,
  RootState,
} from "../../../store/store";

import "./EventsList.css";

type EventsListProps = {
  listKey: string;

  title?: string;
  subtitle?: string;

  showSearch?: boolean;
  showSort?: boolean;
  showFilters?: boolean;

  itemsPerPage?: number;

  defaultSortBy?: string;
  defaultSortOrder?: "ASC" | "DESC";

  initialFilters?: {
    city?: string | null;
    hall?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
  };
};

const emptyFilter = {
  city: "",
  hall: "",
  dateFrom: "",
  dateTo: "",
};

const EventsList = ({
  listKey,
  title,
  subtitle,

  showSearch = true,
  showSort = true,
  showFilters = true,

  itemsPerPage = 4,

  defaultSortBy = "startDate",
  defaultSortOrder = "ASC",

  initialFilters = {},
}: EventsListProps) => {
  const initialFilterState = {
    city: initialFilters.city ?? "",
    hall: initialFilters.hall ?? "",
    dateFrom: initialFilters.dateFrom ?? "",
    dateTo: initialFilters.dateTo ?? "",
  };

  const [transitionDirection, setTransitionDirection] =
    useState<"left" | "right">("right");

  const [filter, setFilter] =
    useState(initialFilterState);

  const [draftFilter, setDraftFilter] =
    useState(initialFilterState);

  const [pagination, setPagination] =
    useState({
      page: 1,
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder,
      itemsPerPage,
    });

  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const [
    isSortOpen,
    setIsSortOpen,
  ] = useState(false);

  const dispatch =
    useDispatch<AppDispatch>();

  const eventsList = useSelector(
    (state: RootState) =>
      state.events.events.lists[listKey]
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

  const {
    loading,
    error,
  } = events;

  useEffect(() => {
    if (!showSearch) {
      setDebouncedSearch("");
      return;
    }

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

    return () =>
      clearTimeout(timer);
  }, [search, showSearch]);

  useEffect(() => {
    dispatch(
      getEvents({
        listKey,

        filter: {
          city:
            filter.city
              ?.toLowerCase()
              ?.trim() || null,

          hall:
            filter.hall
              ?.toLowerCase()
              ?.trim() || null,

          dateFrom:
            filter.dateFrom || null,

          dateTo:
            filter.dateTo || null,
        },

        pagination,

        search: showSearch
          ? debouncedSearch
              ?.toLowerCase()
              ?.trim() || null
          : null,
      })
    );
  }, [
    dispatch,
    listKey,
    filter,
    pagination,
    debouncedSearch,
    showSearch,
  ]);

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

  const handlePageChange = (
    page: number
  ) => {
    setTransitionDirection(
      page > pagination.page
        ? "left"
        : "right"
    );

    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const showToolbar =
    showSearch ||
    showSort ||
    showFilters;

  return (
    <section className="events-list">
      {(title || subtitle) && (
        <div className="events-list__header">
          <div>
            {title && (
              <h2 className="events-list__title">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="events-list__subtitle">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {showToolbar && (
        <div className="events-list__toolbar">
          {showSearch && (
            <div className="events-list__search">
              <input
                type="text"
                value={search}
                placeholder="Search events..."
                onChange={
                  handleSearchChange
                }
              />
            </div>
          )}

          {(showFilters ||
            showSort) && (
            <div className="events-list__actions">
              {showFilters && (
                <div className="events-list__popup-wrapper">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      if (
                        isFilterOpen
                      ) {
                        setIsFilterOpen(
                          false
                        );
                      } else {
                        handleOpenFilters();
                      }
                    }}
                  >
                    Filters
                  </CustomButton>

                  {isFilterOpen && (
                    <FilterPopup
                      filter={
                        draftFilter
                      }
                      onChange={
                        handleDraftFilterChange
                      }
                      onClear={
                        handleClearFilters
                      }
                      onApply={
                        handleApplyFilters
                      }
                    />
                  )}
                </div>
              )}

              {showSort && (
                <div className="events-list__popup-wrapper">
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsSortOpen(
                        (prev) =>
                          !prev
                      );

                      setIsFilterOpen(
                        false
                      );
                    }}
                  >
                    Sort
                  </CustomButton>

                  {isSortOpen && (
                    <SortPopup
                      onSort={
                        handleSort
                      }
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="events-list__error">
          {error}
        </div>
      )}

      {loading && (
        <p className="events-list__loading">
          Loading...
        </p>
      )}

      {!loading &&
        !events.data.length && (
          <div className="events-list__empty">
            No events found.
          </div>
        )}

      {!!events.data.length && (
        <div className="events-list__grid-wrapper">
          <div
            key={pagination.page}
            className={`events-list__grid events-list__grid--${transitionDirection}`}
          >
            {events.data.map(
              (event) => (
                <EventCard
                  key={event.id}
                  {...event}
                />
              )
            )}
          </div>
        </div>
      )}

      {!!events.totalPages &&
        events.totalPages > 1 && (
          <div className="events-list__pagination">
            <CustomButton
              type="button"
              variant="secondary"
              disabled={
                pagination.page === 1
              }
              onClick={() =>
                handlePageChange(
                  pagination.page - 1
                )
              }
            >
              {"<"}
            </CustomButton>

            <span className="events-list__pagination-info">
              Page{" "}
              {pagination.page} of{" "}
              {events.totalPages}
            </span>

            <CustomButton
              type="button"
              variant="secondary"
              disabled={
                pagination.page ===
                events.totalPages
              }
              onClick={() =>
                handlePageChange(
                  pagination.page + 1
                )
              }
            >
              {">"}
            </CustomButton>
          </div>
        )}
    </section>
  );
};

export default EventsList;