import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';
import { useAuthStore } from '../../store/authStore';// Importa el hook useAuthStore

function Authgoogle() {
    const clientID = "438503221838-iuce1ukmr3gdpfvgh06btgp8v4qfi8g5.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const { login } = useAuthStore(); // Obtiene la función login del store

    const onSuccess = (response) => {
        setUser(response.profileObj);
        login(response.profileObj.email); // Almacena el correo electrónico utilizando la función login del store
      
        // Guardar el nombre completo y la imagen en el localStorage
        localStorage.setItem('name', response.profileObj.name);
        localStorage.setItem('image', response.profileObj.imageUrl);
      
        window.location.replace('/');
      };
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
            });
        }
        gapi.load("client:auth2", start);
    });

    return (
        <div className="center">
            <div className='btn'>
                <GoogleLogin
                    clientId={clientID}
                    onSuccess={onSuccess}
                    
                    buttonText="Continue with Google"
                    cookiePolicy={"single_host_origin"}
                />
            </div>
        </div>
    );
}

export default Authgoogle;