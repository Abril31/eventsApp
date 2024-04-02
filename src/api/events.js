import axios from "axios";

const api = axios.create({
  //Todas las rutas empieza de esta forma:
  baseURL: "http://localhost:3001/api/v1",
});

export default api;
