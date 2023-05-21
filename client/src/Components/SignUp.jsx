import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const url = "http://localhost:4000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform additional validation if needed
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Password validation - at least one capital letter, one special character, one number, total 8 digits
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least one capital letter, one special character, one number, and be at least 8 characters long'
      );
      return;
    }

    try {
      const response = await axios.post(url + '/api/register', {
        username,
        password,
        email,
      });

      if (response.status === 200 || response.status === 201) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else {
        throw new Error(`HTTP error! status: ${response.message}`);
      }
    } catch (response) {
      setError('Invalid username or password or email or password already exists');
    }

    // Clear form and errors after successful signup
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {passwordError && <div className="alert alert-danger">{passwordError}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <br />
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
