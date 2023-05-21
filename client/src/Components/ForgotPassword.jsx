import React from 'react'
import  { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/forgot', { email });
      if (response.status === 200) {
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Failed to send email. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/reset', {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        setSuccess(true);
        setError('');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="container">
        <h2>Success!</h2>
        <p>Your password has been reset. You can now log in with your new password.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {!success && (
        <div>
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Reset Email
            </button>
          </form>

          <hr />

          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>OTP:</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
