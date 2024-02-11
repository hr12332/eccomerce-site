import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from '../login/Login';
import Forgot from '../forgot/Forgot';
import SignUp from '../signup/SignUp';
import Home from '../homepage/Home';
import Contactus from '../contactus/Contactus';
import Product from '../product/Product';
import ProductDetail from '../productDetail/ProductDetail';
import Cart from '../cart/Cart';
const Routing = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/homepage" element={<Home/>} />
        <Route path="/contactus" element={<Contactus/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/productdetail" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
    </Routes> 
   </BrowserRouter>
  )
}

export default Routing
