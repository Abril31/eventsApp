import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './Profile.module.css';
import { FaStar } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const [userUpdated, setUserUpdated] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);

  const fetchUserVotes = async () => {
    try {
      if (userData.id) {
        const response = await axios.get(`http://localhost:3001/votos/user/${userData.id}`);
        setUserVotes(response.data);
      }
    } catch (error) {
      console.error('Error fetching user votes:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated && user && user.email) {
          const response = await axios.get(`http://localhost:3001/usuarios/email/${user.email}`);
          if (response.data.length > 0) {
            const userData = response.data[0];
            setUserData(userData);
            setValue('nombre', userData.nombre || '');
            setValue('dirEnvio', userData.dirEnvio || '');
            setValue('dirFacturacion', userData.dirFacturacion || '');
            setValue('telefono', userData.telefono || '');
          } else {
            console.error('No se encontraron usuarios con ese email.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [isAuthenticated, user, setValue]);

  useEffect(() => {
    if (userData.id) {
      fetchUserVotes();
    }
  }, [userData.id]);

  useEffect(() => {
    const fetchProductDetails = async (idProducto) => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${idProducto}`);
        return response.data;
      } catch (error) {
        console.error("Error trayendo el detalle del producto:", error);
        return null;
      }
    };

    const fetchAllProductDetails = async () => {
      const productDetails = await Promise.all(userVotes.map(vote => fetchProductDetails(vote.idProducto)));
      setProducts(productDetails);
    };

    fetchAllProductDetails();
  }, [userVotes]);

  const displayName = userData.nombre || (user ? user.name || 'unknown' : 'unknown');

  const onSubmit = async (data) => {
    try {
     
      if (image) {
        console.log("Imagen seleccionada para cargar:", image); 
        const formData = new FormData();
        formData.append('image', image);

        const cloudinaryResponse = await axios.post(`http://localhost:3001/imagenes/uploadImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (cloudinaryResponse.status === 200) {
          const imageUrl = cloudinaryResponse.data.imageUrl;
          console.log("Imagen cargada a Cloudinary exitosamente:", imageUrl);
          data.picture = imageUrl;
        } else {
          console.error("Error al subir la imagen a Cloudinary");
        }
      }

      
      await axios.put(`http://localhost:3001/usuarios/change/${userData.id}`, data);
      console.log("Datos del usuario actualizados exitosamente:", data); 

    
      setUserUpdated(true);
      setImage(null);

      setTimeout(() => setUserUpdated(false), 3000);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  const handleDeleteVote = async (id) => {
    try {
      console.log("ID del voto a eliminar:", id); 
      await axios.delete(`http://localhost:3001/votos/delete/${id}`);
      console.log("Voto eliminado correctamente"); 
      fetchUserVotes();
      setUserUpdated(false);
    } catch (error) {
      console.error('Error deleting vote:', error);
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
  

  return (
    isAuthenticated && (
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
        <img className={styles.profilePicture} src={userData.picture || user.picture} alt={displayName} />

          <div className={styles.profileDetails}>
            <h2 className={styles.profileName}>Nombre: {displayName}</h2>
            <p className={styles.profileEmail}>Email: {user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
          
        <label htmlFor="upload-image" className={styles.cameraIcon}>
  <input id="upload-image" type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
  <FaCamera />
</label>

          
          <h3 className={styles.profileSectionTitle}>Nombre:</h3>
          <input
            type="text"
            {...register('nombre', { required: 'El nombre es requerido', maxLength: { value: 20, message: 'El nombre no puede tener más de 20 caracteres' } })}
          />
          {errors.nombre && <p className={styles.errorMessage}>{errors.nombre.message}</p>}

          <h3 className={styles.profileSectionTitle}>Dirección de Envío:</h3>
          <input
            type="text"
            {...register('dirEnvio', { maxLength: { value: 30, message: 'La dirección de envío no puede tener más de 30 caracteres' } })}
          />
          {errors.dirEnvio && <p className={styles.errorMessage}>{errors.dirEnvio.message}</p>}

          <h3 className={styles.profileSectionTitle}>Dirección de Facturación:</h3>
          <input
            type="text"
            {...register('dirFacturacion', { maxLength: { value: 30, message: 'La dirección de facturación no puede tener más de 30 caracteres' } })}
          />
          {errors.dirFacturacion && <p className={styles.errorMessage}>{errors.dirFacturacion.message}</p>}

          <h3 className={styles.profileSectionTitle}>Teléfono:</h3>
          <input
            type="text"
            {...register('telefono', { pattern: { value: /^[0-9]+$/, message: 'El teléfono solo puede contener números' }, maxLength: { value: 15, message: 'El teléfono no puede tener más de 15 caracteres' } })}
          />
          {errors.telefono && <p className={styles.errorMessage}>{errors.telefono.message}</p>}

          <button type="submit" className={styles.updateProfileButton}>
            Actualizar perfil
          </button>

          {userUpdated && <p className={styles.userUpdatedMessage}>Usuario actualizado</p>}
        

          <div className={styles.profileSection}>
            <h3 className={styles.profileSectionTitle}>Historial de Comentarios</h3>
            <ul className={styles.commentList}>
              {userVotes.map((vote, index) => (
                <li key={vote.id} className={styles.commentItem}>
                  {products[index] && (
                    <div className={styles.productDetails}>
                      <p className={styles.productName}>{products[index].nombre}</p>
                      <div>
                        <img className={styles.productImage} src={products[index].Imagenes[0].url} alt={products[index].nombre} />
                      </div>
                      <div className={styles.productInfo}></div>
                    </div>
                  )}
                  <div className={styles.commentContent}>
                    <p className={styles.commentText}><span className={styles.boldText}>Comentario:</span> {vote.comentario}</p>
                    <p className={styles.commentVote}>Voto: {Array.from({ length: vote.voto }, (_, i) => <FaStar key={i} className={styles.starIcon} />)}</p>
                    <button className={styles.deleteButton}  onClick={() => handleDeleteVote(vote.id)}>x</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    )
  );
};

export default Profile;