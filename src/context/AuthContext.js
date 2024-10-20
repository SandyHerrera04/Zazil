import { createContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthReducer from "./AuthReducer";

// Estado inicial del contexto de autenticación
const INITIAL_STATE = {
  // Obtiene el usuario actual del localStorage o establece null si no hay usuario
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

// Crea el contexto de autenticación
export const AuthContext = createContext(INITIAL_STATE);

// Proveedor del contexto de autenticación
export const AuthContextProvider = ({ children }) => {
  // Usa el reducer para manejar el estado de autenticación
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // Efecto para suscribirse a los cambios de estado de autenticación de Firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Hace el login si hay un usuario autenticado
        dispatch({ type: "LOGIN", payload: user });
      } else {
        // Hace el logout si no hay usuario autenticado
        dispatch({ type: "LOGOUT" });
      }
    });

    // Limpia el listener al desmontar el componente
    return () => unsubscribe();
  }, [dispatch]);

  // Efecto para guardar el usuario actual en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  // Provee el contexto de autenticación a los componentes hijos
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
