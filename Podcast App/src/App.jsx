import { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter , Routes, Route, Link}  from 'react-router-dom'

import './App.css'

function App() {
 return ( 
<BrowserRouter>

   <Link to="/">Home</Link>
   <Link to="/login">Login</Link>
   
  
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
  </Routes>

</BrowserRouter>
 ); 
  
}


export default App
