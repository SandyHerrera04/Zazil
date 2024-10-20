export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "createdAt",
    headerName: "Fecha",
    width: 150,
    renderCell: (params) => {
      const date = params.row.createdAt 
        ? (params.row.createdAt.toDate ? params.row.createdAt.toDate() : new Date(params.row.createdAt))
        : null;  // Handle case where createdAt is undefined
      
      const formattedDate = date ? date.toLocaleDateString('es-ES') : 'Fecha no disponible'; // Fallback message
      return formattedDate;
    },
  },
  {
    field: "amount",
    headerName: "Precio",
    width: 150,
  },
  {
    field: "currency",
    headerName: "Tipo de moneda",
    width: 150,
  },
  {
    field: "status",
    headerName: "Estatus",
    width: 230,
  },
  {
    field: "product",
    headerName: "Productos",
    width: 230,
  },
];