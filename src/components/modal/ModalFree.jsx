import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import close from "../../assets/icons/close.svg";
import { useTicketStore } from "../../store/ticketStore";
import api from "../../api/events";

import { toast } from "sonner";
import { useEffect, useState } from "react";

export const ModalFree = ({
  isOpen,
  closeModal,
  idEvent,
  eventName,
  startDate,
  ticketPrice,
  id_user,
  city,
  location,
  startHour,
}) => {
  const count = useTicketStore((state) => state.count);
  const incrementCount = useTicketStore((state) => state.incrementCount);
  const decrementCount = useTicketStore((state) => state.decrementCount);
  const clearTickets = useTicketStore((state) => state.clearTickets);
  const [ticketsDisponibles, setTicketsDisponibles] = useState(5000);

  useEffect(() => {
    setTicketsDisponibles(5000 - count);
  }, [count]);
  const generateTicketId = () => {
    const min = 500;
    const max = 5000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const id_ticket = generateTicketId();

  if (!isOpen) return null;

  const handleNotisAdd = () => {
    toast.success("Ticket Saved");
  };
  const handleNotisRem = () => {
    if (count > 0) {
      toast.warning("Ticket Removed");
    }
  };

  const handleIncrementCount = () => {
    if (count < ticketsDisponibles) {
      incrementCount();
      handleNotisAdd();
    } else {
      toast.error("Maximum tickets reached");
    }
  };
  const handleGrabTickets = async () => {
    try {
      const response = await api.post("/payment/create-checkout-session", {
        id_user,
        eventName,
        idEvent,
        quantity: count,
        id_ticket: 9, //llega por parámetro
      });

      if (response.status === 200) {
        toast.success("Great! U got your tickets! Enjoy the event 💖!");
        clearTickets();
        console.log("Ticket grabbed successfully");
      } else {
        toast.error("We couldn't proccess your request, try later, please");
        console.error("Failed to grab tickets");
      }
    } catch (error) {
      // Error al realizar la solicitud, manejarlo aquí
      console.error("Error grabbing tickets:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
      <div className="absolute bg-white p-8 rounded-lg w-4/12">
        <p
          className="cursor-pointer text-black absolute top-4 right-4"
          onClick={closeModal}
        >
          <img src={close} />
        </p>

        <div className="flex flex-col">
          <p className="flex justify-center text-2xl py-3 border-b-4">
            Get your tickets now!
          </p>
          <p className="flex w-full justify-end text-sm">
            Code: {idEvent}-{id_ticket}-{id_user}
          </p>
          <p className="flex justify-end text-xl ">{eventName}</p>
          <p className="flex justify-end text-md border-b-4 italic">
            Begins on {startDate} at
            <span className="font-bold ml-2">{startHour}</span>
          </p>
          <span className="flex justify-end">{city}</span>
          <span className="flex justify-end">{location}</span>
        </div>
        <h2 className="flex justify-center rounded p-1 mt-2 font-semibold text-lg text-button1 bg-base w-20 ">
          TICKETS
        </h2>
        <div className="flex flex-col w-full justify-between align-middle items-center border-2 border-deco my-3 text-2xl p-2 rounded-md">
          <div className="flex w-full mx-4 gap-16 align-middle items-center justify-between py-2">
            <h2>Free</h2>
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <img
                  src={minus}
                  onClick={() => {
                    decrementCount();
                    handleNotisRem();
                  }}
                  className="cursor-pointer"
                  alt="minus"
                />
                <p>{count}</p>
                <img
                  src={plus}
                  onClick={handleIncrementCount}
                  className="cursor-pointer"
                  alt="plus"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="flex justify-between text-xl"></p>
            <p className="text-sm italic">*Available {ticketsDisponibles}</p>
          </div>
          <div className="flex w-full justify-between">
            Total:
            {ticketPrice > 0 ? (
              <span className="flex justify-between">${0}</span>
            ) : (
              <span className="flex justify-between">${ticketPrice}</span>
            )}
          </div>
        </div>
        <p className="flex w-full italic font-bold justify-end -mt-3">
          *Select at least 1 ticket
        </p>
        <div className="flex justify-end">
          <button
            className={`flex font-bold px-4 py-2 rounded text-base items-center justify-end mt-4 text-xl transition-transform duration-300 ${
              count > 0
                ? "bg-otro hover:scale-110 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={count === 0}
            onClick={handleGrabTickets}
          >
            Grab my Tickets
          </button>
        </div>
      </div>
    </div>
  );
};
