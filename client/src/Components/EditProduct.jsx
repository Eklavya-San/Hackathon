import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [packSize, setPackSize] = useState('');
  const [category, setCategory] = useState('');
  const [mrp, setMrp] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const url = 'http://localhost:4000';
  const navigate = useNavigate();

  useEffect(() => {
    if(token===null)
    navigate("/login")
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${url}/api/product/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const product = response.data;
        setName(product.name);
        setPackSize(product.packSize);
        setCategory(product.category);
        setMrp(product.mrp);
        setImage(product.image);
        setStatus(product.status);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${url}/api/product/products/${id}`,
        {
          name,
          packSize,
          category,
          mrp,
          image,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Product updated:', response.data);
        navigate('/products');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
    }
  };

  return (
    <div className="container">
      <NavBar />

      <h2>Edit Product</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Pack Size:</label>
          <input
            type="text"
            className="form-control"
            value={packSize}
            onChange={(e) => setPackSize(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>MRP:</label>
          <input
            type="number"
            className="form-control"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
