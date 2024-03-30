import { useGetEvent } from "../../hooks/useEvents";
import { formatHour, formatDate } from "../../helpers/formatters";
import calendar from "../../assets/icons/calendar.svg";
import clock from "../../assets/icons/clock.svg";
import buy from "../../assets/icons/buy.svg";
const EventDetail = () => {
  const { data, isLoading } = useGetEvent();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>There are no details for this event.</div>;

  return (
    <div className="flex justify-center">
      <div className="flex m-10 gap-10">
        <div className="">
          <img
            src={data.image}
            width={900}
            height={500}
            className="rounded-md"
          />
        </div>
        <div className="border-t-4 border-b-4 border-deco p-2">
          <p className="text-5xl font-extrabold">{data.name}</p>
          <p className="text-3xl mt-5">{data.description}</p>
          <p className="font-semibold mt-5 text-lg">Date and Time</p>
          <div className="flex gap-36 m-2 justify-between">
            <div className="flex gap-5 w-1/4">
              <img src={calendar} />
              <div className="flex flex-col">
                <p className="w-60"> Del {formatDate(data.start_date)}</p>
                <p>al {formatDate(data.end_date)}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-deco font-medium"> Where?</p>
              <p className="font-medium text-xl">{data.location}</p>
            </div>
          </div>
          <div className="flex gap-5 m-2">
            <img src={clock} />
            <div className="flex flex-col">
              <p>Desde: {formatHour(data.start_hour)}</p>
              <p>hasta: {formatHour(data.end_hour)}</p>
            </div>
          </div>
          <div className="mx-3">
            {data.access === "paid" ? (
              <div className="flex justify-end mt-32">
                <button className="bg-deco text-button1 items-center align-middle gap-3 font-bold py-1 px-4 flex rounded cursor-pointer hover:scale-110 transition-transform duration-300">
                  <img src={buy} /> Buy Tickets
                </button>
              </div>
            ) : (
              <div className="flex justify-end mt-32">
                <button className="bg-deco text-button1 font-bold py-2 px-4 rounded hover:scale-110 transition-transform duration-300">
                  FREE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
