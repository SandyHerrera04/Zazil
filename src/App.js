import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import ProductDetails from "./pages/productDetails/ProductDetails";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

// UID del administrador autorizado
const ADMIN_UID = "dQEMV4CfeKQGzHtfyONy7fLDtN82"; 

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  // Verificación de autenticación y permisos del administrador
  const RequireAuth = () => {
    if (!currentUser) {
      return <Navigate to="/login" replace />; // Redirige al login si no está autenticado
    }
    if (currentUser.uid !== ADMIN_UID) {
      // Muestra un mensaje de acceso denegado si no es administrador
      alert("Acceso denegado. No tienes permisos de administrador.");
      return <Navigate to="/login" replace />; // Redirige al login si no es administrador
    }
    return <Outlet />; // Permite el acceso si es administrador
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública de login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas por autenticación */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<List type="users" />} />
            <Route path="users/:userId" element={<Single />} />
            <Route path="users/new" element={<New inputs={userInputs} title="Agregar Nuevo Usuario" />} />
            <Route path="products" element={<List type="products" />} />
            <Route path="products/:productId" element={<ProductDetails />} />
            <Route path="products/new" element={<New inputs={productInputs} title="Agregar Nuevo Producto" />} />
            <Route path="orders" element={<List type="orders" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
