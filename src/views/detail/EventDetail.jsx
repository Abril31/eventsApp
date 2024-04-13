import { useGetEvent } from "../../hooks/useEvents";
import { formatHour, formatDate } from "../../helpers/formatters";
import calendar from "../../assets/icons/calendar.svg";
import clock from "../../assets/icons/clock.svg";
import buy from "../../assets/icons/buy.svg";
import { BackButton } from "../../components/buttons/Buttons";
import cosmic from "../../assets/icons/cosmic.svg";
import { Modal } from "../../components/modal/Modal";
import { useState } from "react";
import Loading from "../../components/spinner/Loading";

const EventDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetEvent();
  console.log(data);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    data.Tickets[0];
  };
  if (isLoading) {
    return <Loading />;
  }
  if (!data) return <div>There are no details for this event.</div>;

  return (
    <div className="flex flex-col my-10 mx-10">
      <div className="flex justify-center mx-32 p-5">
        <div className="relative w-full ">
          <p className="absolute text-7xl text-left mx-5 w-3/2 p-3 font-extrabold mt-10 -mb-5 text-white border-b-8 border-otro">
            {data.name}
          </p>
          <div className="">
            <img
              src={data.image}
              className="rounded-3xl z-0 flex justify-center w-full"
            />
            <h2
              className="relative text-white p-5 w-full h-28 mb-5 font-extrabold text-4xl text-end -mt-20 bg-cover bg-top rounded-b-3xl"
              style={{ backgroundImage: `url(${cosmic})` }}
            >
              <p className="flex justify-end h-full">
                <span className="flex items-center border-l-8 border-otro px-4">
                  {" "}
                  {data.city}
                </span>
              </p>
            </h2>
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
              <div></div>
              {data.Tickets.length > 0 ? (
                <div className="py-2 mt-5 border border-gray-300 p-4 rounded-md shadow-2xl">
                  <p className="flex w-full justify-center text-2xl font-semibold border-otro border-b-4 py-2">
                    Ticket Information
                  </p>
                  <div key={data.Tickets[0].id_ticket}>
                    <div className="flex items-center gap-10 border-b-2 border-zinc-300">
                      <p className="w-48 py-2 text-xl font-bold">
                        {data.Tickets[0].ticket_type}
                      </p>
                      <div className="flex justify-end">
                        <p className="text-xl">
                          <span className="font-semibold">
                            $ {data.Tickets[0].price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      className="flex bg-deco justify-center w-full rounded text-button1 font-bold text-xl items-center gap-2 my-5 py-2"
                      onClick={() => handleOpenModal(data.Tickets[0])}
                    >
                      <img
                        src={buy}
                        className="flex align-middle items-start"
                      />
                      Get Tickets
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-300 h-40 rounded-md shadow-xl py-3 px-10 mt-10">
                  <p className="flex w-full justify-center text-2xl font-semibold border-otro border-b-4 py-2">
                    Ticket Information
                  </p>
                  <button className="bg-deco rounded text-button1 px-24 py-2 my-3 font-bold text-xl h-14">
                    FREE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        idEvent={data.id_event}
        eventName={data.name}
        startDate={formatDate(data.start_date)}
        ticketType={data?.Tickets[0]?.ticket_type}
        ticketPrice={data?.Tickets[0]?.price}
        quantityAvailable={data?.Tickets[0]?.available_quantity}
        id_user={data?.Tickets[0]?.id_user}
        image={data?.image}
        id_ticket={data?.Tickets[0].id_ticket}
      />
      <BackButton />
    </div>
  );
};

export default EventDetail;
