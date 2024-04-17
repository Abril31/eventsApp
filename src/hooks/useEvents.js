import api from "../api/events";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

//Eventos por Categoria
export const getEventsByCategory = async (criterion, filter) => {
  const url = `/getallevents?criterion=${criterion}&filter=${filter}`;
  const { data } = await api.get(url);
  console.log("Solicitud exitosa:", data);
  return data;
};

export const getEventsByCity = async (criterion, filter) => {
  const url = `/getallevents?criterion=${criterion}&filter=${filter}`;
  const { data } = await api.get(url);
  console.log("Solicitud exitosa:", data);
  return data;
};

//Petición 1 evento

const getEvent = async (id) => {
  const { data } = await api.get(`/getallevents/${id}`, {
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

//Petición review por evento

const getEventReviews = async (idEvent) => {
  const { data } = await api.get(`/event/review/${idEvent}`, {
    values: { id_event: idEvent },
  });
  return data;
};

export const useGetEventReviews = (eventId) => {
  return useQuery({
    queryKey: ["eventReview", eventId],
    queryFn: () => getEventReviews(eventId),
    placeholderData: keepPreviousData,
  });
};

//Peticion todos los users:
export const allUsers = async () => {
  const { data } = await api.get("/getallusers");
  return data;
};
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: allUsers,
  });
};
