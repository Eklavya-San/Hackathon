const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Root123#',
  database: 'hackit',
});

// Reset Password route
router.post('/', (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Check if the user exists with the provided email
  console.log(email, otp, newPassword)
  pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    if (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = results[0];

    // Verify the OTP
    if (user.resetPasswordOTP.toString() !== otp.toString()) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    try {
      // Generate a hash for the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      pool.query(
        'UPDATE users SET password = ?, resetPasswordOTP = NULL WHERE email = ?',
        [hashedPassword, email],
        (error) => {
          if (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({ error: 'Failed to reset password' });
          }
          res.status(200).json({ message: 'Password reset successful' });
        }
      );
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  });
});

module.exports = router;
