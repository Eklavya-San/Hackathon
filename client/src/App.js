import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import Home from './Components/Home';
import Product from './Components/Product';

import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import AddCategory from './Components/AddCategory';
import EditCategory from './Components/EditCategory';
import Category from './Components/Category';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="home" exact element={<Home/>}/>
      <Route path="products" exact element={<Product/>}/>
      <Route path="categories" exact element={<Category/>}/>
      <Route path="login" exact element={<LoginPage/>}/>
      <Route path="addproduct" exact element={<AddProduct/>}/>
      <Route path="addcategory" exact element={<AddCategory/>}/>
      <Route path="editproduct/:id" exact element={<EditProduct/>}/>
      <Route path="editcategory/:id" exact element={<EditCategory/>}/>
    </Routes>

    </BrowserRouter>
    
  );
};

export default App;
