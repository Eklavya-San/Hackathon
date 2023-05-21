import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('authenticated', false);
    setAuthenticated(false);
    alert("successfully logged out")
  };

  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated'));

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <Navbar id="navbarr" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">DigitalFlake</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
             
            </Nav>
            <Button className="btn btn-danger" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
};

export default NavBar;
