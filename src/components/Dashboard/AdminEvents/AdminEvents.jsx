import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./adminEvents.module.css";
import api from "../../../api/events";
//import SearchBar from "../searchBar/SearchBar";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/getallevents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error trayendo los Events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (data) => {
    setEvents(data);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const restoreEvent = async (id) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este Evento?"
    );
    if (confirmRestore) {
      try {
        await api.put("/getallevents", {
          estado: true,
        });
        const response = await api.get("/getallevents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error al actualizar producto:", error);
      }
    }
  };

  const deleteEvent = async (id_user, id_event) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este Evento?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/deleteevent/${id_user}/${id_event}`, {
          estado: false,
        });
        const response = await api.get("/getallevents");
        setEvents(response.data);
      } catch (error) {
        console.error("Error al eliminar Evento:", error);
      }
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return event.status;
    } else if (filter === "deleted") {
      return !event.status;
    }
  });

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.buttonContainer}>
        <div>
          <Link to="/dashboard" className={styles.buttonDashboard}>
            Admin Users
          </Link>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBarEvents onSearch={handleSearch} />
        </div>
        <div className={styles.filterContainer}>
          <label htmlFor="filter" className={styles.filterLabel}>
            Filtrar:{" "}
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="deleted">Eliminados</option>
          </select>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Lista de Eventos</h1>
        <Link to="/dashboard/events/new" className={styles.buttonCreation}>
          Nuevo Evento
        </Link>
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th className={styles.name}>ID</th>
            <th className={styles.name}>Nombre</th>
            <th className={styles.name}>Número de serie</th>
            <th className={styles.name}>Número de MAC</th>
            <th className={styles.name}>Precio</th>
            <th className={styles.name}>Stock</th>
            <th className={styles.name}>Preferencia</th>
            <th className={styles.name}>Categoría</th>
            <th className={styles.name}>Marca</th>
            <th className={styles.name}>Fabricante</th>
            <th className={styles.name}>Imágenes</th>
            <th className={styles.name}>Votos</th>
            <th className={styles.name}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((product) => (
            <tr
              key={product.id}
              className={`${product.estado ? "" : styles.deletedProduct}`}
            >
              <td className={styles.name}>{product.id}</td>
              <td className={styles.name}>{product.nombre}</td>
              <td className={styles.name}>{product.nroserie}</td>
              <td className={styles.name}>{product.nromac}</td>
              <td className={styles.name}>{product.precio}</td>
              <td className={styles.name}>{product.stock}</td>
              <td className={styles.name}>{product.preferencia}</td>
              <td className={styles.name}>{product.Categoria.nombre}</td>
              <td className={styles.name}>{product.Marca.nombre}</td>
              <td className={styles.name}>{product.Fabricante.nombre}</td>
              <td>
                <div className={styles.imagesContainer}>
                  {product.Imagenes &&
                    product.Imagenes.length > 0 &&
                    product.Imagenes[0] && (
                      <img
                        key={product.Imagenes[0].id}
                        src={product.Imagenes[0].url}
                        alt={`Imagen ${product.Imagenes[0].id}`}
                        className={styles.productImage}
                      />
                    )}
                </div>
              </td>
              <td>
                <ul className={styles.votesList}>
                  {product.Votos &&
                    product.Votos.length > 0 &&
                    product.Votos.slice(0, 3).map((voto) => (
                      <li key={voto.id} className={styles.voteItem}>
                        Voto: {voto.voto}, Comentario: {voto.comentario}
                      </li>
                    ))}
                </ul>
              </td>
              <td>
                {product.estado ? (
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteEvent(product.id)}
                  >
                    Eliminar
                  </button>
                ) : (
                  <button
                    className={`${styles.actionButton} ${styles.restoreButton}`}
                    onClick={() => restoreEvent(product.id)}
                  >
                    Restaurar
                  </button>
                )}
                <Link
                  to={`/dashboard/events/change/${product.id}`}
                  className={styles.linkEditar}
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvents;
