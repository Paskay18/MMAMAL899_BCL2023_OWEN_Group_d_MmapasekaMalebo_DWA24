import { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import ShowDetails from './components/ShowInfo'
import { BrowserRouter , Routes, Route, Link}  from 'react-router-dom'
import Layout from './components/Layout'

import './App.css'
import Success from './Success'
import HomeLandingPage from './components/LandingPage'


function App() {
 return ( 
<BrowserRouter>

  
<Routes>
  <Route  element={<Layout />}>
    <Route path='/' element={<HomeLandingPage />} />
     <Route path='/login' element={<Login />} />
     <Route path="/success" element={<Success/>} />
    <Route path='/:id' element={<ShowDetails/>} />
  
    <Route path='/homeSort' element={<Home /> } />
    </Route>
</Routes>


</BrowserRouter>
 ); 
  
}


export default App
