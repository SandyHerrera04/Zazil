  export const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Producto",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.product}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Descipcion",
      width: 350,
    },
  
    {
      field: "price",
      headerName: "Precio",
      width: 100,
    },
  
    {
      field: "category",
      headerName: "Categoría",
      width: 150,
    },
  
    {
      field: "new",
      headerName: "Nuevo",
      width: 100,
      renderCell: (params) => {
        return params.row.discount ? "Sí" : "No";
      },
    },
  
    {
      field: "discount",
      headerName: "Descuento",
      width: 100,
      renderCell: (params) => {
        return params.row.discount ? "Sí" : "No";
      },
    },
  
    {
      field: "discountPercent",
      headerName: "Porcentaje de Descuento",
      width: 100,
    },

    {
      field: "discountAmount",
      headerName: "Precio con Descuento",
      width: 150,
    },
  
    /*
    {
      field: "stock",
      headerName: "Stock",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.stock} 
          </div>
        );
      },
    },
  ];
  */

  {
    field: "stock",
    headerName: "Stock",
    width: 160,
    renderCell: (params) => {
      const stock = params.row.stock;
      return (
        <div className="cellWithStatus">
          {stock > 0 ? (
            <span>
              En stock: {stock} unidades
            </span>
          ) : (
            <span style={{ color: "red" }}>
              Agotado
            </span>
          )}
        </div>
      );
    },
  },
];
  