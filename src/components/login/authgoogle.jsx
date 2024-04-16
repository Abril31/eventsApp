import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';
import { useAuthStore } from '../../store/authStore';// Importa el hook useAuthStore
import { toast } from "sonner";
function Authgoogle() {
    const clientID = "438503221838-iuce1ukmr3gdpfvgh06btgp8v4qfi8g5.apps.googleusercontent.com"
    const [user,setUser] = useState({});
    const { authgoogle } = useAuthStore(); // Obtiene la función login del store

    const onSuccess = (response) => {
        const userData = {
            access: true, 
          name: response.profileObj.name,
          email: response.profileObj.email,
          password: '', // Google Auth no proporciona la contraseña
          type_user: 'user', // 
          status: true, 
          image: response.profileObj.imageUrl
        };
      
        setUser(userData);
        authgoogle(userData); // Almacena el objeto de usuario completo utilizando la función login del store
        console.log("que hay ahora?",userData)
        toast.success("successful login")
       // window.location.replace('/');
        
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