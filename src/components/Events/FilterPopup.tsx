type FilterState = {
  city: string;
  hall: string;
  dateFrom: string;
  dateTo: string;
};

type FilterPopupProps = {
    filter: FilterState;
    onChange: (
      field: keyof FilterState,
      value: string
    ) => void;
    onClear: () => void;
    onApply: () => void;
};

const FilterPopup = ({
  filter,
  onChange,
  onClear,
  onApply,
}: FilterPopupProps) => {
  return (
    <div className="events-popup">
      <h3>Filters</h3>

      <label>
        City
        <input
          type="text"
          value={filter.city}
          onChange={(event) => onChange("city", event.target.value)}
        />
      </label>

      <label>
        Hall
        <input
          type="text"
          value={filter.hall}
          onChange={(event) => onChange("hall", event.target.value)}
        />
      </label>

      <label>
        From date
        <input
          type="date"
          value={filter.dateFrom}
          onChange={(event) => onChange("dateFrom", event.target.value)}
        />
      </label>

      <label>
        To date
        <input
          type="date"
          value={filter.dateTo}
          onChange={(event) => onChange("dateTo", event.target.value)}
        />
      </label>

      <div className="events-popup__actions">
        <button type="button" className="events-popup__clear" onClick={onClear}>
          Clear
        </button>

        <button
          type="button"
          className="events-popup__apply"
          onClick={onApply}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;
