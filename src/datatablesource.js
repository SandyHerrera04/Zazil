export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },

  {
    field: "password",
    headerName: "Contraseña",
    width: 230,
  },

  {
    field: "tel",
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
    field: "address",
    headerName: "Localidad",
    width: 200,
  },

  {
    field: "type",
    headerName: "Tipo",
    width: 150,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];