import React from "react";
import { useTicketStore } from "../../store/ticketStore";
import { BackButton } from "../../components/buttons/Buttons";

const Purchase = () => {
  const cartTickets = useTicketStore((state) => state.cartTickets);
  const removeFromCartTickets = useTicketStore(
    (state) => state.removeFromCartTickets
  );
  const finalAmount = cartTickets.reduce(
    (total, item) => total + item.total,
    0
  );
  const handleRemoveFromCart = (idEvent) => {
    removeFromCartTickets(idEvent);
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col mx-40 mt-10">
        {cartTickets.length > 0 &&
          cartTickets.map((item, index) => (
            <div className="flex flex-col">
              <div className="flex gap-4 bg-violet-500 justify-between">
                <p></p>
                <p>Event</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
              </div>
              <div
                key={index}
                className="flex gap-10 w-full bg-green-500 justify-between"
              >
                <img src={item.image} width={200} />
                <div className="flex bg-slate-400 w-full justify-between">
                  <p className="bg-blue-400 w-72">{item.eventName}</p>
                  <p>{item.ticketPrice}</p>
                  <p>{item.count}</p>
                  <div className="flex flex-col items-center">
                    <p>$ {item.total}</p>
                    <button
                      className="flex justify-center bg-red-600 rounded px-2 cursor-pointer h-6 w-16 mx-3 text-white"
                      onClick={() => handleRemoveFromCart(item.idEvent)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="flex text-2xl justify-end">
          <p className="font-bold">
            Total:{" "}
            <span className="border-t-4 border-deco">$ {finalAmount}</span>
          </p>
          <p></p>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default Purchase;
