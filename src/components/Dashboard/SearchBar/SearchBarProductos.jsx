import React, { useState } from 'react';
import axios from 'axios';
import styles from "./searchBarProductos.module.css";

const SearchBarProductos = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productNotFound, setProductNotFound] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setProductNotFound(false); 
  };

  const handleSearch = async () => {
    try {
      let response;
      if (searchTerm.trim() === '') {
        response = await axios.get(`http://localhost:3001/productos`);
      } else {
        response = await axios.get(`http://localhost:3001/productos/nombre/?nombre=${searchTerm}`);
      }
      if (response && response.data) {
        if (response.data.length === 0) {
          setProductNotFound(true); 
          setTimeout(() => {
            setProductNotFound(false);
          }, 2000);
        } else {
          onSearch(response.data);
        }
      } else {
        console.error('La respuesta no contiene datos:', response);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    setSearchTerm('');
    if (searchTerm.trim() === '') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Buscar productos por nombre"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.inputField}
          />
          {searchTerm && (
            <button type="button" onClick={handleClear} className={styles.clearButton}>
              X
            </button>
          )}
        </div>
      </form>
      <button type="submit" onClick={handleSubmit} className={styles.submitButton}>
        Buscar
      </button>
      {productNotFound && <p className={styles.errorMessage}>Este producto no existe.</p>}
    </div>
  );
}

export default SearchBarProductos;
