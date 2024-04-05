import { useParams } from "react-router-dom";
import { useAllEvents } from "../../hooks/useEvents";
import Card from "../../components/card/Card";
// import Paginate from "../../components/pagination/Paginate";

const Category = ({ setCurrentPage, currentPage }) => {
  // const eventsPerPage = 3;

  const { category } = useParams();
  const { data: events, isLoading } = useAllEvents();
  if (isLoading) return <div>Loading...</div>;
  if (!events) return <div>There are no events in this category.</div>;

  const filteredEvents = events.filter(
    (event) =>
      event.category.toLowerCase().includes(category.toLowerCase()) ||
      event.name.toLowerCase().includes(category.toLowerCase())
  );
  const totalEvents = filteredEvents.length;

  return (
    <div>
      <h1 className="text-3xl text-center mt-10 font-extrabold">
        {category.toUpperCase()}
      </h1>
      {/* <Paginate
        totalPages={Math.ceil(totalEvents / eventsPerPage)}
        currrentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-10 m-10 items-center">
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => (
              <Card
                key={event.id_event}
                id={event.id_event}
                image={event.image}
                description={event.description}
                name={event.name}
                access={event.access}
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
      </div>
    </div>
  );
};

export default Category;
