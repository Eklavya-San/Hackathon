const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/middleware');
const mysql = require('mysql');

// Create a new product
router.post('/products', authenticateToken, async (req, res) => {
  const { name, packSize, category, mrp, image, status } = req.body;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'INSERT INTO products (name, packSize, category, mrp, image, status) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, packSize, category, mrp, image, status];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product' });
      } else {
        const productId = results.insertId;
        const product = { id: productId, name, packSize, category, mrp, image, status };
        res.status(201).json(product);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Get all products
router.get('/products', authenticateToken, async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'SELECT * FROM products';

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
      } else {
        res.json(results);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get a single product by ID
router.get('/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'SELECT * FROM products WHERE _id = ?';
    const values = [id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        const product = results[0];
        res.json(product);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Update a product by ID
router.put('/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, packSize, category, mrp, image, status } = req.body;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'UPDATE products SET name = ?, packSize = ?, category = ?, mrp = ?, image = ?, status = ? WHERE _id = ?';
    const values = [name, packSize, category, mrp, image, status, id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        const product = { id, name, packSize, category, mrp, image, status };
        res.json(product);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete a product by ID
router.delete('/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'DELETE FROM products WHERE _id = ?';
    const values = [id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
