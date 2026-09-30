type SortOrder = "ASC" | "DESC";

type SortPopupProps = {
  onSort: (
    sortBy: string,
    sortOrder: SortOrder
  ) => void;
};

const SortPopup = ({
  onSort,
}: SortPopupProps) => {
  return (
    <div className="events-popup events-popup--sort">
      <button
        onClick={() =>
          onSort("startDate", "ASC")
        }
      >
        Date: earliest first
      </button>

      <button
        onClick={() =>
          onSort("startDate", "DESC")
        }
      >
        Date: latest first
      </button>

      <button
        onClick={() =>
          onSort("title", "ASC")
        }
      >
        Title: A-Z
      </button>

      <button
        onClick={() =>
          onSort("title", "DESC")
        }
      >
        Title: Z-A
      </button>
    </div>
  );
};

export default SortPopup;