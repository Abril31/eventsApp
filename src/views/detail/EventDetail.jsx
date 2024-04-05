import { useGetEvent } from "../../hooks/useEvents";
import { formatHour, formatDate } from "../../helpers/formatters";
import calendar from "../../assets/icons/calendar.svg";
import clock from "../../assets/icons/clock.svg";
import buy from "../../assets/icons/buy.svg";
import minus from "../../assets/icons/minus.svg";
import plus from "../../assets/icons/plus.svg";
import { toast } from "sonner";
import { useTicketStore } from "../../store/ticketStore";

const EventDetail = () => {
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

  const { data, isLoading } = useGetEvent();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>There are no details for this event.</div>;
  const hasSelectedTicket = Object.values(ticketCounts).some(
    (count) => count > 0
  );

  return (
    <div>
      <div className="flex justify-center h-full">
        <div className="flex m-10 gap-10">
          <div className="flex justify-center">
            <img
              src={data.image}
              width={900}
              height={700}
              className="rounded-md"
            />
          </div>

          <div className="border-t-4 border-b-4 border-deco place-content-evenly">
            <p className="flex mt-2 justify-end w-full bg-deco mb-5 font-extrabold text-xl">
              <span className="bg-otro text-black px-9 py-3">{data.city}</span>
            </p>
            <p className="text-5xl font-extrabold">{data.name}</p>
            <p className="text-3xl mt-5">{data.description}</p>
            <p className="font-semibold mt-5 text-lg border-b-4 w-32 border-otro">
              Date and Time
            </p>
            <div className="flex gap-36 m-2 justify-between">
              <div className="flex gap-5 w-1/4">
                <img src={calendar} />
                <div className="flex flex-col">
                  <p className="w-60">
                    {" "}
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
                <p className="text-deco font-medium"> Where?</p>
                <p className="font-medium text-xl">{data.location}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5 m-2">
                <img src={clock} />
                <div className="flex flex-col w-36">
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
            <div className="flex justify-end">
              <div className="w-3/5 py-2 mt-5 border-2 border-base border-opacity-30 rounded-lg justify-end">
                {data.Tickets?.map((ticket) => (
                  <div key={ticket.id_ticket}>
                    <div className="flex items-center justify-end border-b-2 border-zinc-300">
                      <p className="w-48 py-2 font-bold px-6">
                        {ticket.ticket_type}
                      </p>
                      <div className="flex gap-2">
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
                      </div>
                      <div className="w-60 flex justify-end">
                        <p className="mx-6">
                          <span className="font-semibold mr-4">
                            $ {ticket.price}
                          </span>
                          <span className="">
                            avail.
                            {ticket.available_quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  {data.Tickets[0] && (
                    <p className="ml-5 italic">
                      *Sales end on {formatDate(data.Tickets[0]?.sell_by_date)}
                    </p>
                  )}
                </div>
                {data.access === "paid" || data.Tickets[0]?.price ? (
                  <div className="flex justify-end px-3">
                    <button
                      className={`bg-deco text-button1 items-center align-middle gap-3 font-bold py-1 px-4 flex rounded cursor-pointer hover:scale-110 transition-transform duration-300 ${
                        !hasSelectedTicket
                          ? "opacity-50 pointer-events-none cursor-not-allowed"
                          : ""
                      }`}
                      disabled={!hasSelectedTicket}
                      style={{
                        backgroundColor: !hasSelectedTicket ? "#D1D5DB" : "",
                      }}
                    >
                      <img src={buy} /> Buy Tickets
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <p className="text-base font-bold w-1/4 pr-6 text-end">
                      FREE
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
