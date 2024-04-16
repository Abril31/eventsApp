import Card from "../card/Card";
import SearchBar from "../../components/searchBar/SearchBar";

import { useAllEvents } from "../../hooks/useEvents";
import { citiesAndCats } from "../../helpers/values";
import { useStore } from "../../store/eventsStore";
import { useEffect, useState } from "react";
import up from "../../assets/icons/up.svg";
import down from "../../assets/icons/down.svg";
import Paginate from "../pagination/Paginate";
import { usePaginationStore } from "../../store/paginationStore";
import Loading from "../spinner/Loading";

const CardList = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const setSearchResults = useStore((state) => state.setSearchResults);
  const searchResults = useStore((state) => state.searchResults);

  const cities = useStore((state) => state.cities);
  const categories = useStore((state) => state.categories);

  const eventsPerPage = 6;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  const [access, setAccess] = useState("All");
  const { data: events, isLoading, error } = useAllEvents();
  // Cats and cities
  useEffect(() => {
    citiesAndCats();
  }, []);

  if (isLoading) return <Loading />;
  if (!events) return <div>There are no events.</div>;
  if (error) return <div>Something bad happened 😥</div>;

  let filteredEvents = events;

  if (selectedCity) {
    filteredEvents = filteredEvents.filter(
      (event) => event.city === selectedCity
    );
  }

  if (selectedCat) {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === selectedCat
    );
  }
  if (access === "paid") {
    filteredEvents = filteredEvents.filter((event) => event.access === "paid");
  }
  if (access === "free") {
    filteredEvents = filteredEvents.filter((event) => event.access === "free");
  }

  let combinedResults = searchResults;
  if (searchResults.length > 0 && filteredEvents.length > 0) {
    combinedResults = searchResults.filter((event) =>
      filteredEvents.includes(event)
    );
  } else if (searchResults.length === 0 && filteredEvents.length > 0) {
    combinedResults = filteredEvents;
  }
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;

  const totalEvents = combinedResults.length;

  const eventsToDisplay = combinedResults.slice(startIndex, endIndex);

  const sortByMonth = (direction) => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      if (dateA.getMonth() !== dateB.getMonth()) {
        return direction === "asc"
          ? dateA.getMonth() - dateB.getMonth()
          : dateB.getMonth() - dateA.getMonth();
      }

      // Comparación por día
      return direction === "asc"
        ? dateA.getDate() - dateB.getDate()
        : dateB.getDate() - dateA.getDate();
    });
    setSearchResults(sortedEvents);
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value !== "Choose" ? event.target.value : "");
    setCurrentPage(1);
  };

  const handleCatChange = (event) => {
    setSelectedCat(event.target.value !== "Choose" ? event.target.value : "");
    setCurrentPage(1);
  };
  const handleOptionChange = (event) => {
    setAccess(event.target.value);
    setCurrentPage(1);
  };
  const handleResetEvents = () => {
    setSelectedCity("");
    setSelectedCat("");
    setSearchResults([]);
    setAccess("All");
  };
  return (
    <>
      <section className="flex flex-wrap justify-center mx-24 mb-14">
        <div className="flex p-3 w-full justify-center mb-6">
          <SearchBar />
        </div>
        <div className="flex justify-center mx-5 gap-7">
          <Paginate totalEvents={totalEvents} eventsPerPage={eventsPerPage} />

          <label className="text-black font-bold py-2">Cities</label>
          <select
            name="city"
            className="border border-base p-2"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option>Choose</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label className="text-black font-bold py-2">Categories</label>
          <select
            name="cat"
            className="border border-base p-2"
            value={selectedCat}
            onChange={handleCatChange}
          >
            <option>Choose</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className=""></div>
          <div className="flex gap-3">
            <button
              className="bg-deco hover:bg-violet-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => sortByMonth("asc")}
            >
              <div className="flex">
                Sort <img src={up} />
              </div>
            </button>
            <button
              className="bg-deco hover:bg-violet-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => sortByMonth("desc")}
            >
              <div className="flex">
                Sort <img src={down} />
              </div>
            </button>
            <div className="bg-base flex items-center text-white px-2">
              <div className="flex gap-2">
                <div className="flex gap-1">
                  <label>All</label>
                  <input
                    type="radio"
                    value="All"
                    checked={access === "All"}
                    onChange={handleOptionChange}
                    name="access"
                    className="w-6"
                  />
                </div>

                <div className="flex gap-1">
                  <label>Paid</label>
                  <input
                    type="radio"
                    value="paid"
                    checked={access === "paid"}
                    onChange={handleOptionChange}
                    name="access"
                    className="w-6"
                  />
                </div>
                <div className="flex gap-1">
                  <label>Free</label>
                  <input
                    type="radio"
                    value="free"
                    checked={access === "free"}
                    onChange={handleOptionChange}
                    name="access"
                    className="w-6"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleResetEvents}
              className="bg-otro border-2 border-base p-2 rounded"
            >
              Clear Filters
            </button>
          </div>
        </div>
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
              access={event.access}
              rating={event.rating}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CardList;
