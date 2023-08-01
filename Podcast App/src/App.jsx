import { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import ShowDetails from './components/ShowDetail'
import { BrowserRouter , Routes, Route, Link}  from 'react-router-dom'
import Layout from './components/Layout'
import Ofcanvas from './components/Offcanvas'
import './App.css'

function App() {
 return ( 
<BrowserRouter>
  
  
  <Routes>
    <Route element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/:id' element={<ShowDetails />} />


  </Route>
  </Routes>

</BrowserRouter>
 ); 
  
}


export default App
