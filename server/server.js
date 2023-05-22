const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 4000;
const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Root123#',
  database: 'hackit',
};
app.use(cors());
const jwtSecret = '1cf680c2a6730762aad6590e794b51ae20f9243953bacfed6505d16f505c1adf';

// Create a MySQL connection pool
const pool = mysql.createPool(mysqlConfig);

// Table creation queries
const createCategoryTableQuery = `
CREATE TABLE IF NOT EXISTS categories (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT TRUE
)`;

const createProductTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  packSize VARCHAR(255) NOT NULL,
  category INT NOT NULL,
  mrp DECIMAL(10, 2) NOT NULL,
  image LONGTEXT NOT NULL,
  status BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category) REFERENCES categories(_id)
)`;

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(500) NOT NULL UNIQUE,
  resetPasswordOTP INT
)`;

// Create a MySQL connection
const connection = mysql.createConnection(mysqlConfig);

// Execute the table creation queries
connection.query(createCategoryTableQuery, (error) => {
  if (error) throw error;
  console.log('Categories table created successfully');
});

connection.query(createProductTableQuery, (error) => {
  if (error) throw error;
  console.log('Products table created successfully');
});

connection.query(createUserTableQuery, (error) => {
  if (error) throw error;
  console.log('Users table created successfully');
});

// Close the connection
connection.end();

app.use(express.json());

// Import the authentication routes
const authRoutes = require('./routes/authentificationRoutes')(pool);
app.use('/api', authRoutes);

// Import the other routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const restPasswordRoutes = require('./routes/restPasswordRoutes')
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes')
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reset', restPasswordRoutes);
app.use('/api/forgot', forgotPasswordRoutes);


// Import the middleware
const { authenticateToken } = require('./middleware/middleware');

// Protected route accessible with a valid JWT
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
