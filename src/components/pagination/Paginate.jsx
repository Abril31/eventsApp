import leftArrow from "../../assets/icons/arrowLeft.svg";
import rightArrow from "../../assets/icons/arrowRight.svg";

import { usePaginationStore } from "../../store/paginationStore";

const Paginate = ({ totalEvents, eventsPerPage }) => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const getPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 bg-base text-white ${
            currentPage === i ? "bg-deco" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src={leftArrow}
          alt={leftArrow}
          className="bg-otro rounded-full p-1"
        />
      </button>
      {getPageButtons()}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          src={rightArrow}
          alt={rightArrow}
          className="bg-otro rounded-full p-1"
        />
      </button>
    </div>
  );
};

export default Paginate;
