import React from 'react';
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
    renderCell: (params) => {

    },
  },

  {
    field: "password",
    headerName: "Contraseña",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Teléfono",
    width: 180,
  },

  {
    field: "email",
    headerName: "Correo",
    width: 230,
  },

  {
    field: "birthdate",
    headerName: "Fecha de Nacimiento",
    width: 180,
  },

  {
    field: "curp",
    headerName: "CURP",
    width: 200,
  },

  {
    field: "location",
    headerName: "Localidad",
    width: 200,
  },
  {
    field: "direction",
    headerName: "Dirección",
    width: 200,
  },
];