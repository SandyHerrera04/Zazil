import React, { useState } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu"; // Import the menu icon
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [isExpanded, setIsExpanded] = useState(false); // State for controlling sidebar expand/collapse

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // Toggle the sidebar's state
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}> {/* Apply class based on state */}
      <div className="top">
        <MenuIcon onClick={handleToggle} className="hamburger-icon" /> {/* Hamburger icon for toggling */}
        {isExpanded && (
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">ZAZIL</span>
          </Link>
        )}
      </div>
      <hr />
      {isExpanded && (
        <div className="center">
          <ul>
            <p className="title">Pantalla principal</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <p className="title">Contenido</p>
            <Link to="/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Usuarios</span>
              </li>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Productos</span>
              </li>
            </Link>
            <Link to="/orders" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Pedidos</span>
              </li>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li>
                <ExitToAppIcon className="icon" />
                <span>Logout</span>
              </li>
            </Link>
          </ul>
        </div>
      )}
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;