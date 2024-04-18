import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { Cloudinary } from "@cloudinary/url-gen";
import validation from "./validationEvent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./creationEvent.module.css"

const CreateEvent = () => {
    const baseURL = 'http://localhost:3001/api/v1';

    const { user } = useAuthStore();
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
            city:'',
        
            ticket_name_1: "",
            ticket_price_1: 0,
            ticket_available_quantity_1: 0,
            ticket_catalog_1: "",
            
            ticket_name_2: "",
            ticket_price_2: 0,
            ticket_available_quantity_2: 0,
            ticket_catalog_2: "",
        
            ticket_name_3: "",
            ticket_price_3: 0,
            ticket_available_quantity_3: 0,
            ticket_catalog_3: "",
            
            id_sponsor1:0,
            id_sponsor2:0,
            id_sponsor3:0
        
    });

    const cld = new Cloudinary({
        cloud: {
          cloudName: "dcvxjhqk8",
          api_key: '521923274491417', 
          api_secret: 'RqUuw470QhKw4mzq0t_pyTRRcWg',
          file: "event"
        },
      });

    const [formErrors, setFormErrors] = useState({});
    const [formHasErrors, setFormHasErrors] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [dataEvent, setDataEvent] = useState({});
    const [sponsors, setSponsor] = useState([]);
    const [dataTicket, setDataTicket] = useState({});
    const [nroSponsors, setNroSponsors] = useState(2);
    const navigate = useNavigate();

    const openPopup = () => {
        window.alert('', 'popup', 'width=400,height=200');
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
    function convertirFecha(fecha) {
        var partes = fecha.split('/');
        var fechaConvertida = partes[2] + '-' + partes[1].padStart(2, '0') + '-' + partes[0].padStart(2, '0');
        return fechaConvertida;
    }

    const handleImage = async (event) => {
        const selectedImage = event.target.files [0];
        console.log('selectedImage---> ', selectedImage);
        if(selectedImage){
          setPreviewImage(URL.createObjectURL(selectedImage))
          const formData = new FormData();
          formData.append("file", selectedImage);
          formData.append("upload_preset", "events");
  
          try {
              const cloudinaryResponse = await axios.post(
                  `https://api.cloudinary.com/v1_1/dcvxjhqk8/image/upload`,
                  formData,
                  {
                      headers: {
                          "Content-Type": "multipart/form-data",
                      }
                  }
              );
  
              if (cloudinaryResponse.status === 200) {
                  const imageUrl = cloudinaryResponse.data.secure_url;
                  console.log("Imagen subida a Cloudinary exitosamente:", imageUrl);
                  setPreviewImage(imageUrl);
              } else {
                  console.error("Error al subir la imagen a Cloudinary");
              }
          } catch (error) {
              console.error("Error al enviar la imagen a Cloudinary:", error);
          }
         
    } else {
      setPreviewImage("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validation(formData);
    console.log('formData--->', formData);

    if (Object.values(errors).some((error) => error !== "")) {
        setFormErrors(errors);
        setFormHasErrors(true);
        return;
    }

    try {
        console.log('user en createEvent--->', user);
        setDataEvent({
            name        : formData.name, 
            description : formData.description, 
            start_date  : convertirFecha(formData.start_date), 
            end_date    : convertirFecha(formData.end_date), 
            start_hour  : formData.start_hour, 
            end_hour    : formData.end_hour, 
            location    : formData.location, 
            category    : formData.category, 
            access      : formData.access, 
            city        : formData.city,
            id_user     : user.user_id || user.id_user,
            image       : [previewImage],
            sponsor     : [formData.id_sponsor1, formData.id_sponsor2, formData.id_sponsor3]
            })
        console.log('Objeto enviado a back--->', dataEvent);
        console.log(`URL---> ${baseURL}/registerevent/${user.user_id || user.id_user}`);
        const newEvent=await axios.post(`${baseURL}/registerevent/${user.user_id || user.id_user}`, dataEvent);
        console.log("Nuevo evento--->", newEvent.data);
        const id_event = newEvent.data.event.id_event;

        if(formData.ticket_name_1){
            setDataTicket({
            ticket_type        : formData.ticket_name_1,
            price              : formData.ticket_price_1,
            available_quantity : formData.ticket_available_quantity_1,
            price_cat          : formData.ticket_catalog_1,
            id_user            : user.user_id || user.id_user,
            })
            console.log('Objeto para ticket 1--->', dataTicket);
            await axios.post(`${baseURL}/createticket/${id_event}`, dataTicket);
        }
        if(formData.ticket_name_2){
            setDataTicket({
            ticket_type        : formData.ticket_name_2,
            price              : formData.ticket_price_2,
            available_quantity : formData.ticket_available_quantity_2,
            price_cat          : formData.ticket_catalog_2,
            id_user            : user.user_id || user.id_user,
            })
            console.log('Objeto para ticket 1--->', dataTicket);
            await axios.post(`${baseURL}/createticket/${id_event}`, dataTicket);
        }
        if(formData.ticket_name_3){
            setDataTicket({
            ticket_type        : formData.ticket_name_3,
            price              : formData.ticket_price_3,
            available_quantity : formData.ticket_available_quantity_3,
            price_cat          : formData.ticket_catalog_3,
            id_user            : user.user_id || user.id_user,
            })
            console.log('Objeto para ticket 1--->', dataTicket);
            await axios.post(`${baseURL}/createticket/${id_event}`, dataTicket);
        }
            setSuccessMessage("Evento creado exitosamente.");
            setFormData({
                name        : '',
                description : '',
                start_date  : '',
                end_date    : '',
                start_hour  : '',
                end_hour    : '',
                location    : '',
                category    : '',
                access      : '',
                city        : '',
            
                ticket_name_1               : "",
                ticket_price_1              : 0,
                ticket_available_quantity_1 : 0,
                ticket_catalog_1            : "",
                
                ticket_name_2               : "",
                ticket_price_2              : 0,
                ticket_available_quantity_2 : 0,
                ticket_catalog_2            : "",
            
                ticket_name_3               : "",
                ticket_price_3              : 0,
                ticket_available_quantity_3 : 0,
                ticket_catalog_3            : "",
                
                id_sponsor1 : 0,
                id_sponsor2 : 0,
                id_sponsor3 : 0
            });
            setDataTicket({
                ticket_type        : "",
                price              : "",
                available_quantity : "",
                price_cat          : "",
                id_user            : "",
                id_event           : "",
                })
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

        window.alert("Evento guardado exitosamente");
        navigate("/#/home");

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
            <div name="sponsor" className={styles.sponsors}>
            Sponsors:
            <div className={styles.formControl} name="sponsors">
                <label className={styles.sponsor}>Sponsor 1: </label>
                <select
                name="id_sponsor1"
                value={formData.id_sponsor1}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' selected disabled>
                    Seleccione Primer Sponsor
                </option>
                {sponsors.map((sponsor,index) => ( 
                    <option key={index} value={sponsor.id_sponsor} className={styles.option}>
                        {sponsor.enterprise_name}
                    </option>
                
                ))}
                </select>
            </div>

            <div className={styles.formControl}>
                <label className={styles.sponsor}>Sponsor 2: </label>
                <select
                name="id_sponsor2"
                value={formData.id_sponsor2}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' selected>
                    Seleccione Segundo Sponsor
                </option>
                {sponsors.map((sponsor,index) => ( 
                    <option key={index} value={sponsor.id_sponsor} className={styles.option}>
                        {sponsor.enterprise_name}
                    </option>
                
                ))}
                </select>
            </div>

            <div className={styles.formControl}>
                <label className={styles.sponsor}>Sponsor 3: </label>
                <select
                name="id_sponsor3"
                value={formData.id_sponsor3}
                onChange={handleChange}
                className={styles.select}
                >
                <option value='' selected>
                    Seleccione Tercer Sponsor
                </option>
                {sponsors.map((sponsor,index) => ( 
                    <option key={index} value={sponsor.id_sponsor} className={styles.option}>
                        {sponsor.enterprise_name}
                    </option>
                
                ))}
                </select>
            </div>
            </div>
            <div className={styles.formControl}>
                <label className={styles.access}>Tipo de Pago: </label>
                <select
                name="access"
                value={formData.access}
                onChange={handleChange}
                className={styles.select}
                >
                    <option value='' disabled>Seleccione Tipo de Pago</option>
                    <option value="paid" className={styles.option}>PAID</option>
                    <option value="free" className={styles.option}>FREE</option>
                </select>
                {formErrors.access && <p className={styles.errors}>{formErrors.access}</p>}
            </div>
            <div name="tickets" className={styles.tickets}>
                Datos del Ticket 1:
                <div id="ticket_1" name="ticket_1">
                    <div className={styles.formControl}>
                        <label className={styles.city}>Descripciónt: </label>
                        <input 
                        type="text" 
                        value={formData.ticket_name_1}
                        name="ticket_name_1"
                        placeholder="Descripción del Ticket"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Cantidad de tickets a la venta: </label>
                        <input 
                        type="number"
                        value={formData.ticket_available_quantity_1} 
                        name="ticket_available_quantity_1"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Precio del ticket: </label>
                        <input 
                        type="number" 
                        value={formData.ticket_price_1}
                        name="ticket_price_1"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.city}>Cod. Catalogo: </label>
                        <input 
                        type="text" 
                        value={formData.ticket_catalog_1}
                        name="ticket_catalog_1"
                        placeholder="Generar en Stripe"
                        onChange={handleChange}
                        />
                    </div>
                    <hr/>
                </div>
                Datos del Ticket 2:
                <div id="ticket_2" name="ticket_2">
                    <div className={styles.formControl}>
                        <label className={styles.city}>Descripción: </label>
                        <input 
                        type="text" 
                        value={formData.ticket_name_2}
                        name="ticket_name_2"
                        placeholder="Descripción del Ticket"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Cantidad de tickets a la venta: </label>
                        <input 
                        type="number" 
                        value={formData.ticket_available_quantity_2}
                        name="ticket_available_quantity_2"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Precio del ticket: </label>
                        <input 
                        type="number" 
                        value={formData.ticket_price_2}
                        name="ticket_price_2"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.city}>Cod. Catalogo: </label>
                        <input 
                        type="text" 
                        name="ticket_catalog_2"
                        value={formData.ticket_catalog_2}
                        placeholder="Generar en Stripe"
                        onChange={handleChange}
                        />
                    </div>
                    <hr/>
                </div>
                Datos del Ticket 3:
                <div id="ticket_3" name="ticket_3">
                    <div className={styles.formControl}>
                        <label className={styles.city}>Descripción: </label>
                        <input 
                        type="text" 
                        value={formData.ticket_name_3}
                        name="ticket_name_3"
                        placeholder="Descripción del Ticket"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Cantidad de tickets a la venta: </label>
                        <input 
                        type="number" 
                        value={formData.ticket_available_quantity_3}
                        name="ticket_available_quantity_3"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.available_quantity}>Precio del ticket: </label>
                        <input 
                        type="number" 
                        value={formData.ticket_price_3}
                        name="ticket_price_3"
                        onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label className={styles.city}>Cod. Catalogo: </label>
                        <input 
                        type="text" 
                        value={formData.ticket_catalog_3}
                        name="ticket_catalog_3"
                        placeholder="Generar en Stripe"
                        onChange={handleChange}
                        />
                    </div>
                    <hr/>
                </div>
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
            <button type="submit"  className={styles.button}>Crear Evento</button>
         </form>
        {errorMessage && (alert(errorMessage))}
        {successMessage && (alert(successMessage))} 
        <><hr/>---O---</> 
        <button className={styles.homeButton}>
            <Link to="/dashboard" className={styles.homeLink}>
            HomeDashboard
            </Link>
        </button>
    </div>
 )
 }
export default CreateEvent