import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import close from "../../assets/icons/close.svg";
import { useTicketStore } from "../../store/ticketStore";
import { Link } from "react-router-dom";

export const Modal = ({
  isOpen,
  closeModal,
  idEvent,
  eventName,
  startDate,
  ticketPrice,
  ticketType,
  quantityAvailable,
  image,
  id_user,
}) => {
  const count = useTicketStore((state) => state.count);
  const incrementCount = useTicketStore((state) => state.incrementCount);
  const decrementCount = useTicketStore((state) => state.decrementCount);
  const addToCartTickets = useTicketStore((state) => state.addToCartTickets);

  const total = count * ticketPrice;
  const handleAddToCart = () => {
    addToCartTickets({
      image: image,
      eventName: eventName,
      idEvent: idEvent,
      ticketPrice: ticketPrice,
      id_user: id_user,
      total,
      count,
    });
  };

  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="absolute bg-white p-8 rounded-lg">
        <p
          className="cursor-pointer text-black absolute top-4 right-4"
          onClick={closeModal}
        >
          <img src={close} />
        </p>

        <div className="flex flex-col">
          <p className="flex justify-center text-2xl py-3 border-b-4">
            Complete your purchase
          </p>
          <p className="flex justify-end text-xl ">{eventName}</p>
          <p className="flex justify-end text-md border-b-4 italic">
            Begins on {startDate}
          </p>
        </div>
        <h2 className="flex justify-center rounded p-1 mt-2 font-semibold text-lg text-button1 bg-base w-20 ">
          TICKETS
        </h2>
        <div className="flex flex-col w-full justify-between align-middle items-center border-2 border-deco my-3 text-2xl p-2 rounded-md">
          <div className="flex w-full mx-4 gap-16 align-middle items-center justify-between py-2">
            <h2>{ticketType}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <img
                  src={minus}
                  onClick={decrementCount}
                  className="cursor-pointer"
                  alt="minus"
                />
                <p>{count}</p>
                <img
                  src={plus}
                  onClick={incrementCount}
                  className="cursor-pointer"
                  alt="plus"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="flex justify-between text-xl">
              Price <span className="text-deco font-bold">$ {ticketPrice}</span>
            </p>
            <p className="text-sm italic">*Available: {quantityAvailable}</p>
          </div>
          <div className="flex w-full justify-between">
            Total: <span className="flex justify-between">$ {total}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/purchase">
            <button
              className="flex font-bold px-4 py-2 bg-otro rounded text-base items-center justify-end mt-4 text-xl hover:scale-110 transition-transform duration-300"
              onClick={handleAddToCart}
            >
              Check out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
