import React, { useState } from 'react';
import axios from 'axios';
import styles from "./searchBarUsuarios.module.css"

const SearchBarUsuarios = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      let response;
      if (searchTerm.trim() === '') {
        response = await axios.get(`http://localhost:3001/usuarios`);
      } else {
        response = await axios.get(`http://localhost:3001/usuarios/nombre/${searchTerm}`);
      }
      if (response && response.data) {
        const uniqueUserNamesArray = response.data.reduce((acc, curr) => {
          if (!acc.includes(curr.nombre)) {
            acc.push(curr.nombre);
          }
          return acc;
        }, []);
        onSearch(uniqueUserNamesArray);
      } else {
        console.error('La respuesta no contiene datos:', response);
      }
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      if (error.response && error.response.status === 404) {
        setUserNotFound(true);
        setTimeout(() => {
          setUserNotFound(false);
        }, 2000); 
      } else {
        setUserNotFound(false);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (searchTerm.trim() === '') {
      handleSearch();
    } else {
      onSearch('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Buscar usuarios por nombre"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button type="button" onClick={handleClearSearch} className={styles.clearButton}>
              X
            </button>
          )}
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </div>
      </form>
      {userNotFound && <p className={`${styles.error} ${styles.errorMessage}`}>Este usuario no existe.</p>}
    </div>
  );
};

export default SearchBarUsuarios;
