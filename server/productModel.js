const pool = require("../database/connection");

// Obtener todos los productos desde la base de datos
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM product"; // Consulta para obtener todos los productos
        pool.query(query, (error, results) => {
            if (error) {
                return reject(error); // En caso de error, rechaza la promesa
            }
            resolve(results); // Devuelve los resultados si la consulta es exitosa
        });
    });
};

// Obtener los detalles de un producto por su ID
exports.getProductDetailsById = (productId) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM product WHERE productId = ?"; // Consulta para obtener un producto específico por su ID
        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err); // En caso de error, rechaza la promesa
            } else {
                resolve(result); // Devuelve el resultado si la consulta es exitosa
            }
        });
    });
};

// Obtener todas las órdenes que contienen un producto específico (por su ID de producto)
exports.allOrderByProductId = (productId) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para obtener todas las órdenes asociadas a un producto específico
        const query =
            "SELECT O.orderId, U.Nombre, O.createdDate, PIN.quantity, PIN.totalPrice " +
            "FROM users U INNER JOIN orders O on U.userId  = O.userId " +
            "INNER JOIN productsInOrder PIN on O.orderId = PIN.orderId " +
            "INNER JOIN product P on PIN.productId = P.productId " +
            "WHERE PIN.productId = ?;";

        pool.query(query, [productId], (err, result) => {
            if (err) {
                reject(err); // En caso de error, rechaza la promesa
            } else {
                resolve(result); // Devuelve el resultado si la consulta es exitosa
            }
        });
    });
};

// Crear un nuevo producto en la base de datos
exports.createProduct = (name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para insertar un nuevo producto en la base de datos
        const query = "INSERT INTO product (name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        pool.query(query, [name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen], (err, result) => {
            if (err) {
                reject(err); // En caso de error, rechaza la promesa
            } else {
                resolve(result); // Devuelve el resultado si la inserción es exitosa
            }
        });
    });
};

// Actualizar un producto existente por su ID
exports.updateProduct = (id, name, description, price, tipo, novedad, descuento, cantidadDescuento, stock, imagen) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para actualizar un producto existente en la base de datos
        pool.query(
            "UPDATE product SET name = ?, description = ?, price = ?, imagen = ?, tipo = ?, novedad = ?, descuento = ?, cantidadDescuento = ?, stock = ? WHERE productId = ?",
            [name, description, price, imagen, tipo, novedad, descuento, cantidadDescuento, stock, id], // Parámetros
            (err, result) => {
                if (err) {
                    reject(err); // En caso de error, rechaza la promesa
                } else {
                    resolve(result); // Devuelve el resultado si la actualización es exitosa
                }
            }
        );
    });
};

// Eliminar un producto por su ID
exports.deleteProduct = (productId) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para eliminar un producto de la base de datos por su ID
        pool.query("DELETE FROM product WHERE productId = ?", [productId], (err, result) => {
            if (err) {
                reject(err); // En caso de error, rechaza la promesa
            } else {
                resolve(result); // Devuelve el resultado si la eliminación es exitosa
            }
        });
    });
};

// Añadir un producto a los favoritos de un cliente
exports.addProductToFavorites = (clienteId, productId) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para insertar un producto en la tabla de favoritos de un cliente
        pool.query(
            "INSERT INTO favorites (clienteId, productId) VALUES (?, ?);",
            [clienteId, productId], // Parámetros para la consulta
            (err, result) => {
                if (err) {
                    reject(err); // En caso de error, rechaza la promesa
                } else {
                    resolve(result); // Devuelve el resultado si la inserción es exitosa
                }
            }
        );
    });
};

// Eliminar un producto de los favoritos de un cliente
exports.removeProductFromFavorites = (clienteId, productId) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para eliminar un producto de la tabla de favoritos de un cliente
        pool.query(
            "DELETE FROM favorites WHERE clienteId = ? AND productId = ?;",
            [clienteId, productId], // Parámetros para la consulta
            (err, result) => {
                if (err) {
                    reject(err); // En caso de error, rechaza la promesa
                } else {
                    resolve(result); // Devuelve el resultado si la eliminación es exitosa
                }
            }
        );
    });
};

// Obtener todos los productos favoritos de un cliente por su ID
exports.getFavoritesByClienteId = (clienteId) => {
    return new Promise((resolve, reject) => {
        // Consulta SQL para obtener los productos favoritos de un cliente
        const query = `
            SELECT P.* FROM product P
            INNER JOIN favorites F ON P.productId = F.productId
            WHERE F.clienteId = ?;`; // Unir las tablas de productos y favoritos
        pool.query(query, [clienteId], (err, result) => {
            if (err) {
                reject(err); // En caso de error, rechaza la promesa
            } else {
                resolve(result); // Devuelve el resultado si la consulta es exitosa
            }
        });
    });
};

