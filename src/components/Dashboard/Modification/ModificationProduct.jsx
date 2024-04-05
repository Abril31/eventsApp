import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./modificationProduct.module.css";
import { Link, useParams } from "react-router-dom";

const ModificationProduct = () => {
    const URL = "http://localhost:3001";
    const { id } = useParams();

    const [successMessage,setSuccessMessage] = useState('')
    const [fabricantes, setFabricantes] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        especificaciones: "",
        nroserie: "",
        nromac: "",
        precio: "",
        stock: "",
        idCategoria: "",
        idMarca: "",
        idFabricante: "",
        minimo: "",
        preferencia: ""
    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${URL}/productos/${id}`);
                const productData = response.data;
                setFormData({
                    ...productData,
                    idCategoria: productData.Categoria.id,
                    idFabricante: productData.Fabricante.id,
                    idMarca: productData.Marca.id
                });
                setSuccessMessage("Producto actualizado con exito")
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            } catch (error) {
                console.error("Error al obtener datos del producto:", error.message);
            }
        };
        fetchProductData();
    }, [id]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${URL}/categorias`);
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchFabricantes = async () => {
            try {
                const response = await axios.get(`${URL}/fabricantes`);
                setFabricantes(response.data);
            } catch (error) {
                console.error("Error al obtener los fabricantes:", error);
            }
        };
        fetchFabricantes();
    }, []);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get(`${URL}/marcas`);
                setMarcas(response.data);
            } catch (error) {
                console.error("Error al obtener las marcas:", error);
            }
        };
        fetchMarcas();
    }, []);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${URL}/productos/change/${id}`, {
                ...formData,
            });
        } catch (error) {
            console.error("Error al enviar la solicitud PUT:", error.message);
        }
    };
return(
    <div className={styles.container}>
       <h2 className={styles.title}>Edicion de Producto</h2>
       
       {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
       )}

       <form onSubmit={onSubmit}>

        <div className={styles.formControl}>
            <label className={styles.nombre}>Nombre: </label>
            <input 
             type="text"
             name="nombre" 
             value={formData.nombre}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.descripcion}>Descripcion: </label>
            <input 
             type="text"
             name="descripcion" 
             value={formData.descripcion}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.especificaciones}>Especificaciones: </label>
            <input 
             type="text"
             name="especificaciones" 
             value={formData.especificaciones}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.nroserie}>nroserie: </label>
            <input 
             type="text"
             name="nroserie" 
             value={formData.nroserie}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.nromac}>nromac: </label>
            <input 
             type="text"
             name="nromac" 
             value={formData.nromac}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.precio}>precio: </label>
            <input 
             type="text"
             name="precio" 
             value={formData.precio}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.stock}>stock: </label>
            <input 
             type="text"
             name="stock" 
             value={formData.stock}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.minimo}>minimo: </label>
            <input 
             type="text"
             name="minimo" 
             value={formData.minimo}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.preferencia}>preferencia: </label>
            <input 
             type="text"
             name="preferencia" 
             value={formData.preferencia}
             onChange={handleChange}
             />
        </div>

        <div className={styles.formControl}>
            <label className={styles.categoria}>Categoria: </label>
            <select
             name="idCategoria" 
             value={formData.idCategoria}
             onChange={handleChange}>
             <option value='' disabled>
                Seleccione una categoria
             </option>
             {categorias.map((categoria,index) => (
                <option key={index} value={categoria.id}>
                    {categoria.nombre}
                </option>
             ))}
            </select>
        </div>

        <div className={styles.formControl}>
            <label className={styles.fabricante}>Fabricante: </label>
            <select
             name="idFabricante" 
             value={formData.idFabricante}
             onChange={handleChange}>
             <option value='' disabled>
                Seleccione un Fabricante
             </option>
             {fabricantes.map((fabricante,index) => (
                <option key={index} value={fabricante.id}>
                    {fabricante.nombre}
                </option>
             ))}
            </select>
        </div>

        <div className={styles.formControl}>
            <label className={styles.marca}>Marca: </label>
            <select
             name="idMarca" 
             value={formData.idMarca}
             onChange={handleChange}>
             <option value='' disabled>
                Seleccione una Marca
             </option>
             {marcas.map((marca,index) => (
                <option key={index} value={marca.id}>
                    {marca.nombre}
                </option>
             ))}
            </select>
        </div>

        <button type="sumbit" className={styles.button}>Actualizar Producto</button>

       </form>
        <Link to="/dashboard/HomeDashboard"className={styles.link}>Volver a HomeDashboard</Link>
    </div>
)
}

export default ModificationProduct