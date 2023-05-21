import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');
  const url = 'http://localhost:4000';
  const navigate = useNavigate();

  useEffect(() => {
    if(token===null)
    navigate("/login")
    fetchCategories();
  },);
  const navigateToCategory = () => {
    navigate('/addcategory');
  }
  const fetchCategories = async () => {
    try {
      const response = await axios.get(url + '/api/category/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleEdit = (categoryId) => {
    navigate(`/editCategory/${categoryId}`);
    console.log('Edit category:', categoryId);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/category/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Category deleted:', response.data);
      // Update the products state by removing the deleted product
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
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
    
          <h2>Categories</h2>
          <table className="table">
            <thead>
              <tr>       
                <th>Name</th>
                <th>Status</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  
                  <td>{category.name}</td>
                  <td>{category.status}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(category._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-primary' onClick={()=>navigateToCategory()}>ADD Product</button>
        </div>
      );
  }
  
};

export default Category;
