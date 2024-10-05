// productModel.js
/*
const pool = require("../database/connection");

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM product;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


exports.getProductDetailsById = (productId) => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT * FROM product WHERE productId = ?";
        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.allOrderByProductId = (productId) => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT O.orderId, U.fname, U.lname, O.createdDate, PIN.quantity, PIN.totalPrice " +
            "FROM users U INNER JOIN orders O on U.userId  = O.userId " +
            "INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId " +
            "INNER JOIN product P on PIN.productId = P.productId " +
            "WHERE PIN.productId = ?;";

        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


//exports.createProduct = (name, price, description) => {
   // return new Promise((resolve, reject) => {
     //   pool.query(
       //     "INSERT INTO product (name, price, description) VALUES (?,?,?);",
         //   [name, price, description],
           // (err, result) => {
             //   if (err) {
               //     reject(err);
                //} else {
                  //  resolve(result);
                //}
            //}
        //);
    //});
//};

exports.createProduct = (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO product (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito) VALUES (?,?,?,?,?,?,?,?,?,?);",
            [name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};


//exports.updateProduct = (productId, name, price, description) => {
  //  return new Promise((resolve, reject) => {
    //    pool.query(
      //      "UPDATE product SET name = ?, price = ?, description = ? WHERE productId = ?",
        //    [name, price, description, productId],
          //  (err, result) => {
            //    if (err) {
              //      reject(err);
                //} else {
                  //  resolve(result);
                //}
            //}
        //);
    //});
//};

exports.updateProduct = (productId, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE product SET name = ?, price = ?, description = ?, imagen = ?, tipo = ?, novedad = ?, descuento = ?, cantidadDescuento = ?, favorito = ?, carrito = ? WHERE productId = ?",
            [name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, favorito, carrito, productId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};


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
*/

const pool = require("../database/connection");

/*
// Obtener todos los productos
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM product;", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
*/

// productModel.js
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM product";
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


// Obtener detalles de un producto por ID
exports.getProductDetailsById = (productId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM product WHERE productId = ?";
        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Obtener todas las órdenes que contienen un producto específico por ID de producto
exports.allOrderByProductId = (productId) => {
    return new Promise((resolve, reject) => {
        const query =
            "SELECT O.orderId, U.Nombre, O.createdDate, PIN.quantity, PIN.totalPrice " +
            "FROM users U INNER JOIN orders O on U.userId  = O.userId " +
            "INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId " +
            "INNER JOIN product P on PIN.productId = P.productId " +
            "WHERE PIN.productId = ?;";

        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

/*
// Crear un nuevo producto
exports.createProduct = (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO product (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento) VALUES (?,?,?,?,?,?,?,?);",
            [name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
*/

/*
// Crear un nuevo producto con control de stock
exports.createProduct = (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO product (name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock) VALUES (?,?,?,?,?,?,?,?,?);",
            [name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, stock],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
*/

exports.createProduct = (name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO product (name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      pool.query(query, [name, price, tipo, novedad, descuento, cantidadDescuento, description, stock, imagen], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  



/*
// Actualizar un producto existente
exports.updateProduct = (productId, name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE product SET name = ?, price = ?, description = ?, imagen = ?, tipo = ?, novedad = ?, descuento = ?, cantidadDescuento = ? WHERE productId = ?",
            [name, price, description, imagen, tipo, novedad, descuento, cantidadDescuento, productId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
*/

// Actualizar un producto por ID
exports.updateProduct = (id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE product SET name = ?, description = ?, price = ?, imagen = ?, tipo = ?, novedad = ?, descuento = ?, cantidadDescuento = ?, stock = ? WHERE productId = ?",
            [name, price, tipo, novedad, descuento, cantidadDescuento, description, stock, imagen, id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};



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


// Añadir un producto a los favoritos de un cliente
exports.addProductToFavorites = (clienteId, productId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO favorites (clienteId, productId) VALUES (?, ?);",
            [clienteId, productId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// Eliminar un producto de los favoritos de un cliente
exports.removeProductFromFavorites = (clienteId, productId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM favorites WHERE clienteId = ? AND productId = ?;",
            [clienteId, productId],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

// Obtener todos los productos favoritos de un cliente por ID
exports.getFavoritesByClienteId = (clienteId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT P.* FROM product P
            INNER JOIN favorites F ON P.productId = F.productId
            WHERE F.clienteId = ?;
        `;
        pool.query(query, [clienteId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

