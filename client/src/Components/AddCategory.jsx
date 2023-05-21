import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');
  const url = "http://localhost:4000"
  const navigate = useNavigate();
  

  useEffect(() => {
    if(token===null)
      navigate("/login")
  
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
        description,
      status: status === 'true' ? 1 : 0,
    };

    try {
      const response = await axios.post(`${url}/api/category/categories`, productData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Category created:', response.data);
      // Reset form fields after successful submission
      setName('');
      setStatus(1);
      setDescription('');
      alert('Category Added');
    } catch (error) {
      alert('Something Went Wrong');
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            {/* name */}
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
       
      {/* description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text-area"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* status */}
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

export default AddCategory;
