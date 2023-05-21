const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/middleware');
const mysql = require('mysql');

// Create a new category
router.post('/categories', authenticateToken, async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'INSERT INTO categories (name, description, status) VALUES (?, ?, ?)';
    const values = [name, description, status];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Failed to create category' });
      } else {
        const categoryId = results.insertId;
        const category = { id: categoryId, name, description, status };
        res.status(201).json(category);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
});

// Get all categories
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'SELECT * FROM categories';

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Failed to fetch categories' });
      } else {
        res.json(results);
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// Get a single category by ID
router.get('/categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'SELECT * FROM categories WHERE _id = ?';
    const values = [id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Failed to fetch category' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        const category = results[0];
        res.json(category);
      }
    });

    // connection.end();
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Failed to fetch category' });
  }
});

// Update a category by ID
router.put('/categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    connection.connect();

    const query = 'UPDATE categories SET name = ?, description = ?, status = ? WHERE _id = ?';
    const values = [name, description, status, id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Failed to update category' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        const category = { id, name, description, status };
        res.json(category);
      }
    });

    // connection.end();
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category' });
  }
});

// Delete a category by ID
router.delete('/categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root123#',
      database: 'hackit',
    });

    // connection.connect();

    const query = 'DELETE FROM categories WHERE _id = ?';
    const values = [id];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Failed to delete category' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.json({ message: 'Category deleted successfully' });
      }
    });

    connection.end();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

module.exports = router;
