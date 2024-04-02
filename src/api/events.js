import axios from "axios";

const api = axios.create({
  //Todas las rutas empieza de esta forma:
  baseURL: "https://eventapp-back.onrender.com/api/v1/getallevents",
});

export default api;
