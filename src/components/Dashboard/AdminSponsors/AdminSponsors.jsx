import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./adminSponsors.module.css";

const AdminSponsors = () => {
  const [sponsors, setSponsor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getallevents/sponsor");
        setSponsor(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este elemento?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/getallevents/sponsor/${id}`, {
          estado: false,
        });
        const response = await api.get("/getallevents/sponsor");
        setSponsor(response.data);
      } catch (error) {
        console.error("Error al eliminar elemento:", error);
      }
    }
  };

  const restoreItem = async (id) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este elemento?"
    );
    if (confirmRestore) {
      try {
        await api.put(`/getallevents/sponsor/${id}`, {
          estado: true,
        });
        const response = await api.get("/getallevents");
        setSponsor(response.data);
      } catch (error) {
        console.error("Error al restaurar elemento:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <Link to="/dashboard" className={styles.buttonDashboard}>
          Admin Users
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.contenedor}>
            <h2 className={styles.productName}>Lista de Sponsors</h2>
            <Link
              to="/dashboard/create/sponsor"
              className={styles.buttonCreation}
            >
              Nuevo Sponsor
            </Link>
          </div>
          <div className={styles.listContainer}>
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id_sponsor}
                className={`${styles.itemLista} ${
                  !sponsor.status ? styles.deletedSponsor : ""
                }`}
              >
                <div className={styles.nombre}>{sponsor.enterprise_name}</div>
                <button
                  className={
                    sponsor.status
                      ? styles.deleteButton2
                      : styles.restoreButton2
                  }
                  onClick={() =>
                    sponsor.status
                      ? deleteItem("sponsors", sponsor.id_sponsor, setSponsor)
                      : restoreItem("sponsors", sponsor.id, setSponsor)
                  }
                >
                  {sponsor.status ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsors;
