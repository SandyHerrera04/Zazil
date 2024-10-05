import React, { useState } from "react";
import zacilLogo from "./zacillogo.png"; 
import './Login.scss';

/*Funcionalidad del código: El código e esencial para el flujo de autenticación 
de la aplicación Zazil, permitiendo que los administradores inicien sesión de 
manera segura. La verificación simple de credenciales y la gestión del estado son
claves en su funcionamiento*/

const Login = ({ setUserAuthenticatedStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Verifica las credenciales del administrador 
    if (email === "zazil@gmail.com" && password === "toallin1234") {
      setUserAuthenticatedStatus(true); // Autenticación exitosa
    } else {
      alert("Credenciales incorrectas. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <img src={zacilLogo} alt="Zazil Logo" className="logo" />
      <h2>✨ Inicio de Sesión ✨</h2>
      <h3>Admin</h3>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
};

export default Login;
