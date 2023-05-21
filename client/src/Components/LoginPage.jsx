import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const url = "http://localhost:4000";

  const  navigateToForgotPass=()=>{
    navigate('/forgot-password');
  }
  const  navigateToSignUp=()=>{
    navigate('/signup');
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      username: username,
      password: password
    };
  
    try {
      const response = await axios.post(url + '/api/login', requestBody);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const token = response.data.token;
      console.log(token)
      // Store the token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem("authenticated", true);
      alert("logged in")
      // Redirect to another component
      navigate('/home');
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className="container">
      <h1><center>DigitalFlake</center></h1>
      <h2><center>Login for Admin</center></h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <br></br>
        <center>

        <button type="submit" className="btn btn-primary">Login</button>
        </center>
      </form>
      <div>
        <button className="btn btn-primary" onClick={()=>{
          navigateToForgotPass()
        }}>Forgot Password</button>
        <br></br>
        <br></br>

        <br></br>

        <button className="btn btn-primary" onClick={()=>{
          navigateToSignUp()
        }}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
