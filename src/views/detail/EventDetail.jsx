import { useGetEvent } from "../../hooks/useEvents";
import { formatHour, formatDate } from "../../helpers/formatters";
const EventDetail = () => {
  const { data, isLoading } = useGetEvent();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>There are no details for this event.</div>;

  return (
    <div>
      <div className="flex flex-col items-center">
        <p>{data.name}</p>
        <p>{data.description}</p>
        <img src={data.image} width={500} height={500} />
        <p>{data.location}</p>
        <p>{formatDate(data.start_date)}</p>
        <p>{formatDate(data.end_date)}</p>
        <p>{formatHour(data.start_hour)}</p>
        <p>{formatHour(data.end_hour)}</p>
        <p>{data.access}</p>
      </div>
    </div>
  );
};

export default EventDetail;
