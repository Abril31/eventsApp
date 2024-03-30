import arrowLeft from "../../assets/icons/arrowLeft.svg";
import arrowRight from "../../assets/icons/arrowRight.svg";
const Paginate = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        className={`${
          currentPage === 1
            ? "bg-gray-50 text-gray-400 py-2 px-2 font-bold cursor-not-allowed"
            : "bg-zinc-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2"
        } `}
        onClick={handlePrevClick}
      >
        <img src={arrowLeft} alt="Arrow Left" />
      </button>
      {/* //Crear el array y obtener los numeros del array con keys */}
      {[...Array(totalPages).keys()].map((num) => (
        <div className="" key={num + 1}>
          <button
            className={`bg-base py-2 px-4 text-white hover:bg-deco ${
              num + 1 === currentPage ? "font-bold bg-deco" : ""
            }`}
            onClick={() => setCurrentPage(num + 1)}
          >
            {num + 1}
          </button>
        </div>
      ))}

      <button
        className={`${
          currentPage === totalPages
            ? "bg-gray-50 text-gray-400 py-2 px-4 font-bold cursor-not-allowed"
            : "bg-zinc-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2"
        } `}
        onClick={handleNextClick}
      >
        <img src={arrowRight} alt="Arrow Right" />
      </button>
    </div>
  );
};

export default Paginate;
