const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root123#',
  database: 'hackit',
});

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
  image VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category) REFERENCES categories(_id)
)`;

const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)`;

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
