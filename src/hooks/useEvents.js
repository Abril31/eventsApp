import api from "../api/events";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

//Todos los eventos

export const allEvents = async () => {
  const { data } = await api.get("/getallevents");
  return data;
};
export const useAllEvents = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: allEvents,
  });
};

// Función para obtener los eventos de acuerdo a la página
const getEventsByPage = async (page, eventsPerPage, totalEvents) => {
  const from = (page - 1) * eventsPerPage + 1;
  const to = Math.min(page * eventsPerPage, totalEvents);
  const url = `/getallevents?from=${from}&to=${to}`;
  const { data } = await api.get(url);
  return data;
};
//Ejecuta la función y guarda en caché
export const useGetEventsByPage = (page, eventsPerPage, totalEvents) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => getEventsByPage(page, eventsPerPage, totalEvents),
    placeholderData: keepPreviousData,
  });
};

//Eventos por Categoria
export const getEventsByCategory = async (criterion, filter) => {
  const url = `getallevents?criterion=${criterion}&filter=${filter}`;
  const { data } = await api.get(url);
  console.log("Solicitud exitosa:", data);
  return data;
};

export const getEventsByCity = async (criterion, filter) => {
  const url = `getallevents?criterion=${criterion}&filter=${filter}`;
  const { data } = await api.get(url);
  console.log("Solicitud exitosa:", data);
  return data;
};

// export const useGetEventsByCategory = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const criterion = searchParams.get("criterion");
//   const filter = searchParams.get("filter");
//   console.log("Criterion es:", criterion);
//   console.log("Filter es:", filter);
//   return useQuery({
//     queryKey: ["category", filter],
//     queryFn: () => getEventsByCategory(criterion, filter),
//   });
// };

//Petición 1 evento

const getEvent = async (id) => {
  const { data } = await api.get(`getallevents/${id}`, {
    // Para que pueda comparar en la base de datos
    values: { id_event: id },
  });
  return data;
};

export const useGetEvent = () => {
  const { id } = useParams();
  return useQuery({
    queryKey: ["singleEvent", id],
    queryFn: () => getEvent(id),
    placeholderData: keepPreviousData,
  });
};