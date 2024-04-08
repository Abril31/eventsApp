import { useState, useEffect } from "react";
import validation from "./validationEvent";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./creationEvent.module.css"

const CreateEvent = () => {
    const baseURL = 'http://localhost:3001/api/v1';
    const [ errorMessage,setErrorMessage] = useState("")
    const [popupOpen, setPopupOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        start_hour: '',
        end_hour: '',
        location: '',
        category: '',
        access: '',
        image: '',
        city:'',
        id_user:'',
        id_sponsor:'',
        available_quantity:'',
        ticket:{}
    });

    const [formErrors, setFormErrors] = useState({});
    const [formHasErrors, setFormHasErrors] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [sponsors, setSponsor] = useState([]);

    const openPopup = () => {
        window.open('', 'popup', 'width=400,height=200');
        setPopupOpen(true);
    }
    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await axios.get(`${baseURL}/sponsor`);
                setSponsor(response.data);
            } catch (error) {
                console.error("Error al obtener a los Sponsors:", error);
            }
        }
        fetchSponsors();
    }, []);
    
    useEffect(() => {
        const errors = validation(formData);
     setFormErrors(errors);
    }, [formData]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setFormHasErrors(false); 
        
    }

    const handleImage = async (event) => {
        const selectedImage = event.target.files [0];
  
        if(selectedImage){
          setPreviewImage(URL.createObjectURL(selectedImage))
        
         try{
             const formData = new FormData();
             formData.append("image",selectedImage);
  
             const cloudinaryResponse = await axios.post(`${baseURL}/imagenes/uploadImage`,formData,{
              headers: {
                  "Content-Type": "multipart/form-data",
              }
             })
  
             if(cloudinaryResponse.status === 200 ){
              const cloudinaryData = cloudinaryResponse.data;
              console.log("Imagen subida a Cloudinary exitosamente:", cloudinaryData.imageUrl);
              setFormData((prevData) => ({
                  ...prevData,
                  imagen:cloudinaryData.imageUrl
              }))
              console.log("formData--->", formData);
             }else{
              console.error("Error al subir la imagen a Cloudinary")
             }
  
         }catch(error){
          console.error("Error al enviar la imagen a Cloudinary:", error);
      }
    } else {
      setPreviewImage("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validation(formData);

    if (Object.values(errors).some((error) => error !== "")) {
        setFormErrors(errors);
        setFormHasErrors(true);
        return;
    }

    try {
        await axios.post(`${baseURL}/register`, formData);
            setSuccessMessage("Evento creado exitosamente.");
            setFormData({
                name: "",
                description: "",
                start_date: "",
                end_date: "",
                start_hour: "",
                end_hour: "",
                location: "",
                category: "",
                access: "",
                image: "",
                city:'',
                id_user:'',
                id_sponsor:'',
                tickets:{ticket_type:'', price:0}
            });
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        
    } catch (error) {
       
        setErrorMessage(error.response.data.error); 
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }
}; 

 return(
    <div className={styles.container}>
        <button className={styles.homeButton}>
            <Link to="/dashboard" className={styles.homeLink}>
            HomeDashboard
            </Link>
        </button>
         <h2 className={styles.titulo}>Alta de un nuevo evento</h2>

         <form onSubmit={onSubmit}>
            <div className={styles.formControl}>
                <label className={styles.name}>Nombre del evento: </label>
                <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                {formErrors.name && <p className={styles.errors}>{formErrors.name}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.description}>Descripción: </label>
                <input 
                type="text" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                />
                {formErrors.description && <p className={styles.errors}>{formErrors.description}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.start_date}>Fecha inicio: </label>
                <input 
                type="text" 
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                />
                {formErrors.start_date && <p className={styles.errors}>{formErrors.start_date}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.end_date}>Fecha Final: </label>
                <input 
                type="text" 
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                />
                {formErrors.end_date && <p className={styles.errors} >{formErrors.end_date}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.start_hour}>Hora de inicio </label>
                <input 
                type="text" 
                name="start_hour"
                value={formData.start_hour}
                onChange={handleChange}
                />
                {formErrors.start_hour && <p className={styles.errors}>{formErrors.start_hour}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.end_hour}>Hora Final: </label>
                <input 
                type="text" 
                name="end_hour"
                value={formData.end_hour}
                onChange={handleChange}
                />
                {formErrors.end_hour && <p className={styles.errors}> {formErrors.end_hour}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.location}>Lugar: </label>
                <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                />
                {formErrors.location && <p className={styles.errors}> {formErrors.location}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.city}>Ciudad: </label>
                <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                />
                {formErrors.city && <p className={styles.errors}>{formErrors.city}</p>}
            </div>

            <div>
                <label className={styles.image} htmlFor="image">
                    Image:
                </label>
                <input 
                type="file"
                accept="image/*"
                onChange={handleImage}
                name="image"
                />
                {previewImage && (
                    <img 
                    src={previewImage} 
                    alt="Vista Previa"
                    width={"200px"}
                     />
                )}
                {formErrors.image && (
                    <p className={styles.errors}>{formErrors.image}</p>
                )}
            </div>

            <div className={styles.formControl}>
                <label className={styles.city}>Categoria: </label>
                <input 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                />
                {formErrors.category && <p className={styles.errors}>{formErrors.category}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.sponsor}>Sponsor: </label>
                <select
                name="id_sponsor"
                value={formData.id_sponsor}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' disabled>
                    Seleccione Sponsor
                </option>
                {sponsors.map((sponsor,index) => ( 
                    <option key={index} value={sponsor.id_sponsor} className={styles.option}>
                        {sponsor.enterprise_name}
                    </option>
                
                ))}
                </select>
                {formErrors.id_sponsor && <p className={styles.errors}>{formErrors.id_sponsor}</p>}
            </div>

            <div className={styles.formControl}>
                <label className={styles.access}>Tipo de evento: </label>
                <select
                name="access"
                value={formData.access}
                onChange={handleChange}
                className={styles.select}
                >
                    <option value='' disabled>Tipo de evento</option>
                    <option value="paid" className={styles.option}>PAID</option>
                    <option value="free" className={styles.option}>FREE</option>
                </select>
                {formErrors.access && <p className={styles.errors}>{formErrors.access}</p>}
            </div>
            <div className={styles.formControl}>
                <label className={styles.available_quantity}>Cantidad de tickets a la venta: </label>
                <input 
                type="number" 
                name="available_quantity"
                value={formData.available_quantity}
                onChange={handleChange}
                />
                {formErrors.available_quantity && <p className={styles.errors}> {formErrors.available_quantity}</p>}
            </div>
            <button type="sumbit"  className={styles.button}>Crear Evento</button>
         </form>
        {errorMessage && (alert(errorMessage))}
        {successMessage && (alert(successMessage))}  
        <button className={styles.homeButton}>
            <Link to="/dashboard" className={styles.homeLink}>
            HomeDashboard
            </Link>
        </button>
    </div>
 )
 }
export default CreateEvent