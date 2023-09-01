import "./register.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { useState } from "react";
const url = "http://127.0.0.1:8080"  ;
export default function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const username = document.getElementById("username").value;

      
        if (!email || !password || !confirmPassword|| !username) {   
            setErrorMessage("Veuillez remplir tous les champs obligatoires.");
            return; 
          }
        setErrorMessage("") ;
        
        const userData = {
          email,
          password,
          confirmPassword,
          username,
        };
      
        try {
         
          const response = await axios.post(url + "/users", userData);
    
          console.log("Réponse du serveur:", response.data);
          setIsRegistered(true);
        } catch (error) {
          console.error("Erreur lors de l'envoi des données:", error);
        }
      };
      if (isRegistered) {
        return <Navigate to="/home" replace={true} />; 
      }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebak</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facebak.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email *" id="email" className="loginInput" />
            <input placeholder="Password * " id="password" className="loginInput" />
            <input placeholder="Confirm Password * " id="confirmPassword" className="loginInput" />
            <input placeholder="Username * " id="username" className="loginInput" />
            <button className="loginButton" id="submitSignUp" onClick={handleSubmit}>Sign Up</button>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}

          </div>
        </div>
      </div>
    </div>
  );
}