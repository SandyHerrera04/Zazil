/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./AdminProductList.scss";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const addProduct = () => {
    let name = productName;
    let price = productPrice;
    let description = productDesc;
    if (name !== "" && price > 0 && description !== "") {
      axios
        .post(`${getBaseURL()}api/products/create`, { name, price, description })
        .then((res) => {
          console.log("Product added");
          fetchProducts();
        })
        .catch((err) => console.log("Product added"));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openProductDetails = (product) => {
    props.handleProductDetails(product);
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`${getBaseURL()}api/products/delete/${productId}`)
      .then((res) => {
        console.log("Deletion successful");
        fetchProducts();
      })
      .catch((err) => console.log("Error"));
  };

  const fetchProducts = () => {
    axios
      .get(`${getBaseURL()}api/products`)
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((err) => console.log("Couldn't receive list"));
  };

  return (
    <div className="product-list-container">
      <div className="add-product-section">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          placeholder="Product Name"
        />
        <label htmlFor="productPrice">Price:</label>
        <input
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
          placeholder="Price"
        />
        <label htmlFor="productDesc">Description:</label>
        <input
          type="text"
          id="productDesc"
          value={productDesc}
          onChange={(e) => {
            setProductDesc(e.target.value);
          }}
          placeholder="Description"
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="product-list">
        <h1>Product List</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created Date</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.createdDate}</td>
                  <td>
                    <button
                      onClick={() => {
                        openProductDetails(product);
                      }}
                    >
                      Details
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteProduct(product.productId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
*/


import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./AdminProductList.scss";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  // Campos para agregar un nuevo producto
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState(null); 
  const [productType, setProductType] = useState("");
  const [productNovedad, setProductNovedad] = useState(false);
  const [productDescuento, setProductDescuento] = useState(false);
  const [productCantidadDescuento, setProductCantidadDescuento] = useState(0);

  // Añadir un producto
  const addProduct = () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDesc);
    formData.append("imagen", productImage);
    formData.append("tipo", productType);
    formData.append("novedad", productNovedad);
    formData.append("descuento", productDescuento);
    formData.append("cantidadDescuento", productCantidadDescuento);

    axios
      .post(`${getBaseURL()}api/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Product added");
        fetchProducts();
      })
      .catch((err) => console.log("Error adding product"));
  };

  // Obtener todos los productos
  const fetchProducts = () => {
    axios
      .get(`${getBaseURL()}api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log("Couldn't receive list"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-product-page">
      <header className="admin-header">
        <h1>✨Administración de productos✨</h1>
      </header>

      {/* Filtros de productos */}
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

