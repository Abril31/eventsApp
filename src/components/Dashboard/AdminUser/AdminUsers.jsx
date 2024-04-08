import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import styles from "./adminUsers.module.css";
import api from "../../../api/events";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error trayendo usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId, newRoleId) => {
    try {
      const response = await api.put(`/getallusers/users/change/${userId}`, {
        Role: { id: newRoleId },
      });

      if (!response.data) {
        console.error("Error updating user role:", response.statusText);
        return;
      }

      await fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleBanUser = async (userId, isBanned) => {
    try {
      const response = await api.put(`/getallusers/users/change/${userId}`, {
        state: false,
      });
      if (!response.data) {
        console.error(
          "Errr actualizando el estado de baneo:",
          response.statusText
        );
        return;
      }

      await fetchUsers();
    } catch (error) {
      console.error("Error actualizando el estado de baneo:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Administración de usuarios</h1>
      <button className={styles.homeButton}>
        <Link to="/dashboard" className={styles.homeLink}>
          HomeDashboard
        </Link>
      </button>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.name}</span>
              <button
                className={`${styles.adminButton} ${
                  user.type_user === "admin" ? styles.admin : styles.user
                }`}
                onClick={() =>
                  handleUpdateRole(user.id, user.type_user === "admin" ? 2 : 1)
                }
              >
                {user.type_user === "admin" ? "Quitar Admin" : "Hacer Admin"}
              </button>
              <button
                className={`${styles.bannedButton} ${
                  user.state ? styles.unbanned : styles.banned
                }`}
                onClick={() => handleBanUser(user.id, !user.state)}
              >
                {user.state ? "Banear" : "Desbanear"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
