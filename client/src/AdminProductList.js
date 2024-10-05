import React, { useState, useEffect } from "react";
import axios from "axios"; // Librería para realizar solicitudes HTTP
import { getBaseURL } from "../apiConfig"; // Función para obtener la URL base de la API
import "./AdminProductList.scss"; // Archivo de estilos para la lista de productos

/**
 * Componente para listar y gestionar productos en la aplicación de administración.
 */
const ProductList = (props) => {
  // Estado que contiene la lista de productos
  const [products, setProducts] = useState([]);

  // Estados para agregar un nuevo producto
  const [productName, setProductName] = useState(""); // Nombre del producto
  const [productPrice, setProductPrice] = useState(0); // Precio del producto
  const [productDesc, setProductDesc] = useState(""); // Descripción del producto
  const [productImage, setProductImage] = useState(null); // Imagen del producto
  const [productType, setProductType] = useState(""); // Tipo de producto
  const [productNovedad, setProductNovedad] = useState(false); // Indicador de novedad
  const [productDescuento, setProductDescuento] = useState(false); // Indicador de descuento
  const [productCantidadDescuento, setProductCantidadDescuento] = useState(0); // Cantidad de descuento

  /**
   * Función para agregar un producto nuevo.
   * Crea un objeto FormData para enviar información junto con la imagen del producto.
   */
  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDesc);
    formData.append("imagen", productImage); // Agregar imagen al FormData
    formData.append("tipo", productType);
    formData.append("novedad", productNovedad);
    formData.append("descuento", productDescuento);
    formData.append("cantidadDescuento", productCantidadDescuento);

    // Realizar solicitud POST para crear un nuevo producto
    axios
      .post(`${getBaseURL()}api/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Product added");
        fetchProducts(); // Actualizar la lista de productos después de agregar uno nuevo
      })
      .catch((err) => console.log("Error adding product"));
  };

  /**
   * Función para obtener la lista de productos desde la API.
   */
  const fetchProducts = () => {
    axios
      .get(`${getBaseURL()}api/products`) // Solicitud GET a la API de productos
      .then((res) => {
        setProducts(res.data); // Guardar los productos en el estado
      })
      .catch((err) => console.log("Couldn't receive list"));
  };

  /**
   * useEffect para cargar la lista de productos cuando el componente se monta.
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-product-page">
      <header className="admin-header">
        <h1>✨Administración de productos✨</h1>
      </header>

      {/* Sección de filtros de productos */}
      <div className="filter-section">
        <div className="filter-dropdown">
          <label htmlFor="productType">Productos</label>
          <select id="productType">
            <option value="">Seleccionar</option>
            <option value="Kits">Kits</option>
            <option value="Nocturnas">Nocturnas</option>
            <option value="Teens">Teens</option>
            <option value="Regulares">Regulares</option>
            <option value="Protectores">Protectores</option>
            <option value="Pañales">Pañales</option>
          </select>
        </div>
        <div className="filter-checkboxes">
          <label>
            <input type="checkbox" /> Disponibles
          </label>
          <label>
            <input type="checkbox" /> Agotado
          </label>
        </div>
      </div>

      {/* Formulario para agregar un nuevo producto */}
      <div className="add-product-form">
        <h2>Agregar Nuevo Producto</h2>
        <label htmlFor="productName">Nombre del Producto:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nombre del producto"
        />
        <label htmlFor="productPrice">Precio:</label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Precio"
        />
        <label htmlFor="productDesc">Descripción:</label>
        <input
          type="text"
          id="productDesc"
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
          placeholder="Descripción del producto"
        />
        <label htmlFor="productImage">Imagen (jpg, png):</label>
        <input
          type="file"
          id="productImage"
          accept="image/jpeg, image/png"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
        <label htmlFor="productType">Tipo:</label>
        <input
          type="text"
          id="productType"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          placeholder="Tipo (ej., Nocturnas, Teens)"
        />
        <label>
          <input
            type="checkbox"
            checked={productNovedad}
            onChange={(e) => setProductNovedad(e.target.checked)}
          />{" "}
          Novedad
        </label>
        <label>
          <input
            type="checkbox"
            checked={productDescuento}
            onChange={(e) => setProductDescuento(e.target.checked)}
          />{" "}
          Descuento
        </label>
        {productDescuento && (
          <input
            type="number"
            value={productCantidadDescuento}
            onChange={(e) => setProductCantidadDescuento(e.target.value)}
            placeholder="Porcentaje de descuento"
          />
        )}
        <button onClick={addProduct}>Agregar Producto</button>
      </div>

      {/* Lista de productos */}
      <div className="product-list-section">
        <h2>Lista de Productos</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Novedad</th>
              <th>Descuento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>
                  <img
                    src={`${getBaseURL()}uploads/${product.imagen}`}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>${product.price}</td>
                <td>{product.tipo}</td>
                <td>{product.novedad ? "Sí" : "No"}</td>
                <td>{product.descuento ? `${product.cantidadDescuento}%` : "No"}</td>
                <td>
                  <button className="edit-button">Editar</button>
                  <button className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
