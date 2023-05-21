import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate} from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [packSize, setPackSize] = useState('');
  const [category, setCategory] = useState('');
  const [mrp, setMrp] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const url = "http://localhost:4000"
  const navigate = useNavigate();
  useEffect(() => {
    if(token===null)
    navigate("/login")
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, [token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      packSize,
      category,
      mrp,
      image,
      status: status === 'true' ? 1 : 0,
    };

    try {
      const response = await axios.post(`${url}/api/product/products`, productData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Product created:', response.data);
      // Reset form fields after successful submission
      setName('');
      setPackSize('');
      setCategory('');
      setMrp('');
      setImage('');
      setStatus('');
      alert('Product Added');
    } catch (error) {
      alert('Something Went Wrong');
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="packSize" className="form-label">Pack Size</label>
          <input
            type="text"
            className="form-control"
            id="packSize"
            value={packSize}
            onChange={(e) => setPackSize(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="mrp" className="form-label">MRP</label>
          <input
            type="number"
            className="form-control"
            id="mrp"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label" >Image</label>
          <input
          placeholder='Enter image link'
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
