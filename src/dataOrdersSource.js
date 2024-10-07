export const orderColumns = [
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
      field: "date",
      headerName: "Fecha",
      width: 150,
    },
  
    {
      field: "price",
      headerName: "Precio",
      width: 150,
    },
  
    {
      field: "paymentMethod",
      headerName: "Método de Pago",
      width: 230,
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