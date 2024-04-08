import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./banned.module.css"

const Banned = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: `${window.location.origin}/logout` });
   
    window.location.href = `https://dev-06rw3uj31omfki3w.us.auth0.com/v2/logout?returnTo=${window.location.origin}`;
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>You are banned!</h1>
      <p className={styles.message}>Unfortunately, you are banned from accessing this site.</p>
      <p className={styles.message}>If you believe this is a mistake or would like to appeal, please contact support.</p>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    
    </div>
  );
}

export default Banned;
