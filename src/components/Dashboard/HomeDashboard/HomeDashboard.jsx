import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homeDashboard.module.css";
import api from "../../../api/events";
const HomeDashboard = () => {
  const { user } = useAuthStore();
  console.log("DasjBoard user-->", user);
  const [events, setevents] = useState([]);
  const navigate = useNavigate();

  if (user.type_user !== "admin") {
    navigate("/");
  }

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const response = await api.get("/getallevents");
        setevents(response.data);
      } catch (error) {
        console.error("Error trayendo los eventos:", error);
      }
    };

    fetchevents();
  }, []);

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return { formattedDate };
  };

  const restoreEvent = async (id_event) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este evento?"
    );
    if (confirmRestore) {
      try {
        await api.put(`/updateevent/${user.user_id}/${id_event}/true`);
        const response = await axios.get(`/getallevents`);
        setevents(response.data);
      } catch (error) {
        console.error("Error al actualizar evento:", error);
      }
    }
  };

  const deleteEvent = async (id_event) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este evento?"
    );
    if (confirmDelete) {
      try {
        await api.put(`${url}/updateevent/${user.user_id}/${id_event}/false`);
        const response = await api.get("/getallevents");
        setevents(response.data);
      } catch (error) {
        console.error("Error al eliminar evento:", error);
      }
    }
  };
  events.map(async (event) => {
    if (new Date(event.end_date) < new Date()) {
      await api.put(
        `${url}/updateevent/${user.user_id}/${event.id_event}/false`
      );
    }
  });
  events.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  return (
    <div className={styles.eventsContainer}>
      <div className={styles.buttonContainer}>
        <div>
          <Link to="/dashboard/users" className={styles.buttonDashboard}>
            Admin Usuarios
          </Link>
        </div>
        <div>
          <Link to="/dashboard/events/new" className={styles.buttonCreation}>
            Nuevo Evento
          </Link>
        </div>
        <div>
          <Link to="/dashboard/sponsors" className={styles.buttonCreation}>
            Admin Sponsors
          </Link>
        </div>
      </div>
      <h1 className={styles.title}>Lista de eventos</h1>

      <table className={styles.eventTable}>
        <thead>
          <tr>
            <th className={styles.name}>ID</th>
            <th className={styles.name}>Nombre</th>
            <th className={styles.name}>Descripcion</th>
            <th className={styles.name}>Fecha Inicio</th>
            <th className={styles.name}>Fecha Final</th>
            <th className={styles.name}>Hora Inicio</th>
            <th className={styles.name}>Hora Final</th>
            <th className={styles.name}>Lugar</th>
            <th className={styles.name}>Categoria</th>
            <th className={styles.name}>Tipo</th>
            <th className={styles.name}>Imagen</th>
            <th className={styles.name}>Ciudad</th>
            <th className={styles.name}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.id_event}
              className={`${event.status ? "" : styles.deletedEvent}`}
            >
              <td className={styles.name}>{event.id_event}</td>
              <td className={styles.name}>{event.name}</td>
              <td className={styles.name}>{event.description}</td>
              <td className={styles.name}>
                {formatDateTime(event.start_date).formattedDate}
              </td>
              <td className={styles.name}>
                {formatDateTime(event.end_date).formattedDate}
              </td>
              <td className={styles.name}>{event.start_hour}</td>
              <td className={styles.name}>{event.end_hour}</td>
              <td className={styles.name}>{event.location}</td>
              <td className={styles.name}>{event.category}</td>
              <td className={styles.name}>{event.access}</td>
              <td>
                <img
                  key={event.id_event}
                  src={event.image}
                  alt={`Imagen ${event.name}`}
                  className={styles.eventImage}
                />
              </td>
              <td className={styles.name}>{event.city}</td>
              <td>
                {event.status ? (
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteEvent(event.id_event)}
                  >
                    Eliminar
                  </button>
                ) : (
                  (() => {
                    const isEventExpired =
                      new Date(event.end_date) < new Date();
                    if (!isEventExpired) {
                      return (
                        <button
                          className={`${styles.actionButton} ${styles.restoreButton}`}
                          onClick={() => restoreEvent(event.id_event)}
                        >
                          Restaurar
                        </button>
                      );
                    }
                    return null;
                  })()
                )}
                {new Date(event.end_date) > new Date() ? (
                  <Link
                    to={`/dashboard/modifications/events/${event.id_event}`}
                    className={styles.linkEditar}
                  >
                    Editar
                  </Link>
                ) : (
                  <span>Finalizado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeDashboard;
