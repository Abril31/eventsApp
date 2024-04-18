import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthStore } from "../../../store/authStore";
import styles from './adminUsers.module.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuthStore();
    console.log('admin users userData--->', user);
    const [order, setOrder] = useState('asc');
    const url="http://localhost:3001/api/v1";

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/getallusers`);
            let sortedUsers = response.data;
            if (order === 'asc') {
                sortedUsers = response.data.sort((a, b) => a.name.localeCompare(b.name));
            } else if (order === 'desc') {
                sortedUsers = response.data.sort((a, b) => b.name.localeCompare(a.name));
            }
            setUsers(sortedUsers);
        } catch (error) {
            console.error("Error trayendo usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [order]);

    const handleUpdateRole = async (userId, newRole) => {
        console.log('userId--->',userId);
        console.log('newRole-->',newRole);
        try {
            const response = await axios.put(
                `${url}/usertype/${userId}/${newRole}`
            );

            if (!response.data) {
                console.error("Error updating user type:", response.statusText);
                return;
            }

            await fetchUsers();
        } catch (error) {
            console.error("Error updating user type:", error);
        }
    };
    
    const handleBanUser = async (userId, isBanned) => {
        try{
            const response = await axios.put(
                `${url}/status/${userId}/${isBanned}`,
            );
            if(!response.data) {
                console.error("Errr actualizando el estado de baneo:", response.statusText)
                return;
            }

      await fetchUsers();
    } catch (error) {
      console.error("Error actualizando el estado de baneo:", error);
    }
    console.log('users--->',users);
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Administración de usuarios</h1>
            <button className={styles.homeButton}>
                <Link to="/dashboard" className={styles.homeLink}>
                HomeDashboard
                </Link>
            </button>
            <div>Ver el listado en Orden: 
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
            <ul className={styles.userList}>
                {users.map((user) => (
                    <li key={user.id} className={styles.userListItem}>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user.name}</span>
                            <button
                                className={`${styles.adminButton} ${user.type_user === "admin" ? styles.admin : styles.user}`}
                                onClick={() => handleUpdateRole(user.id_user, user.type_user === "admin" ? 'user' : 'admin')}
                            >
                                {user.type_user === "admin" ? "Quitar Admin" : "Hacer Admin"}
                            </button>
                            <button
                                className={`${styles.bannedButton} ${user.status ? styles.unbanned : styles.banned}`}
                                onClick={() => handleBanUser(user.id_user, !user.status)}
                            >
                                {user.status ? "Banear" : "Desbanear"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsers;
