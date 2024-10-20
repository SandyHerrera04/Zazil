// Definición de las columnas para la tabla de órdenes
export const orderColumns = [
  { 
    field: "id", 
    headerName: "ID", 
    width: 70 // Ancho de la columna ID
  },
  {
    field: "createdAt",
    headerName: "Fecha",
    width: 150, // Ancho de la columna Fecha
    renderCell: (params) => {
      // Obtiene la fecha de creación del objeto params
      const date = params.row.createdAt 
        ? (params.row.createdAt.toDate ? params.row.createdAt.toDate() : new Date(params.row.createdAt))
        : null;  // Maneja el caso donde createdAt es indefinido
      
      // Formatea la fecha a una cadena legible en español
      const formattedDate = date ? date.toLocaleDateString('es-ES') : 'Fecha no disponible'; // Mensaje de reserva
      return formattedDate;
    },
  },
  {
    field: "amount",
    headerName: "Precio",
    width: 150, // Ancho de la columna Precio
  },
  {
    field: "currency",
    headerName: "Tipo de moneda",
    width: 150, // Ancho de la columna Tipo de moneda
  },
  {
    field: "status",
    headerName: "Estatus",
    width: 230, // Ancho de la columna Estatus
  },
];
