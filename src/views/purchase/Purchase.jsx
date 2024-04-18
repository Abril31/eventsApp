import { useTicketStore } from "../../store/ticketStore";
import { BackButton } from "../../components/buttons/Buttons";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import trash from "../../assets/icons/trash.svg";
import { BiMinus, BiPlus } from "react-icons/bi";
import { loadStripe } from "@stripe/stripe-js";

const Purchase = () => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const cartTickets = useTicketStore((state) => state.cartTickets);
  const incrementCount = useTicketStore((state) => state.incrementCount);
  const decrementCount = useTicketStore((state) => state.decrementCount);
  const clearTickets = useTicketStore((state) => state.clearTickets);
  console.log("Estos son mis tickets agregados al Carrito: ", cartTickets);

  const removeFromCartTickets = useTicketStore(
    (state) => state.removeFromCartTickets
  );

  const Payment = useTicketStore((state) => state.Payment);
  const Checkout = useTicketStore((state) => state.Checkout);
  const finalAmount = cartTickets.reduce(
    (total, item) => total + item.total,
    0
  );
  console.log("ACa", cartTickets);
  const handleRemoveFromCart = (idEvent) => {
    removeFromCartTickets(idEvent);
  };

  //Payment

  const handleCheckout = async () => {
    try {
      await Payment(finalAmount); // Pasa el valor total como argumento
      
      console.log("Checkout exitoso",Checkout);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center">
      {isLogged ? (
        <div className="flex flex-col w-full mx-24 gap-5 justify-center items-center py-4 mt-10 px-48">
          <div className="flex w-full justify-between border-y-2 border-deco text-xl font-semibold py-3 ">
            <p className="text-center text-xl flex-none px-64 ml-4">Event</p>
            <p className="w-20 text-center">Price</p>
            <p className="">Quantity</p>
            <p className=" mr-5">Total</p>
          </div>
          {cartTickets.length > 0 ? (
            cartTickets.map((item, index) => (
              <div
                key={index}
                className="flex w-full justify-between border-b-2 border-gray-300 pb-4 text-xl align-middle items-center"
              >
                <img src={item.image} className="flex" width={290} />
                <div className="flex w-full justify-between">
                  <div className="flex flex-col w-72 px-10">
                    <p className="text-2xl font-bold">{item.eventName}</p>{" "}
                    <p className="text-md">{item.location}</p>{" "}
                    <p className="text-md">
                      Ticket:{" "}
                      <span className="text-deco font-semibold">
                        {item.ticketType}
                      </span>
                    </p>
                  </div>
                  <p className=" w-20 text-center ml-4">$ {item.ticketPrice}</p>
                  <div className="flex w-20 items-center h-9 ml-6">
                    <BiMinus
                      size={50}
                      className="cursor-pointer bg-deco text-white font-extrabold h-6"
                      onClick={() => decrementCount(item.idEvent)}
                    />
                    <p className=" w-20 text-center">{item.count}</p>
                    <BiPlus
                      size={50}
                      className="cursor-pointer bg-deco text-white font-extrabold h-6"
                      onClick={() => incrementCount(item.idEvent)}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold text-deco">
                      $ {item.total.toFixed(2)}
                    </p>
                    <button
                      className="flex justify-center rounded px-2 cursor-pointer h-6 w-16 mx-3 text-white mt-5"
                      onClick={() => handleRemoveFromCart(item.idEvent)}
                    >
                      <img src={trash} alt="Remove" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-lg">
              <p>It seems u don't have any tickets in your cart 😔!</p>
              <p>
                Looking for some interesting events? Check{" "}
                <Link to="/">
                  <span className="font-bold text-deco text-2xl">here!</span>
                </Link>
              </p>
            </div>
          )}
          <div className="flex  text-2xl justify-end w-full">
            <p className="flex items-center font-bold gap-2">
              Total:
              <span className="w-28 text-center">$ {finalAmount}</span>
            </p>
          </div>
          <div className="flex justify-between w-full">
            <button
              className="bg-red-600 px-2 rounded text-white font-bold"
              onClick={clearTickets}
            >
              Remove All
            </button>
            <button
              onClick={handleCheckout}
              disabled={finalAmount === 0}
              className={`rounded px-3 py-2 font-bold text-xl ${
                finalAmount === 0
                  ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                  : "bg-otro text-gray-700 cursor-pointer hover:scale-110 transition-transform duration-300"
              }`}
            >
              Payment
            </button>
          </div>
          <div className="flex w-full">
            <BackButton />
          </div>
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
    </div>
  );
};

export default Purchase;
