// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userToken = require("./routes/userTokenRoute")

const app = express();

app.use(cors());
//app.use(express.json());
// Configurar express.json y express.urlencoded con un límite mayor para permitir solicitudes grandes
app.use(express.json({ limit: '50mb' })); // Aumentar el límite a 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to the database
const connection = mysql.createConnection({
    host: process.env.DB_SERVER_HOST,
    user: process.env.DB_SERVER_USER,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DB_SERVER_DATABASE
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the Railway database');
  });

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/token", userToken)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
