// Importaciones necesarias de React y ReactDOM
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

// Renderiza la aplicación sin React.StrictMode, envolviendo la aplicación en los proveedores de contexto
ReactDOM.render(
  <DarkModeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </DarkModeContextProvider>,
  document.getElementById("root")
);
