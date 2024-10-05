// productController.js
const productModel = require("../models/productModel");

// Controlador para obtener todos los productos
exports.getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(products => {
            // Convierte las imágenes a formato base64 antes de enviarlas al cliente
            products.forEach(product => {
                if (product.imagen) {
                    product.imagen = product.imagen.toString('base64');
                }
            });
            res.json(products); // Envía la lista de productos al cliente
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Error en el servidor
        });
};

// Controlador para obtener los detalles de un producto por ID
exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id; // Obtiene el ID del producto desde los parámetros de la URL
    productModel.getProductDetailsById(productId)
        .then(result => {
            if (result.length > 0) {
                const product = result[0];
                // Convierte la imagen a base64 antes de enviarla
                if (product.imagen) {
                    product.imagen = product.imagen.toString('base64');
                }
                res.json(product); // Envía el producto encontrado al cliente
            } else {
                res.status(404).send("Producto no encontrado."); // Si no se encuentra, se envía un 404
            }
        })
        .catch(err => {
            console.error("Error obteniendo el producto:", err.message);
            res.status(500).send("Error obteniendo el producto."); // Error en la base de datos
        });
};

// Controlador para crear un nuevo producto
exports.createProduct = (req, res) => {
    try {
        const { name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen } = req.body; // Desestructura los datos recibidos

        // Imprime los valores recibidos para depuración
        console.log('Datos recibidos:', req.body);

        // Llama al modelo para crear el producto en la base de datos
        productModel.createProduct(name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen)
            .then(result => {
                res.status(200).json({ message: "Producto creado con éxito" }); // Producto creado con éxito
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({ message: "Error creando producto" }); // Error al crear el producto
            });
    } catch (err) {
        console.error('Error en el controlador:', err);
        res.status(500).json({ message: "Error en la solicitud" }); // Error general
    }
};

// Controlador para actualizar un producto existente
exports.updateProduct = (req, res) => {
    const { id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen } = req.body; // Desestructura los datos recibidos

    let buffer = null;
    if (imagen) {
        // Convierte la imagen de base64 a binario
        const base64Data = imagen.replace(/^data:image\/\w+;base64,/, "");
        buffer = Buffer.from(base64Data, "base64");
    }

    // Llama al modelo para actualizar el producto
    productModel.updateProduct(id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen)
        .then(result => {
            res.status(200).json({ message: "Producto actualizado con éxito" }); // Producto actualizado con éxito
        })
        .catch(err => {
            console.error("Error actualizando producto:", err.message);
            res.status(500).send("Error actualizando el producto."); // Error al actualizar el producto
        });
};

// Controlador para eliminar un producto por su ID
exports.deleteProduct = (req, res) => {
    const productId = req.params.id; // Obtiene el ID del producto desde los parámetros de la URL
    productModel.deleteProduct(productId)
        .then(result => {
            res.status(200).json({ message: "Producto eliminado con éxito" }); // Producto eliminado con éxito
        })
        .catch(err => {
            console.error("Error eliminando producto:", err.message);
            res.status(500).send("Error eliminando el producto."); // Error al eliminar el producto
        });
};

// Controlador para añadir un producto a la lista de favoritos de un cliente
exports.addProductToFavorites = (req, res) => {
    const { clienteId, productId } = req.body; // Obtiene el cliente y el producto desde el cuerpo de la solicitud
    productModel.addProductToFavorites(clienteId, productId)
        .then(result => {
            res.status(200).json({ message: "Producto añadido a favoritos" }); // Producto añadido a favoritos
        })
        .catch(err => {
            console.error("Error añadiendo a favoritos:", err.message);
            res.status(500).send("Error añadiendo producto a favoritos."); // Error al añadir a favoritos
        });
};

// Controlador para eliminar un producto de la lista de favoritos de un cliente
exports.removeProductFromFavorites = (req, res) => {
    const { clienteId, productId } = req.body; // Obtiene el cliente y el producto desde el cuerpo de la solicitud
    productModel.removeProductFromFavorites(clienteId, productId)
        .then(result => {
            res.status(200).json({ message: "Producto eliminado de favoritos" }); // Producto eliminado de favoritos
        })
        .catch(err => {
            console.error("Error eliminando de favoritos:", err.message);
            res.status(500).send("Error eliminando producto de favoritos."); // Error al eliminar de favoritos
        });
};

// Controlador para obtener la lista de productos favoritos de un cliente
exports.getFavoritesByClienteId = (req, res) => {
    const clienteId = req.params.clienteId; // Obtiene el ID del cliente desde los parámetros de la URL
    productModel.getFavoritesByClienteId(clienteId)
        .then(result => {
            res.json(result); // Devuelve la lista de productos favoritos
        })
        .catch(err => {
            console.error("Error obteniendo favoritos:", err.message);
            res.status(500).send("Error obteniendo productos favoritos."); // Error al obtener los favoritos
        });
};
