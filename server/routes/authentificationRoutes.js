const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = '1cf680c2a6730762aad6590e794b51ae20f9243953bacfed6505d16f505c1adf';
const router = express.Router();
const mysql = require('mysql');

module.exports = (User) => {
  router.get('/home', async (req, res) => {
    res.json('Welcome to digitalflake');
  });

  // Register a new user
  router.post('/register', async (req, res) => {
    const { username, password, email  } = req.body;

    try {
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Root123#',
        database: 'hackit',
      });

      connection.connect();
      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      const checkEmailValues = [email]; 
      // Check if the username already exists
      const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
      const checkUsernameValues = [username];

      connection.query(checkUsernameQuery, checkUsernameValues, async (error, results) => {
        if (error) {
          console.error('Error checking username:', error);
          res.status(500).json({ message: 'Failed to register user' });
        }
        else if (results.length > 0) {
          res.status(409).json({ message: 'Username already exists' });
        }
        else {
              connection.query(checkEmailQuery, checkEmailValues, async (error, results) =>{
                if (error) {
                  console.error('Error checking email:', error);
                  res.status(500).json({ message: 'Failed to register user' });
                }
                else if (results.length > 0) {
                  res.status(409).json({ message: 'Email already exists' });
                }
                else{
                    // Hash the password

                        const hashedPassword = await bcrypt.hash(password, 10);

                        // Store the user in the database
                        const insertUserQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
                        const insertUserValues = [username, hashedPassword, email];
              
                        connection.query(insertUserQuery, insertUserValues, (error, results) => {
                          if (error) {
                            console.error('Error registering user:', error);
                            res.status(500).json({ message: 'Failed to register user' });
                          } else {
                            res.status(201).json({ message: 'User registered successfully' });
                          }
                        });
                      }
                    }
                  )
                }
      });

      // connection.end();
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  });

  // Login and generate JWT
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Root123#',
        database: 'hackit',
      });

      connection.connect();

      // Check if the user exists
      const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
      const checkUserValues = [username];

      connection.query(checkUserQuery, checkUserValues, async (error, results) => {
        if (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ message: 'Failed to log in' });
        } else if (results.length === 0) {
          res.status(401).json({ message: 'Invalid credentials' });
          console.error('Invalid credentials');

        } else {
          const user = results[0];

          // Compare the entered password with the stored hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
          console.error('Invalid credentials');

          } else {
            // Generate JWT
            const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
            console.log("sent jwt")
          }
        }
      });

      // connection.end();
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Failed to log in' });
    }
  });

  return router;
};
