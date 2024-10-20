export const userInputs = [
    {
      id: "username",
      label: "Username",
      type: "text",
      placeholder: "john_doe",
    },
    {
      id: "displayName",
      label: "Name and surname",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: "email",
      label: "Email",
      type: "mail",
      placeholder: "john_doe@gmail.com",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+1 234 567 89",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: "Elton St. 216 NewYork",
    },
    {
      id: "country",
      label: "Country",
      type: "text",
      placeholder: "USA",
    },
  ];
  
  export const productInputs = [
    {
      id: "product",
      label: "Nombre del Producto",
      type: "text",
      placeholder: "Nombre",
    },
    {
      id: "description",
      label: "Descripción del Producto",
      type: "text",
      placeholder: "Descripción",
    },
    {
      id: "price",
      label: "Precio",
      type: "number",
      placeholder: "100",
    },

    {
      id: "category",
      label: "Categoría del Producto",
      type: "text",
      placeholder: "Categoría",
    },
    {
      id: "new",
      label: "Nuevo",
      type: "Checkbox",
      placeholder: "false",
    },
    {
      id: "discount",
      label: "Descuento",
      type: "Checkbox",
      placeholder: "false",
    },
    {
      id: "discountPercent",
      label: "Porcentaje de Descuento",
      type: "number",
      placeholder: "20",
    },
    {
      id: "discountAmount",
      label: "Precio con Descuento",
      type: "number",
      placeholder: "0",
      readOnly: true, // Hacer este campo de solo lectura
    },

    /*
    {
      id: "stock",
      label: "Stock",
      type: "text",
      placeholder: "En stock",
    },
    */
    {
      id: "stock",
      label: "Cantidad de Stock",
      type: "number", // Cambiado a "number" para representar valores numéricos.
      placeholder: "Número de unidades",
    },
  ];

  export const orderInputs = [
    {
      id: "orderID",
      label: "ID del Pedido",
      type: "text",
      placeholder: "ID",
    },
    {
      id: "productID",
      label: "ID del Producto",
      type: "text",
      placeholder: "ID del Producto",
    },
    {
      id: "userID",
      label: "ID del Usuario",
      type: "text",
      placeholder: "ID del Usuario",
    },
    {
      id: "date",
      label: "Fecha del Pedido",
      type: "date",
      placeholder: "Seleccionar Fecha",
    },
    {
      id: "total",
      label: "Costo Total",
      type: "number",
      placeholder: "Total en MXN",
    },
    {
      id: "paymentMethod",
      label: "Método de Pago",
      type: "text",
      placeholder: "Tarjeta, PayPal, etc.",
    },
    {
      id: "status",
      label: "Estatus del Pedido",
      type: "text",
      placeholder: "Pendiente, Completado, Cancelado",
    },
  ];
  
  