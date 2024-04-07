import { useGetEvent } from "../../hooks/useEvents";
import { formatHour, formatDate } from "../../helpers/formatters";
import calendar from "../../assets/icons/calendar.svg";
import clock from "../../assets/icons/clock.svg";
import buy from "../../assets/icons/buy.svg";
import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import { useTicketStore } from "../../store/ticketStore";
import { BackButton } from "../../components/buttons/Buttons";
import cosmic from "../../assets/icons/cosmic.svg";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal/Modal";

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incrementTicketCount = useTicketStore(
    (state) => state.incrementTicketCount
  );
  const decrementTicketCount = useTicketStore(
    (state) => state.decrementTicketCount
  );
  const ticketCounts = useTicketStore((state) => state.ticketCounts);

  const handleAddTicket = (ticketType) => {
    incrementTicketCount(ticketType);
  };

  const handleRemoveTicket = (ticketType) => {
    decrementTicketCount(ticketType);
  };
  useEffect(() => {
    console.log("Modal abierto:", isModalOpen);
  }, [isModalOpen]);
  const { data, isLoading } = useGetEvent();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>There are no details for this event.</div>;

  const hasSelectedTicket = Object.values(ticketCounts).some(
    (count) => count > 0
  );

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-center">
        <div className="relative">
          <p className="absolute text-7xl text-left mx-5 w-3/2 p-3 font-extrabold mt-10 -mb-5 text-white border-b-8 border-otro">
            {data.name}
          </p>
          <div>
            <img src={data.image} className="rounded-3xl z-0" width={1400} />
            <p
              className="relative text-white p-5 w-full h-20 bg-deco mb-5 font-extrabold text-3xl text-end -mt-20 bg-cover bg-top rounded-b-3xl"
              style={{ backgroundImage: `url(${cosmic})` }}
            >
              <span className="border-l-8 border-otro mx-3 pl-3">
                {data.city}
              </span>
            </p>
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-4xl border-otro border-b-4 w-72 pb-1 font-semibold pt-5">
              About this event
            </p>
            <p className="text-3xl mt-5">{data.description}</p>
            <p className="font-semibold mt-10 text-xl border-b-4 w-36 border-otro">
              Date and Time
            </p>
            <div className="flex gap-36 m-2 justify-between">
              <div className="flex gap-5 mt-4">
                <img src={calendar} />
                <div className="flex flex-col text-xl">
                  <p className="w-60">
                    From:{" "}
                    <span className="font-bold">
                      {formatDate(data.start_date)}
                    </span>
                  </p>
                  <p>
                    to:{" "}
                    <span className="font-bold">
                      {formatDate(data.end_date)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="flex justify-end p-2 text-deco font-medium text-2xl">
                  {" "}
                  Where?
                </p>
                <p className="font-medium text-3xl">{data.location}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5 m-2">
                <img src={clock} />
                <div className="flex flex-col w-36 text-xl">
                  <p>
                    From:{" "}
                    <span className="font-bold">
                      {formatHour(data.start_hour)}
                    </span>
                  </p>
                  <p>
                    to:{" "}
                    <span className="font-bold">
                      {formatHour(data.end_hour)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              {data.Sponsors && data.Sponsors.length > 0 && (
                <div className="flex flex-col">
                  <p className="font-semibold mt-5 text-xl border-b-4 w-36 border-otro">
                    Sponsored by:
                  </p>
                  <div className="flex justify-center gap-12 mt-5 ">
                    {data.Sponsors.map((sponsor) => (
                      <img
                        src={sponsor.image}
                        width={170}
                        height={170}
                        className="rounded-3xl border border-slate-300"
                        key={sponsor.image}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="py-2 mt-5 border border-gray-300 p-4 rounded-md shadow-2xl">
                <p className="flex w-full justify-center text-2xl font-semibold border-otro border-b-4 py-2">
                  Ticket Information
                </p>
                {data.Tickets?.map((ticket) => (
                  <div key={ticket.id_ticket}>
                    <div className="flex items-center gap-10 justify-end border-b-2 border-zinc-300">
                      <p className="w-48 py-2 text-xl font-bold">
                        {ticket.ticket_type}
                      </p>
                      {/* <div className="flex gap-2">
                        <img
                          src={minus}
                          className="cursor-pointer"
                          onClick={() => handleRemoveTicket(ticket.ticket_type)}
                        />
                        <p className="flex items-center">
                          {ticketCounts[ticket.ticket_type] || 0}
                        </p>
                        <img
                          src={plus}
                          className="cursor-pointer"
                          onClick={() => handleAddTicket(ticket.ticket_type)}
                        />
                      </div> */}
                      <div className="flex justify-end">
                        <p className="text-xl">
                          <span className="font-semibold">
                            $ {ticket.price}
                          </span>
                          {/* <span className="">
                            avail.
                            {ticket.available_quantity}
                          </span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  {data.Tickets[0] && (
                    <p className="italic text-red-800 font-semibold mb-5">
                      *Sales end on {formatDate(data.Tickets[0]?.sell_by_date)}
                    </p>
                  )}
                </div>
                {data.Tickets[0]?.price ? (
                  <div className="flex justify-center mb-3">
                    <button
                      className="bg-deco text-button1 items-center align-middle gap-3 font-bold py-1 px-4 flex rounded cursor-pointer hover:scale-110 transition-transform duration-300"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      // className={`bg-deco text-button1 items-center align-middle gap-3 font-bold py-1 px-4 flex rounded cursor-pointer hover:scale-110 transition-transform duration-300 ${
                      //   !hasSelectedTicket
                      //     ? "opacity-50 pointer-events-none cursor-not-allowed"
                      //     : ""
                      // }`}
                      // disabled={!hasSelectedTicket}
                      // style={{
                      //   backgroundColor: !hasSelectedTicket ? "#D1D5DB" : "",
                      // }}
                    >
                      <img src={buy} /> Get Tickets
                    </button>
                    <Modal
                      isOpen={isModalOpen}
                      closeModal={() => setIsModalOpen(false)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center mb-3">
                    <p className="flex justify-center font-semibold text-xl py-2 mt-2">
                      FREE
                    </p>
                    <button
                      className="flex font-bold px-4 py-2 bg-deco rounded text-white items-center justify-center mt-4 text-xl hover:scale-110 transition-transform duration-300"
                      onClick={() => {
                        setIsModalOpen(true);
                        console.log("Modal abierto:", isModalOpen);
                      }}
                    >
                      <span className="mx-3">Get Tickets</span>
                    </button>
                    <Modal
                      isOpen={isModalOpen}
                      closeModal={() => setIsModalOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default EventDetail;
