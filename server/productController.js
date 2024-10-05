// productController.js
/*
const productModel = require("../models/productModel");

exports.getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductDetailsById(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product.");
        });
};

exports.allOrderByProductId = (req, res) => {
    const productId = req.params.id;
    productModel.allOrderByProductId(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product.");
        });
};

//exports.createProduct = (req, res) => {
    //const { name, price, description } = req.body;
    //productModel.createProduct(name, price, description)
      //  .then(result => {
        //    res.send(result);
        //})
        //.catch(err => {
          //  console.error(err.message);
            //res.status(500).send("Error creating product.");
       //});
//};

exports.createProduct = (req, res) => {
    const { name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito } = req.body;
    productModel.createProduct(name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error creating product.");
        });
};


//exports.updateProduct = (req, res) => {
  //  const { id, name, price, description } = req.body;
    //productModel.updateProduct(id, name, price, description)
      //  .then(result => {
        //    res.send(result);
        //})
        //.catch(err => {
          //  console.error(err.message);
            //res.status(500).send("Error updating product.");
        //});
//};

exports.updateProduct = (req, res) => {
    const { id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito } = req.body;
    productModel.updateProduct(id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error updating product.");
        });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error deleting product.");
        });
};
*/


/*
CODIGO VERSIÓN 2

const productModel = require("../models/productModel");
const base64Data = req.body.imagen.replace(/^data:image\/\w+;base64,/, ""); // Remover encabezado de Base64
const buffer = Buffer.from(base64Data, "base64"); // Convertir a buffer binario


exports.getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

/*
exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductDetailsById(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product.");
        });
};
*/

/*
exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id;

    productModel.getProductDetailsById(productId)
        .then(result => {
            if (result.length > 0) {
                const product = result[0];

                // Convertir la imagen en base64 si existe
                if (product.imagen) {
                    product.imagen = product.imagen.toString('base64');
                }

                res.json(product);
            } else {
                res.status(404).send("Producto no encontrado.");
            }
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error obteniendo el producto.");
        });
};


exports.allOrderByProductId = (req, res) => {
    const productId = req.params.id;
    productModel.allOrderByProductId(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product orders.");
        });
};
*/

/*
exports.createProduct = (req, res) => {
    const { name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento } = req.body;
    productModel.createProduct(name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error creating product.");
        });
};
*/

/*
exports.createProduct = (req, res) => {
    upload.single('imagen')(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error al subir la imagen', error: err.message });
      }
      
      const { name, price, description, tipo, novedad, descuento, cantidadDescuento } = req.body;
      const imagen = req.file ? req.file.filename : null; // Si hay imagen, guardar el nombre del archivo
  
      // Llamar a la función para crear el producto en la base de datos
      productModel.createProduct(name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.error(err.message);
          res.status(500).send("Error al crear el producto.");
        });
    });
  };
*/

/*
  exports.createProduct = (req, res) => {
    const { name, price, description, tipo, novedad, descuento, cantidadDescuento, stock } = req.body;
    const imagen = req.file ? req.file.filename : null; // Obtener el nombre de archivo si hay una imagen

    productModel.createProduct(name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock)
        .then(result => {
            res.send(result); // Responder con el resultado de la creación
        })
        .catch(err => {
            console.error("Error al crear el producto:", err);
            res.status(500).send("Error creando el producto.");
        });
};
*/

/*
exports.createProduct = (req, res) => {
    try {
        const { name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock } = req.body;

        // Remover encabezado base64 y convertir a binario
        const base64Data = imagen.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        productModel.createProduct(name, price, description, buffer, tipo, novedad, descuento, cantidadDescuento, stock)
            .then(result => {
                res.status(200).json({ message: "Producto creado con éxito" });
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({ message: "Error creando producto" });
            });
    } catch (err) {
        res.status(500).json({ message: "Error en la solicitud" });
    }
};


/*
exports.updateProduct = (req, res) => {
    const { id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento } = req.body;
    productModel.updateProduct(id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error updating product.");
        });
};
*/

/*
exports.updateProduct = (req, res) => {
    const { id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock } = req.body;
    productModel.updateProduct(id, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock)
        .then(result => {
            res.send(result); // Enviar resultado de la actualización
        })
        .catch(err => {
            console.error("Error actualizando producto:", err.message);
            res.status(500).send("Error actualizando el producto.");
        });
};
*/


/*exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error deleting product.");
        });
};

*/


/*
// Eliminar un producto por ID
exports.deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM product WHERE productId = ?", [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.deleteProduct = (req, res) => {
    const productId = req.params.id; // Obtén el productId de los parámetros
    productModel.deleteProduct(productId)
        .then(result => {
            res.send(result); // Enviar resultado de la eliminación
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error eliminando el producto.");
        });
};


exports.addProductToFavorites = (req, res) => {
    const { clienteId, productId } = req.body;
    productModel.addProductToFavorites(clienteId, productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error adding product to favorites.");
        });
};

exports.removeProductFromFavorites = (req, res) => {
    const { clienteId, productId } = req.body;
    productModel.removeProductFromFavorites(clienteId, productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error removing product from favorites.");
        });
};

exports.getFavoritesByClienteId = (req, res) => {
    const clienteId = req.params.clienteId;
    productModel.getFavoritesByClienteId(clienteId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching favorite products.");
        });
};

*/


