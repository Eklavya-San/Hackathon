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
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists with the provided email
    const results = await getUserByEmail(email);
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    // Generate a random OTP (One-Time Password)
    const otp = crypto.randomInt(100000, 999999);

    // Save the OTP to the user's record
    await updateResetPasswordOTP(email, otp);

    // Send the OTP to the user's email
    await sendPasswordResetEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Helper function to get user by email
function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Helper function to update resetPasswordOTP for a user
function updateResetPasswordOTP(email, otp) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET resetPasswordOTP = ? WHERE email = ?', [otp, email], (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Helper function to send password reset email
function sendPasswordResetEmail(email, otp) {
  return new Promise((resolve, reject) => {
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
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve();
      }
    });
  });
}

module.exports = router;
