import React from "react";
import { useTicketStore } from "../../store/ticketStore";
import { BackButton } from "../../components/buttons/Buttons";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";

const Purchase = () => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const cartTickets = useTicketStore((state) => state.cartTickets);
  const removeFromCartTickets = useTicketStore(
    (state) => state.removeFromCartTickets
  );
  const checkout = useTicketStore((state) => state.checkout);

  const finalAmount = cartTickets.reduce(
    (total, item) => total + item.total,
    0
  );

  const handleRemoveFromCart = (idEvent) => {
    removeFromCartTickets(idEvent);
  };

  const handleCheckout = async () => {
    try {
      await checkout(finalAmount); // Pasa el valor total como argumento
      console.log("Checkout exitoso");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <>
      {isLogged ? ( // Verifica si el usuario está autenticado
        <div className="flex flex-col mx-11 gap-5">
          {cartTickets.length > 0 &&
            cartTickets.map((item, index) => (
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
            ))}
          <div className="flex text-2xl justify-end">
            <p className="font-bold">
              Total:{" "}
              <span className="border-t-4 border-deco">$ {finalAmount}</span>
            </p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
          <BackButton />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col px-20 py-10 gap-2 border-2 border-gray-400 shadow-lg">
            <p className="text-base text-center">
              Sign In to see your{" "}
              <span className="text-deco font-bold">saved tickets!</span>
            </p>
            <Link to="/login">
              <button className="bg-otro text-xl text-gray-700 font-semibold py-1 rounded w-full">
                Sign In
              </button>
            </Link>
            <p className="text-base text-center mt-5">
              Don't have an acocunt yet 🙀?!
            </p>
            <Link to="/register">
              <button className="bg-deco text-button1 font-semibold text-xl py-1 rounded w-full">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Purchase;
