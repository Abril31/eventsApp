import { useGetEventsByPage } from "../../hooks/useEvents";

import Card from "../card/Card";

const CardList = ({
  totalEvents,
  filteredEvents,
  currentPage,
  eventsPerPage,
}) => {
  const { data, isLoading, error } = useGetEventsByPage(
    currentPage,
    eventsPerPage,
    totalEvents
  );

  if (isLoading) return "";
  if (error)
    return (
      <div className="text-red-500 text-center font-bold text-4xl">
        There was an error!
      </div>
    );

  let eventsToDisplay = data;

  if (filteredEvents && filteredEvents.length > 0) {
    eventsToDisplay = filteredEvents;
  }

  return (
    <>
      <section className="flex flex-wrap justify-end mx-24 mb-14">
        <div className="grid grid-cols-3 mt-10 gap-16">
          {eventsToDisplay.map((event) => (
            <Card
              key={event.id_event}
              id={event.id_event}
              image={event?.image}
              description={event.description}
              name={event.name}
              city={event.city}
              location={event.location}
              eventType={event.event_type}
              startDate={event.start_date}
              endDate={event.end_date}
              startHour={event.start_hour}
              category={event.category}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CardList;
