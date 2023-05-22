import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = ({ setEmailSent }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/forgot', { email });
      if (response.status === 200) {
        setEmailSent(email);
        setError('');
      }
    } catch (error) {
      setError('Failed to send email. Please try again.');
    }
  };

  return (
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
      <br />
      <button type="submit" className="btn btn-primary">
        Send Reset Email
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

const ResetPasswordForm = ({ email }) => {
  const [otp, setOTP] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const requestBody = {
      'email':email,
      'otp':otp,
      'newPassword': newPassword,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/reset', requestBody);
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
      <br />
      <button type="submit" className="btn btn-primary">
        Reset Password
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState('');

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {!emailSent && <EmailForm setEmailSent={setEmailSent} />}
      {emailSent && <ResetPasswordForm email={emailSent} />}
    </div>
  );
};

export default ForgotPassword;