const productModel = require("../models/productModel");
//const base64Data = req.body.imagen.replace(/^data:image\/\w+;base64,/, ""); // Remover encabezado de Base64
//const buffer = Buffer.from(base64Data, "base64"); // Convertir a buffer binario


// productController.js
exports.getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(products => {
            // Convertir las imágenes a base64 antes de enviarlas
            products.forEach(product => {
                if (product.imagen) {
                    product.imagen = product.imagen.toString('base64');
                }
            });
            res.json(products);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


// Obtener detalles de un producto por ID
exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductDetailsById(productId)
        .then(result => {
            if (result.length > 0) {
                const product = result[0];
                if (product.imagen) {
                    product.imagen = product.imagen.toString('base64');
                }
                res.json(product);
            } else {
                res.status(404).send("Producto no encontrado.");
            }
        })
        .catch(err => {
            console.error("Error obteniendo el producto:", err.message);
            res.status(500).send("Error obteniendo el producto.");
        });
};

/*
// Crear un nuevo producto
exports.createProduct = (req, res) => {
    try {
        const { name, price, tipo, novedad, descuento, cantidadDescuento, description, stock, imagen } = req.body;

        // Verificar que la imagen esté en formato base64
        let buffer = null;
        if (imagen) {
            const base64Data = imagen.replace(/^data:image\/\w+;base64,/, ""); 
            buffer = Buffer.from(base64Data, "base64"); // Convertir a binario
        }

        productModel.createProduct(name, price, tipo, novedad, descuento, cantidadDescuento, description, stock, imagen)
            .then(result => {
                res.status(200).json({ message: "Producto creado con éxito" });
            })
            .catch(err => {
                console.error("Error creando producto:", err.message);
                res.status(500).json({ message: "Error creando producto" });
            });
    } catch (err) {
        console.error("Error en la solicitud:", err);
        res.status(500).json({ message: "Error en la solicitud" });
    }
};
*/


exports.createProduct = (req, res) => {
    try {
        const { name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen } = req.body;

        // Imprime los valores recibidos para depurar
        console.log('Datos recibidos:', req.body);

        // Continua con la creación del producto en la base de datos
        productModel.createProduct(name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen)
            .then(result => {
                res.status(200).json({ message: "Producto creado con éxito" });
            })
            .catch(err => {
                console.error(err.message);
                res.status(500).json({ message: "Error creando producto" });
            });
    } catch (err) {
        console.error('Error en el controlador:', err);
        res.status(500).json({ message: "Error en la solicitud" });
    }
};

// Actualizar un producto existente
exports.updateProduct = (req, res) => {
    const { id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen} = req.body;

    let buffer = null;
    if (imagen) {
        const base64Data = imagen.replace(/^data:image\/\w+;base64,/, "");
        buffer = Buffer.from(base64Data, "base64"); // Convertir a binario
    }

    productModel.updateProduct(id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen)
        .then(result => {
            res.status(200).json({ message: "Producto actualizado con éxito" });
        })
        .catch(err => {
            console.error("Error actualizando producto:", err.message);
            res.status(500).send("Error actualizando el producto.");
        });
};

// Eliminar un producto por ID
exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId)
        .then(result => {
            res.status(200).json({ message: "Producto eliminado con éxito" });
        })
        .catch(err => {
            console.error("Error eliminando producto:", err.message);
            res.status(500).send("Error eliminando el producto.");
        });
};

// Añadir un producto a los favoritos de un cliente
exports.addProductToFavorites = (req, res) => {
    const { clienteId, productId } = req.body;
    productModel.addProductToFavorites(clienteId, productId)
        .then(result => {
            res.status(200).json({ message: "Producto añadido a favoritos" });
        })
        .catch(err => {
            console.error("Error añadiendo a favoritos:", err.message);
            res.status(500).send("Error añadiendo producto a favoritos.");
        });
};

// Eliminar un producto de los favoritos de un cliente
exports.removeProductFromFavorites = (req, res) => {
    const { clienteId, productId } = req.body;
    productModel.removeProductFromFavorites(clienteId, productId)
        .then(result => {
            res.status(200).json({ message: "Producto eliminado de favoritos" });
        })
        .catch(err => {
            console.error("Error eliminando de favoritos:", err.message);
            res.status(500).send("Error eliminando producto de favoritos.");
        });
};

// Obtener todos los productos favoritos de un cliente por ID
exports.getFavoritesByClienteId = (req, res) => {
    const clienteId = req.params.clienteId;
    productModel.getFavoritesByClienteId(clienteId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.error("Error obteniendo favoritos:", err.message);
            res.status(500).send("Error obteniendo productos favoritos.");
        });
};
