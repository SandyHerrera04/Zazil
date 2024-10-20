// Definición de las columnas para la tabla de productos
export const productColumns = [
  { 
    field: "id", 
    headerName: "ID", 
    width: 70 // Ancho de la columna ID
  },
  {
    field: "product",
    headerName: "Producto",
    width: 230, // Ancho de la columna Producto
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" /> {/* Imagen del producto */}
          {params.row.product} {/* Nombre del producto */}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 350, // Ancho de la columna Descripción
  },
  {
    field: "price",
    headerName: "Precio",
    width: 100, // Ancho de la columna Precio
  },
  {
    field: "category",
    headerName: "Categoría",
    width: 150, // Ancho de la columna Categoría
  },
  {
    field: "new",
    headerName: "Nuevo",
    width: 100, // Ancho de la columna Nuevo
    renderCell: (params) => {
      return params.row.discount ? "Sí" : "No"; // Muestra "Sí" si el producto tiene descuento, de lo contrario "No"
    },
  },
  {
    field: "discount",
    headerName: "Descuento",
    width: 100, // Ancho de la columna Descuento
    renderCell: (params) => {
      return params.row.discount ? "Sí" : "No"; // Muestra "Sí" si el producto tiene descuento, de lo contrario "No"
    },
  },
  {
    field: "discountPercent",
    headerName: "Porcentaje de Descuento",
    width: 100, // Ancho de la columna Porcentaje de Descuento
  },
  {
    field: "discountAmount",
    headerName: "Precio con Descuento",
    width: 150, // Ancho de la columna Precio con Descuento
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 160, // Ancho de la columna Stock
    renderCell: (params) => {
      const stock = params.row.stock;
      return (
        <div className="cellWithStatus">
          {stock > 0 ? (
            <span>
              En stock: {stock} unidades {/* Muestra la cantidad de unidades en stock */}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              Agotado {/* Muestra "Agotado" en rojo si no hay stock */}
            </span>
          )}
        </div>
      );
    },
  },
];
