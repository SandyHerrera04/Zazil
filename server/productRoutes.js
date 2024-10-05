// productRoutes.js
/*
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get product details by ID
router.get("/:id", productController.getProductDetailsById);

// Route to get all orders product details by ID
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Route to create a new product
router.post("/create", productController.createProduct);

// Route to update an existing product
router.post("/update", productController.updateProduct);

// Route to delete a product by ID
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
*/

/*
VERSION 2

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to get all products
router.get("/", productController.getAllProducts);

// Route to get product details by ID
router.get("/:id", productController.getProductDetailsById);

// Route to get all orders product details by ID
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Route to create a new product
router.post("/create", productController.createProduct);
//router.post('/create', upload.single('imagen'), productController.createProduct);

// Route to update an existing product
//router.post("/update", productController.updateProduct);
router.put('/:id', productController.updateProduct);

// Route to delete a product by ID
//router.delete("/delete/:id", productController.deleteProduct);

// Ruta para eliminar un producto
router.delete('/:id', productController.deleteProduct);

// Route to add product to favorites for a specific client
router.post("/favorites/add", productController.addProductToFavorites);

// Route to remove product from favorites for a specific client
router.delete("/favorites/remove", productController.removeProductFromFavorites);

// Route to get all favorite products for a specific client
router.get("/favorites/:clienteId", productController.getFavoritesByClienteId);

module.exports = router;
*/

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to get all products
//router.get("/", productController.getAllProducts);
router.get('/products', productController.getAllProducts);

// Route to get product details by ID
router.get("/:id", productController.getProductDetailsById);

// Route to get all orders product details by ID
router.get("/allOrderByProductId/:id", productController.allOrderByProductId);

// Route to create a new product
router.post("/create", express.json({ limit: '50mb' }), productController.createProduct);

// Route to update an existing product
router.put('/:id', express.json({ limit: '50mb' }), productController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to add product to favorites for a specific client
router.post("/favorites/add", productController.addProductToFavorites);

// Route to remove product from favorites for a specific client
router.delete("/favorites/remove", productController.removeProductFromFavorites);

// Route to get all favorite products for a specific client
router.get("/favorites/:clienteId", productController.getFavoritesByClienteId);

module.exports = router;
