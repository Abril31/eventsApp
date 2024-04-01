import SearchBar from "../../components/searchBar/SearchBar";
import CategoryBar from "../../components/categoryBar/CategoryBar";
import CardList from "../../components/cardList/CardList";
import Carousel from "../../components/carousel/Carousel";
import Paginate from "../../components/pagination/Paginate";
import { useState, useEffect } from "react";
import { useStore } from "../../store/eventsStore";
import {
  getEventsByCategory,
  getEventsByCity,
  useAllEvents,
  useGetEventsByPage,
} from "../../hooks/useEvents";
import { citiesAndCats } from "../../helpers/values";
import up from "../../assets/icons/up.svg";
import down from "../../assets/icons/down.svg";
const Home = () => {
  const setOriginalEvents = useStore((state) => state.setOriginalEvents);
  const setOriginalData = useStore((state) => state.setOriginalData);
  const cities = useStore((state) => state.cities);
  const categories = useStore((state) => state.categories);
  const originalData = useStore((state) => state.originalData);
  const originalEvents = useStore((state) => state.originalEvents);
  const eventsPerPage = 6;
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const totalEvents = useStore((state) => state.totalEvents);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Calcular el paginado:
  const from = (currentPage - 1) * eventsPerPage + 1;
  const to = Math.min(currentPage * eventsPerPage, totalEvents);
  const { data, isLoading } = useGetEventsByPage(from, to);
  const { data: eventos } = useAllEvents();

  //Para guardar en el estado Global
  useEffect(() => {
    if (data) {
      setOriginalEvents(eventos);
      setOriginalData(data);
    }
  }, [data, setOriginalEvents, originalData, eventos]);

  //Cats and cities
  useEffect(() => {
    citiesAndCats();
    cities;
    categories;
  }, []);

  //Filtros

  const handleFilteredEvents = (filteredResults) => {
    setFilteredEvents(filteredResults);
    setCurrentPage(1);
  };
  const handleResetEvents = () => {
    setFilteredEvents("");
  };
  const filterByCat = async (event) => {
    const catSel = event.target.value;
    const categoria = await getEventsByCategory("category", catSel);
    setFilteredEvents(categoria);
    setCurrentPage(1);
    setTimeout(() => {
      event.target.value = "Choose";
    });
  };
  const filterByCity = async (event) => {
    const citySel = event.target.value;
    const city = await getEventsByCity("city", citySel);
    setFilteredEvents(city);
    setCurrentPage(1);
    setCurrentPage(1);
    setTimeout(() => {
      event.target.value = "Choose";
    });
  };
  const clearFilters = () => {
    setFilteredEvents("");
    setCurrentPage(1);
  };
  //Ordenamiento por mes:

  const sortByMonth = (direction) => {
    const sortedEvents = [...eventos].sort((a, b) => {
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
    const newFrom = (currentPage - 1) * eventsPerPage + 1;
    const newTo = Math.min(currentPage * eventsPerPage, totalEvents);

    // Filtra los eventos ordenados para la página actual
    const eventsForPage = sortedEvents.slice(newFrom - 1, newTo);

    // Actualiza el estado de los eventos filtrados
    setFilteredEvents(eventsForPage);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-center flex-grow"></div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Carousel />
          <CategoryBar />
          <h1 className="mx-40 my-10 w-3/12 px-10 font-extrabold text-3xl">
            EVENTS
          </h1>
        </div>
      )}

      <div className="flex mx-10 my-10 gap-5 text-xl">
        <div className="w-full flex gap-5 justify-center mx-20 mb-5">
          <SearchBar
            setFilteredEvents={handleFilteredEvents}
            resetEvents={handleResetEvents}
          />
        </div>
      </div>
      <div className="">
        <div className="flex justify-center mb-7 mt-3">
          <div className="flex justify-center mx-5 gap-7">
            <button
              className="bg-deco hover:bg-violet-500 text-white font-bold py-2 px-4 rounded"
              onClick={clearFilters}
            >
              Reset
            </button>
            <button
              className="bg-deco hover:bg-violet-500 text-white font-bold py-2 px-4 rounded"
              onClick={clearFilters}
            >
              Cities
            </button>
            <select
              name="city"
              onChange={filterByCity}
              className="border border-base p-2"
            >
              <option>Choose</option>
              {cities.map((city) => {
                return <option key={city}>{city}</option>;
              })}
            </select>

            <button
              onClick={clearFilters}
              className="bg-deco hover:bg-violet-500 text-white font-bold py-2 px-4 rounded"
            >
              Categories
            </button>
            <select
              name="cat"
              onChange={filterByCat}
              className="border border-base p-2"
            >
              <option>Choose</option>
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            <div className="">
              <Paginate
                from={from}
                totalPages={Math.ceil(totalEvents / eventsPerPage)}
                setCurrentPage={setCurrentPage}
                currrentPage={currentPage}
              />
            </div>
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
            </div>
          </div>
        </div>
        {/* Aquí vienen las Cards */}
        <div className="flex justify-center">
          <CardList
            currentPage={currentPage}
            totalEvents={totalEvents}
            filteredEvents={filteredEvents}
            eventsPerPage={eventsPerPage}
            sortByMonth={sortByMonth}
            data={data}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
