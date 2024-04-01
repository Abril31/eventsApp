import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';


function Authgoogle() {
    const clientID = "438503221838-iuce1ukmr3gdpfvgh06btgp8v4qfi8g5.apps.googleusercontent.com"
    const [user, setUser] = useState({});
   
  
    const onSuccess = (response) => {
        setUser(response.profileObj);
        window.location.replace('/');
      };

      const onFailure = (response) => {
        console.log("Google Login failed.");
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
            onFailure={onFailure}
            buttonText="Continue  with Google"
            cookiePolicy={"single_host_origin"}
          />
  
        </div>
      </div>
    );
  }

  export default Authgoogle;