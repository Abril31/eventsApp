import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";

export const Modal = ({
  isOpen,
  closeModal,
  idEvent,
  eventName,
  ticketPrice,
  ticketType,
  quantityAvailable,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="absolute bg-white p-8 rounded-lg">
        <p
          className="cursor-pointer text-black absolute top-4 right-4"
          onClick={closeModal}
        >
          X
        </p>
        <p className="text-xl">Complete your purchase</p>
        <p className="text-2xl">{eventName}</p>
        <div className="flex gap-3 border border-deco mx-3 my-3 p-3 text-2xl">
          <p>{ticketType}</p>
          <p>{ticketPrice}</p>
          <p>{quantityAvailable}</p>
        </div>
      </div>
    </div>
  );
};
