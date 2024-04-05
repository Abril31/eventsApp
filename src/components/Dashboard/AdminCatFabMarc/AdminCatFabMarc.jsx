import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./adminCatFabMarc.module.css";
import axios from "axios";

const AdminCateAndMarc = () => {
  const [marcas, setMarcas] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasResponse = await axios.get("http://localhost:3001/categorias");
        setCategorias(categoriasResponse.data);

        const marcasResponse = await axios.get("http://localhost:3001/marcas");
        setMarcas(marcasResponse.data);

        const fabricantesResponse = await axios.get("http://localhost:3001/fabricantes");
        setFabricantes(fabricantesResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (url, id, setState) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este elemento?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`http://localhost:3001/${url}/change/${id}`, {
          estado: false,
        });
        const response = await axios.get(`http://localhost:3001/${url}`);
        setState(response.data);
      } catch (error) {
        console.error("Error al eliminar elemento:", error);
      }
    }
  };

  const restoreItem = async (url, id, setState) => {
    const confirmRestore = window.confirm(
      "¿Está seguro que desea restaurar este elemento?"
    );
    if (confirmRestore) {
      try {
        await axios.put(`http://localhost:3001/${url}/change/${id}`, {
          estado: true,
        });
        const response = await axios.get(`http://localhost:3001/${url}`);
        setState(response.data);
      } catch (error) {
        console.error("Error al restaurar elemento:", error);
      }
    }
  };

  return (
    <div>
      <div>
        <Link to="/dashboard" className={styles.buttonDashboard}>Admin Users</Link>
      </div>
      <div className={styles.cardContainer}>
      
        <div className={styles.card}>
        <div className={styles.contenedor}>
          <h2 className={styles.productName}>Lista de Categorias</h2>
        <Link to="/dashboard/creationCategory" className={styles.buttonCreation}>Creation Category</Link>
          </div>
          <div className={styles.listContainer}>
            {categorias.map((categoria) => (
              <div key={categoria.id} className={`${styles.itemLista} ${!categoria.estado ? styles.deletedCategoria : ""}`}>
                <div className={styles.nombre}>{categoria.nombre}</div>
                <button
                  className={categoria.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => categoria.estado ? deleteItem('categorias', categoria.id, setCategorias) : restoreItem('categorias', categoria.id, setCategorias)}
                >
                  {categoria.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>

      
    
        <div className={styles.card}>
          <div className={styles.contenedor}>
          <h2 className={styles.productName}>Lista de Marcas</h2>
        <Link to="/dashboard/creationMarca" className={styles.buttonCreation}>Creation Marcas</Link>
        </div>
          <div className={styles.listContainer}>
            {marcas.map((marca) => (
              <div key={marca.id} className={`${styles.itemLista} ${!marca.estado ? styles.deletedCategoria : ""}`}>
                <div className={styles.nombre}>{marca.nombre}</div>
                <button
                  className={marca.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => marca.estado ? deleteItem('marcas', marca.id, setMarcas) : restoreItem('marcas', marca.id, setMarcas)}
                >
                  {marca.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>

      
        <div className={styles.card}>
        <div className={styles.contenedor}>
          <h2 className={styles.productName}>Lista de Fabricantes</h2>
        <Link to="/dashboard/creationFabricante" className={styles.buttonCreation}>Creation Fabricantes</Link>
          </div>
          <div className={styles.listContainer}>
            {fabricantes.map((fabricante) => (
              <div key={fabricante.id} className={`${styles.itemLista} ${!fabricante.estado ? styles.deletedCategoria : ""}`}>
                <div className={styles.nombre}>{fabricante.nombre}</div>
                <button
                  className={fabricante.estado ? styles.deleteButton2 : styles.restoreButton2}
                  onClick={() => fabricante.estado ? deleteItem('fabricantes', fabricante.id, setFabricantes) : restoreItem('fabricantes', fabricante.id, setFabricantes)}
                >
                  {fabricante.estado ? "Eliminar" : "Restaurar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCateAndMarc;
