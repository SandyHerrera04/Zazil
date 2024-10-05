const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Importa el controlador que maneja la lógica de los productos

// Ruta para obtener todos los productos
// Esta ruta obtiene una lista de todos los productos de la base de datos
router.get('/products', productController.getAllProducts);

// Ruta para obtener los detalles de un producto por su ID
// Esta ruta recibe un ID de producto en la URL y devuelve los detalles del producto correspondiente
router.get("/:id", productController.getProductDetailsById);

// Ruta para obtener todas las órdenes que contienen un producto específico
// Esta ruta recibe el ID de un producto y devuelve todas las órdenes asociadas a ese producto
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Ruta para crear un nuevo producto
// Esta ruta permite la creación de un nuevo producto. Se usa express.json() con un límite de 50 MB para manejar datos grandes como imágenes
router.post("/create", express.json({ limit: '50mb' }), productController.createProduct);

// Ruta para actualizar un producto existente
// Esta ruta permite la actualización de los detalles de un producto por su ID. También maneja grandes cantidades de datos como imágenes
router.put('/:id', express.json({ limit: '50mb' }), productController.updateProduct);

// Ruta para eliminar un producto por su ID
// Esta ruta permite eliminar un producto de la base de datos a través de su ID
router.delete('/:id', productController.deleteProduct);

// Ruta para añadir un producto a los favoritos de un cliente
// Esta ruta permite que un cliente añada un producto a su lista de favoritos
router.post("/favorites/add", productController.addProductToFavorites);

// Ruta para eliminar un producto de los favoritos de un cliente
// Esta ruta permite que un cliente elimine un producto de su lista de favoritos
router.delete("/favorites/remove", productController.removeProductFromFavorites);

// Ruta para obtener todos los productos favoritos de un cliente
// Esta ruta recibe el ID de un cliente y devuelve la lista de sus productos favoritos
router.get("/favorites/:clienteId", productController.getFavoritesByClienteId);

module.exports = router; // Exporta las rutas para que puedan ser utilizadas en la aplicación principal
