// Definición de los campos de entrada para el formulario de usuario
export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe", // Ejemplo de nombre de usuario
  },
  {
    id: "displayName",
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe", // Ejemplo de nombre y apellido
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com", // Ejemplo de correo electrónico
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89", // Ejemplo de número de teléfono
  },
  {
    id: "password",
    label: "Password",
    type: "password", // Campo de contraseña
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork", // Ejemplo de dirección
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    placeholder: "USA", // Ejemplo de país
  },
];

// Definición de los campos de entrada para el formulario de producto
export const productInputs = [
  {
    id: "product",
    label: "Nombre del Producto",
    type: "text",
    placeholder: "Nombre", // Ejemplo de nombre del producto
  },
  {
    id: "description",
    label: "Descripción del Producto",
    type: "text",
    placeholder: "Descripción", // Ejemplo de descripción del producto
  },
  {
    id: "price",
    label: "Precio",
    type: "number",
    placeholder: "100", // Ejemplo de precio del producto
  },
  {
    id: "category",
    label: "Categoría del Producto",
    type: "text",
    placeholder: "Categoría", // Ejemplo de categoría del producto
  },
  {
    id: "new",
    label: "Nuevo",
    type: "Checkbox",
    placeholder: "false", // Campo para indicar si el producto es nuevo
  },
  {
    id: "discount",
    label: "Descuento",
    type: "Checkbox",
    placeholder: "false", // Campo para indicar si el producto tiene descuento
  },
  {
    id: "discountPercent",
    label: "Porcentaje de Descuento",
    type: "number",
    placeholder: "20", // Ejemplo de porcentaje de descuento
  },
  {
    id: "discountAmount",
    label: "Precio con Descuento",
    type: "number",
    placeholder: "0", // Ejemplo de precio con descuento
    readOnly: true, // Hacer este campo de solo lectura
  },
  /*
  {
    id: "stock",
    label: "Stock",
    type: "text",
    placeholder: "En stock", // Ejemplo de stock del producto
  },
  */
  {
    id: "stock",
    label: "Cantidad de Stock",
    type: "number", // Cambiado a "number" para representar valores numéricos
    placeholder: "Número de unidades", // Ejemplo de cantidad de stock
  },
];

// Definición de los campos de entrada para el formulario de pedido
export const orderInputs = [
  {
    id: "orderID",
    label: "ID del Pedido",
    type: "text",
    placeholder: "ID", // Ejemplo de ID del pedido
  },
  {
    id: "productID",
    label: "ID del Producto",
    type: "text",
    placeholder: "ID del Producto", // Ejemplo de ID del producto
  },
  {
    id: "userID",
    label: "ID del Usuario",
    type: "text",
    placeholder: "ID del Usuario", // Ejemplo de ID del usuario
  },
  {
    id: "date",
    label: "Fecha del Pedido",
    type: "date",
    placeholder: "Seleccionar Fecha", // Ejemplo de fecha del pedido
  },
  {
    id: "total",
    label: "Costo Total",
    type: "number",
    placeholder: "Total en MXN", // Ejemplo de costo total del pedido
  },
  {
    id: "paymentMethod",
    label: "Método de Pago",
    type: "text",
    placeholder: "Tarjeta, PayPal, etc.", // Ejemplo de método de pago
  },
  {
    id: "status",
    label: "Estatus del Pedido",
    type: "text",
    placeholder: "Pendiente, Completado, Cancelado", // Ejemplo de estatus del pedido
  },
];
