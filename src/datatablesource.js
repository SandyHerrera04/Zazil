// Importación de React
import React from 'react';

// Definición de las columnas para la tabla de usuarios
export const userColumns = [
  { 
    field: "id", 
    headerName: "ID", 
    width: 70 // Ancho de la columna ID
  },
  {
    field: "name",
    headerName: "User",
    width: 230, // Ancho de la columna User
    renderCell: (params) => {
      // Función para renderizar el contenido de la celda (actualmente vacía)
    },
  },
  {
    field: "password",
    headerName: "Contraseña",
    width: 230, // Ancho de la columna Contraseña
  },
  {
    field: "phone",
    headerName: "Teléfono",
    width: 180, // Ancho de la columna Teléfono
  },
  {
    field: "email",
    headerName: "Correo",
    width: 230, // Ancho de la columna Correo
  },
  {
    field: "birthdate",
    headerName: "Fecha de Nacimiento",
    width: 180, // Ancho de la columna Fecha de Nacimiento
  },
  {
    field: "curp",
    headerName: "CURP",
    width: 200, // Ancho de la columna CURP
  },
  {
    field: "location",
    headerName: "Localidad",
    width: 200, // Ancho de la columna Localidad
  },
  {
    field: "direction",
    headerName: "Dirección",
    width: 200, // Ancho de la columna Dirección
  },
];
