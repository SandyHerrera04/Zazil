/*Funcitonality: The only fucntion of this file and feauture within the webpage is
to display in the top part "Panle de Administrador */
import "./navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="title">
          <span>Panel de administración</span>
        </div>
        <div className="items">
          <div className="item" onClick={handleToggleTheme}>
            {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
