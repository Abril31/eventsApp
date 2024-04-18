import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useForm } from 'react-hook-form';
import { Cloudinary } from "@cloudinary/url-gen";
import styles from './Profile.module.css';
import profile from "../../assets/icons/profile.svg";
import { FaStar } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';


const Profile = () => {
  const { isLogged, user, login } = useAuthStore();
  console.log('userProfile--->',user);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventReview, setEventReview] = useState({
    "value": 0,
    "comment": "",
    "id_event": 0,
    "id_user": 0
  });
  const [editedValue, setEditedValue] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [userData, setUserData] = useState([]);
  const [userUpdated, setUserUpdated] = useState(false);
  const [IdUser, setIdUser] = useState(0);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dcvxjhqk8",
      api_key: '521923274491417', 
      api_secret: 'RqUuw470QhKw4mzq0t_pyTRRcWg',
      file: "event"
    },
  });
  const url='http://localhost:3001/api/v1';

  const handleReviewEvent = async (id_event, id_user) => {
    console.log(`url review---> ${url}/event/review/${id_event}/${id_user}`);
    try {
      const response = await axios.get(`${url}/event/review/${id_event}/${id_user}`);
      const reviewData = response.data;
      console.log('review Response--->', response.data);
      if(!reviewData.message){
        setEventReview(prevState => ({
          ...prevState,
          [id_event]: reviewData
        }));
      }
    } catch (error) {
      console.error("Error al obtener review del evento:", error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        
        console.log(`${url}/ticket/event/review/${user.id_user || user.user_id}`);
        const response = await axios.get(`${url}/ticket/event/review/${user.user_id || user.id_user}`);
        console.log('Datos recibidos:', response.data); // Verificar los datos recibidos
        setEvents(response.data); // Actualizar el estado events
        response.data.forEach(event => {
          handleReviewEvent(event.id_event, user.user_id);
        });
      } catch (error) {
        console.error("Error trayendo los eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const displayName = user.name || (user ? user.name || 'unknown' : 'unknown');

  const onSubmit = async (data) => {
    try {
      console.log('user anterior---> ', user);
      const newDataUser= {name: data.nombre, image:previewImage}
      const updateUser={
        access:user.access,
        name:data.nombre,
        email:user.email,
        password:user.password,
        type_user:user.type_user,
        status:user.status,
        image:previewImage,
        id_user:user.id_user || user.user_id,
      }
      console.log('data para actualizar usuario BD--->', newDataUser)
      login(updateUser);
      console.log('user actualizado---> ', user);
      await axios.put(`${url}/userchange/${user.id_user || user.user_id}`, newDataUser);
      console.log("Datos del usuario actualizados exitosamente:", newDataUser); 
    
      setUserUpdated(true);
      setImage(null);

      setTimeout(() => setUserUpdated(false), 3000);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleImage = async (event) => {
    const cloudName = cld.cloudName;
    console.log('cloudname--->', cloudName);
    const selectedImage = event.target.files[0];
    console.log('selectedImage---> ', selectedImage);
  
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
      
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
            },
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Imagen seleccionada:", file);
    const imageUrl = URL.createObjectURL(file);
    setUserData(prevUserData => ({
      ...prevUserData,
      picture: imageUrl
    }));
    setImage(file);
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return { formattedDate };
  };

  const handleSaveEvent = async (idEvent) => {
    if (!(idEvent in eventReview)) {
      const data = {
        id_event: idEvent,
        id_user: user.user_id,
        comment: editedComment,
        value: editedValue  
      };
      console.log('data review--->', data);
      try {
        const response = await axios.post(`${url}/event/review`, data);
        console.log('Datos guardados exitosamente:', response.data);
        setEventReview(prevState => ({
          ...prevState,
          [idEvent]: [{
            value: editedValue,
            comment: editedComment
          }]
        }));
      } catch (error) {
        console.error('Error al guardar los datos:', error);
      }
    }
  };

  useEffect(() => {
    if (userUpdated) {
      // Realizar acciones adicionales después de que userUpdated se establece en true
      console.log('Usuario actualizado, realizando acciones adicionales...');
      navigate("/");
    }
  }, [userUpdated]);

  return (
    isLogged && (
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
        <img className={styles.profilePicture} src={user.image || profile} alt={displayName} />

          <div className={styles.profileDetails}>
            <h2 className={styles.profileName}>{user.name}</h2>
            <p className={styles.profileEmail}>{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
          <label htmlFor="upload-image" className={styles.cameraIcon}>
            <input id="upload-image" type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
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
          </label>
          <h3 className={styles.profileSectionTitle}>Actualizar Nombre:
          <input
            id="name"
            type="text"
            {...register('nombre', { required: 'El nombre es requerido', maxLength: { value: 20, message: 'El nombre no puede tener más de 20 caracteres' } })}
          />
          {errors.nombre && <p className={styles.errorMessage}>{errors.nombre.message}</p>}
          </h3>

          <button type="submit" className={styles.updateProfileButton}>
            Actualizar perfil
          </button>
          {userUpdated && <p className={styles.userUpdatedMessage}>Usuario actualizado</p>}
        </form>

        <div className={styles.profileSection}>
          <h3 className={styles.profileSectionTitle}>Historial de Eventos</h3>
          {events.map((event) => (
            <div>
              <div >{event.name}</div>
              <div className={styles.image}>
                <img
                    key={event.id}
                    src={event.image}
                    alt={`Imagen ${event.name}`}
                    className={styles.eventImage}
                  /></div>
              <div className={styles.name}></div>
              <div className={styles.name}>{event.description}</div>
              <div className={styles.name}>Del: {formatDateTime(event.start_date).formattedDate} al: {formatDateTime(event.end_date).formattedDate}</div>
              <div className={styles.name}>de hrs:{event.start_hour} a hrs: {event.end_hour}</div>
              <div className={styles.name}>{event.location}</div>
              <div className={styles.name}>{event.category}</div>
              <div className={styles.name}>{event.access}</div>
              <div className={styles.name}>{event.city}</div>
              <div className={styles.name}>
                  {(event.id_event in eventReview && eventReview[event.id_event][0]) ? (
                    <div>Value: {eventReview[event.id_event][0].value}</div>
                  ) : ( 
                    <><label>Califique: </label>
                    <input
                      type="number"
                      value={editedValue}
                      onChange={(e) => setEditedValue(e.target.value)}
                      placeholder="Ingrese un valor de 1 a 5"
                      min="0"
                      max="5"
                      cols="10"
                    /></>
                  )}
                </div>
                <div className={styles.name}>
                  {(event.id_event in eventReview && eventReview[event.id_event][0]) ? (
                    <div>Comment: {eventReview[event.id_event][0].comment}</div>
                  ) : (
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      placeholder="Su comentario sobre el evento"
                      cols="60"
                    />
                  )}
              </div>
              {(event.id_event in eventReview && eventReview[event.id_event][0]) ? (
                    <div>---*---</div>
                  ) : (
              <button className={styles.updateProfileButton} onClick={() => handleSaveEvent(event.id_event)}>Guardar Review para {event.name}</button>
              )}
              <div><hr/><hr/><hr/></div>
            </div>
        ))}
        </div>
      </div>
    )
  );
};

export default Profile;