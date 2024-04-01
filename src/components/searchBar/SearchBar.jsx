import { useState } from "react";
import search from "../../assets/icons/searchIcon.svg";
import { useAllEvents } from "../../hooks/useEvents";
import { toast } from "sonner";

const SearchBar = ({ setFilteredEvents, resetEvents }) => {
  //Estado local y manejo del input
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const { data } = useAllEvents();

  //Filtro por Ciudad
  const filterByCity = (city) => {
    if (!city) return data;
    return data.filter((event) =>
      event.city.toLowerCase().includes(city.toLowerCase())
    );
  };

  // Filtro por Categoría
  const filterByCategory = (category) => {
    if (!category) return data;
    return data.filter((event) =>
      event.category.toLowerCase().includes(category.toLowerCase())
    );
  };
  //Filtra por Ubicación
  const filterByLocation = (location) => {
    if (!location) return data;
    return data.filter((event) =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
  };
  //Filtra por nombre del evento
  const filterByName = (name) => {
    if (!name) return data;
    return data.filter((event) =>
      event.name.toLowerCase().includes(name.toLowerCase())
    );
  };
  const handleResetEvents = () => {
    resetEvents();
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredByCity = filterByCity(input);
    const filteredByCategory = filterByCategory(input);
    const fiteredByLocation = filterByLocation(input);
    const filteredByname = filterByName(input);
    const filteredResults = [
      ...new Set([
        ...filteredByCity,
        ...filteredByCategory,
        ...fiteredByLocation,
        ...filteredByname,
      ]),
    ];

    console.log("Resultados filtrados:", filteredResults);

    if (filteredResults.length === 0) {
      toast.error("There are no results matching the search");
    } else {
      setFilteredEvents(filteredResults);
    }
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex rounded-full border border-gray-950 w-96 bg-gray-100">
          <input
            className="rounded-full text-sm border-none focus:outline-none pl-4 pr-12 pt-1 pb-1 w-full bg-transparent"
            type="text"
            value={input}
            placeholder="Search by city, category or location..."
            onChange={handleChange}
          />
          <button type="submit">
            <img
              src={search}
              alt="Search Icon"
              className="rounded-full bg-deco p-2"
            />
          </button>
        </div>
        {/* <button
          className="p-2 border border-base text-base rounded-xl"
          onClick={handleResetEvents}
        >
          Reset
        </button> */}
      </form>
    </>
  );
};

export default SearchBar;
