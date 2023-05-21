
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Root123#',
    database: 'hackit',
});

// Forgot Password route
router.post('/', (req, res) => {
  const { email } = req.body;

  // Check if the user exists with the provided email
  pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    // Generate a random OTP (One-Time Password)
    const otp = crypto.randomInt(100000, 999999);

    try {
      // Save the OTP to the user's record
      pool.query('UPDATE users SET resetPasswordOTP = ? WHERE email = ?', [otp, email], async (error) => {
        if (error) {
          console.error('Error resetting password:', error);
          return res.status(500).json({ error: 'Failed to reset password' });
        }

        // Send the OTP to the user's email
        const transporter = nodemailer.createTransport({
          // Configure your email provider here
          // For example, if you're using Gmail:
          service: 'Gmail',
          auth: {
            user: 'eklavyaghodake@gmail.com',
            pass: 'hxxswfhujaaabfoq',
          },
        });

        const mailOptions = {
          from: 'eklavyaghodake@gmail.com',
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
          }
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'OTP sent to your email' });
        });
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  });
});

module.exports = router;
