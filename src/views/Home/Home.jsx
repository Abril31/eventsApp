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
  useGetEventsByPage,
} from "../../hooks/useEvents";
import { citiesAndCats } from "../../helpers/values";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const setOriginalEvents = useStore((state) => state.setOriginalEvents);
  const setOriginalData = useStore((state) => state.setOriginalData);
  const cities = useStore((state) => state.cities);
  const categories = useStore((state) => state.categories);
  const originalData = useStore((state) => state.originalData);

  const eventsPerPage = 4;
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const totalEvents = useStore((state) => state.totalEvents);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { data, isLoading } = useGetEventsByPage(
    currentPage,
    eventsPerPage,
    totalEvents
  );

  //Para guardar en el estado Global
  useEffect(() => {
    if (data) {
      setOriginalEvents(data);
      setOriginalData(data);
    }
  }, [data, setOriginalEvents, originalData]);

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
  };
  const filterByCity = async (event) => {
    const citySel = event.target.value;
    const city = await getEventsByCity("city", citySel);
    setFilteredEvents(city);
    setCurrentPage(1);
  };
  const clearFilters = () => {
    setFilteredEvents("");
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
        <div className="w-full flex gap-5 justify-between mx-20">
          <Paginate
            currentPage={currentPage}
            totalPages={Math.ceil(totalEvents / eventsPerPage)}
            setCurrentPage={setCurrentPage}
          />
          <SearchBar
            setFilteredEvents={handleFilteredEvents}
            resetEvents={handleResetEvents}
          />
        </div>
      </div>
      <div className=" bg-zinc-400">
        <h1 className="text-2xl p-5">Filters</h1>
        <div className="flex">
          <div className="flex mx-5 gap-5">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Cities
            </button>
            <select name="city" onChange={filterByCity}>
              {cities.map((city) => {
                return <option key={city}>{city}</option>;
              })}
            </select>

            <button
              onClick={clearFilters}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              All Categories
            </button>
            <select name="cat" onChange={filterByCat}>
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {/* Aquí vienen las Cards */}
        <div className="flex justify-end">
          <CardList
            currentPage={currentPage}
            totalEvents={totalEvents}
            filteredEvents={filteredEvents}
            eventsPerPage={eventsPerPage}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
