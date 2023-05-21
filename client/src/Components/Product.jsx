import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const url = 'http://localhost:4000';
  const navigate = useNavigate();

  useEffect(() => {
    if(token===null)
      navigate("/login")
    fetchProducts();
  },);
  const navigateToAddProducts = () => {
    navigate('/addproduct');
  }
  const fetchProducts = async () => {
    try {
      const response = await axios.get(url + '/api/product/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
    console.log('Edit product:', productId);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/product/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product deleted:', response.data);
      // Update the products state by removing the deleted product
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    console.log('Delete product:', id);
  };    
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated'));

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return (
        <div className="container">
        <NavBar/>
    
          <h2>Products</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Pack Size</th>
                <th>Category</th>
                <th>MRP</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} width="50" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.packSize}</td>
                  <td>{product.category}</td>
                  <td>{product.mrp}</td>
                  <td>{product.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-primary' onClick={()=>navigateToAddProducts()}>ADD Product</button>
        </div>
      );
  }
  
};

export default Product;
