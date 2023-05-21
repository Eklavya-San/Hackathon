import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated'));

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div>
    <NavBar/>
    <br></br>
<center>
  <h1>Welcome to Home Page</h1>
</center>
  
      </div>
    );
  }
};

export default Home;
