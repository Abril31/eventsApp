import { allEvents } from "../hooks/useEvents";
import { useStore } from "../store/eventsStore";

export const citiesAndCats = async () => {
  try {
    // Obtenemos todos los eventos y sacamos las ciudades y categorias en arrays
    const eventos = await allEvents();
    const cities = Array.from(new Set(eventos.map((event) => event.city)));
    const categories = Array.from(
      new Set(eventos.map((event) => event.category))
    );

    // Almacenamos las ciudades y categorías en el estado global de Zustand
    useStore.setState({ cities, categories });

    console.log("Ciudades almacenadas en el estado global de Zustand:", cities);
    console.log(
      "Categorías almacendas en el estado global de Zustand:",
      categories
    );

    return { cities, categories };
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return { error };
  }
};
